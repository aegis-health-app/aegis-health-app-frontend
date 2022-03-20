import { Box, Input, View, Text } from 'native-base';
import React from 'react';

type InputBoxProps = {
  name: string;
};

const InputBox = ({ name }: InputBoxProps) => {
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
        {/* When form validation is implemented, use this text style */}
        {/* <Text
          fontSize="sm"
          display="flex"
          alignSelf="flex-start"
          color="danger.500">
          Hint Text
        </Text> */}
      </Box>
    </View>
  );
};

export default InputBox;
