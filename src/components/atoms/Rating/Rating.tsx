import { ratingMap } from '@/utils/ratingMap';
import { AspectRatio, Badge, IAspectRatioProps, Text } from 'native-base';
import React from 'react';

interface RatingProps extends IAspectRatioProps {
  rating: string;
}

export const Rating: React.FC<RatingProps> = ({ rating, ...props }) => {
  if (!(rating in ratingMap)) {
    return null;
  }

  const { color, textColor } = ratingMap[rating.toLowerCase()];

  return (
    <AspectRatio ratio={1 / 1} w="16" {...props}>
      <Badge backgroundColor="primary" borderRadius={100} bgColor={color}>
        <Text fontSize={36} fontWeight="extrabold" color={textColor}>
          {rating.toUpperCase()}
        </Text>
      </Badge>
    </AspectRatio>
  );
};
