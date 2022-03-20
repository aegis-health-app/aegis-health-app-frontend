import { Box, Input, View, Text } from 'native-base';
import React from 'react';
import { TextInput } from 'react-native';
import { useState } from 'react';

type InputBoxProps = {
  name: string;
  placeholder?: string;
};

const InputBox = ({ name, placeholder }: InputBoxProps) => {

  const [value, setValue] = useState("");

  // todo change display name
  const handleChange = (text) => {
    setValue(text);
    // console.log(text);
  }

  return (
    <View>
      <Box flexDir="row">
        <Text mb="1" color="#52525B" fontSize="md">
          {name}
        </Text>
      </Box>
      <Box alignItems="center" h={16} mb={2}>
        <Input
          borderColor="#ACB5BD"
          placeholder={name}
          w="100%"
          size="xl"
          fontSize="sm"
          padding={3}
        />
      </Box>
    </View>
  );
};

export default InputBox;
