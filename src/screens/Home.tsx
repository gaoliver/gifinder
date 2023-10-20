/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigationProp, RootBottomParamList } from 'App';
import { GIFProps, SearchResultsApi } from '@/@types/models';
import { api } from '@/Api';
import { Box, Pressable, Text } from 'native-base';
import { GIFInfo, GIFList, Header, SearchBar, Spinner } from '@/components';

type SearchResultsStackProps = NativeStackScreenProps<
  RootBottomParamList,
  'Home'
>;

type HomeProps = SearchResultsStackProps & {
  navigation: AppNavigationProp;
};

const ITEMS_PER_PAGE = 18;
const RANDOM_GIF_INTERVAL = 10000;

const Loading = ({ isLoading }: { isLoading: boolean }) => {
  if (isLoading) {
    return <Spinner my={4} testID="loading-spinner" />;
  }

  return null;
};

export const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [randomGIF, setRandomGIF] = useState<GIFProps>();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState<GIFProps[]>([]);
  const [offset, setOffset] = useState(0);

  const handlePressResultItem = (item: GIFProps) => {
    navigation.navigate('GIFDetails', { gif: item });
  };

  const fetchRandomGIF = async () => {
    try {
      const response = await api.get('/random');
      const randomGIFData = response.data.data;

      setRandomGIF(randomGIFData);
    } catch (error) {
      console.error('Error fetching random GIF:', error);
    }
  };

  const fetchData = async (newOffset?: number) => {
    setIsLoading(true);

    try {
      const response = await api.get('/search', {
        params: {
          q: encodeURIComponent(searchQuery),
          limit: ITEMS_PER_PAGE,
          offset: newOffset ?? offset,
        },
      });
      const result: SearchResultsApi = response.data;

      if (newOffset === 0) {
        setData(result.data);
        setOffset(ITEMS_PER_PAGE);
      } else {
        setData(prevData => [...prevData, ...result.data]);
        setOffset(prev => prev + ITEMS_PER_PAGE);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleClearSearch = () => {
    setData([]);
    setSearchQuery('');
  };

  const handleLoadMore = () => {
    if (!isLoading && data.length) {
      fetchData();
    }
  };

  useEffect(() => {
    if (searchQuery.length >= 2) {
      fetchData(0);
    }
  }, [searchQuery]);

  useEffect(() => {
    fetchRandomGIF();
    const intervalId = setInterval(fetchRandomGIF, RANDOM_GIF_INTERVAL);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box flex={1}>
      <Header>
        <SearchBar
          flex={1}
          placeholder="Search for GIFs"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery && (
          <Pressable ml={4} onPress={handleClearSearch}>
            <Text color="white">Cancel</Text>
          </Pressable>
        )}
      </Header>

      {data.length ? (
        <GIFList
          list={data}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
          ListFooterComponent={<Loading isLoading={isLoading} />}
          onPressItem={handlePressResultItem}
        />
      ) : !isLoading ? (
        randomGIF && (
          <Box style={{ transform: [{ scale: 0.9 }] }} testID="randomGif">
            <GIFInfo gif={randomGIF} />
          </Box>
        )
      ) : (
        <Loading isLoading={isLoading} />
      )}
    </Box>
  );
};
