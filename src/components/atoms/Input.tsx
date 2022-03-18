import { Box, Input, View, Text } from "native-base";
import React from "react";

type InputBoxProps = {
  name: string,
};

const InputBox = ({
  name
}:InputBoxProps) => {
    return (
      <View>
        <Box flexDir="row">
          <Text mb="1" ml="5" color="#52525B" fontSize={16}>{name}</Text>
        </Box>
        <Box alignItems="center">
          <Input borderColor="#ACB5BD" placeholder={name} w="90%"/>
        </Box>
      </View>);
  };

export default InputBox;