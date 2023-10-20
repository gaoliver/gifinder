import React from 'react';
import { AspectRatio, Box, FlatList, Pressable } from 'native-base';
import { spaces } from '@/constants/spaces';
import { GIFProps } from '@/@types/models';
import FastImage from 'react-native-fast-image';

interface GIFListProps {
  list: GIFProps[];
  onPressItem: (item: GIFProps) => void;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const GIFList: React.FC<GIFListProps> = ({
  list,
  onPressItem,
  ...props
}) => {
  return (
    <FlatList
      {...props}
      data={list}
      pt={1}
      px={spaces.screenWidth}
      numColumns={3}
      columnWrapperStyle={{ gap: 4 }}
      renderItem={({ item }) => (
        <Box my={1} key={item.id} flex={1 / 3}>
          <Pressable onPress={() => onPressItem(item)} testID={item.id}>
            <AspectRatio ratio={1 / 1} w={'100%'}>
              <FastImage
                source={{
                  uri: item.images.downsized.url,
                }}
              />
            </AspectRatio>
          </Pressable>
        </Box>
      )}
    />
  );
};
