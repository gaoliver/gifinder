import { Input, Icon, IInputProps } from 'native-base';
import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export const SearchBar: React.FC<IInputProps> = ({
  value,
  placeholder,
  ...props
}) => {
  const [isOnFocus, setIsOnFocus] = useState(false);
  const [text, setText] = useState(value);

  const handleFocus = () => {
    setIsOnFocus(true);
  };

  const handleBlur = () => {
    setIsOnFocus(false);
  };

  const handleClear = () => {
    setText('');
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <Input
      value={text}
      placeholder={placeholder}
      width="100%"
      borderRadius={10}
      py={3}
      px={1}
      fontSize={14}
      color={isOnFocus ? 'black' : 'white'}
      onFocus={handleFocus}
      onBlur={handleBlur}
      _focus={{
        bgColor: 'white',
      }}
      borderColor="white"
      InputLeftElement={
        <Icon
          m={2}
          ml={3}
          size={4}
          color={isOnFocus ? 'gray.400' : 'white'}
          as={<FontAwesome name="search" />}
        />
      }
      InputRightElement={
        text ? (
          <Icon
            m={2}
            mr={3}
            size={4}
            color={isOnFocus ? 'gray.400' : 'white'}
            onPress={handleClear}
            as={<FontAwesome name="times-circle" />}
          />
        ) : undefined
      }
      {...props}
    />
  );
};
