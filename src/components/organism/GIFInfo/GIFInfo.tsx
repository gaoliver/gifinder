import React from 'react';
import { AspectRatio, Box, HStack, Text, VStack } from 'native-base';
import FastImage from 'react-native-fast-image';
import { ShareButton } from '@/components/featured/ShareButton';
import { spaces } from '@/constants/spaces';
import { GIFProps } from '@/@types/models';
import { Rating } from '@/components';

interface GIFInfoProps {
  gif: GIFProps;
}

export const GIFInfo: React.FC<GIFInfoProps> = ({ gif }) => {
  const { images, title, url, rating } = gif;

  return (
    <Box mx={spaces.screenWidth}>
      <AspectRatio ratio={1 / 1} width={'100%'}>
        <FastImage source={{ uri: images.original.url }} />
      </AspectRatio>

      <HStack mt={4}>
        <VStack flex={0.8}>
          <Text fontWeight="bold" fontSize={18}>
            {title}
          </Text>
          <Text mt={2}>{url}</Text>
        </VStack>
        <Rating rating={rating} mr="0" m="auto" />
      </HStack>

      <ShareButton gifUrl={url} mt={8} />
    </Box>
  );
};
