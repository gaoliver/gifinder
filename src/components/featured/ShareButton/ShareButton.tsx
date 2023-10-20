import { Box, Button, IBoxProps, Icon, Text } from 'native-base';
import React from 'react';
import { Share } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type ShareButtonProps = {
  gifUrl: string;
} & IBoxProps;

export const ShareButton: React.FC<ShareButtonProps> = ({
  gifUrl,
  ...props
}) => {
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out this cool GIF:',
        url: gifUrl,
      });
    } catch (error) {
      console.error('Error sharing GIF:', error);
    }
  };

  return (
    <Box {...props}>
      <Button
        py={2}
        w="100%"
        bgColor="secondary"
        onPress={handleShare}
        _pressed={{ style: { transform: [{ scale: 0.98 }] } }}
        leftIcon={<Icon size={5} as={<MaterialIcons name="share" />} />}
        testID="shareButton">
        <Text color="white">Share GIF</Text>
      </Button>
    </Box>
  );
};
