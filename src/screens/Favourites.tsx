import React from 'react';
import { Box, Center, Text } from 'native-base';
import { GIFList, Header } from '@/components';
import { GIFProps } from '@/@types/models';
import { useSelector } from 'react-redux';
import { AppState } from '@/Redux/slices';
import { AppNavigationProp } from 'App';

interface FavouritesProps {
  navigation: AppNavigationProp;
}

export const Favourites: React.FC<FavouritesProps> = ({ navigation }) => {
  const favourites = useSelector((state: AppState) => state.favourites);

  const handlePressResultItem = (gif: GIFProps) => {
    navigation.navigate('GIFDetails', { gif });
  };

  return (
    <Box flex={1}>
      <Header title="Favourites" />

      {!favourites.length ? (
        <Center pt={4}>
          <Text>No favourite yet.</Text>
        </Center>
      ) : (
        <GIFList list={favourites} onPressItem={handlePressResultItem} />
      )}
    </Box>
  );
};
