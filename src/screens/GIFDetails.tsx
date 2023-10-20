import React from 'react';
import { Box, HStack } from 'native-base';
import { GIFInfo, Header, IconButton } from '@/components';
import { colors } from '@/theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootMainStackParamList } from 'App';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, actions } from '@/Redux/slices';

type GIFDetailsProps = NativeStackScreenProps<
  RootMainStackParamList,
  'GIFDetails'
>;

export const GIFDetails: React.FC<GIFDetailsProps> = ({ route }) => {
  const { gif } = route.params;

  const dispatch = useDispatch();
  const favourites = useSelector((state: AppState) => state.favourites);
  const isFavourite = favourites?.some(item => item.id === gif.id);

  const handleSaveFavourite = () => {
    dispatch(actions.saveFavourite(gif));
  };

  return (
    <Box flex={1}>
      <Header hasGoBack title={gif.title}>
        <HStack>
          <IconButton
            icon={isFavourite ? 'heart' : 'heart-outline'}
            iconColor={isFavourite ? colors.warning : colors.black}
            onPress={handleSaveFavourite}
            testID="heart-button"
          />
        </HStack>
      </Header>

      <Box mt="4">
        <GIFInfo gif={gif} />
      </Box>
    </Box>
  );
};
