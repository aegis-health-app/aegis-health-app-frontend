import { Box, Input } from "native-base";
import React from "react";

const NameChangeInput = (props) => {
    return <Box alignItems="center">
        <Input borderColor="gray.700" placeholder={props.placeholder} w="90%"/>
      </Box>;
  };

export default NameChangeInput;