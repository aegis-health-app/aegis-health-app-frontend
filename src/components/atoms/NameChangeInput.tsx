import { Box, Input } from "native-base";
import React from "react";

const NameChangeInput = () => {
    return <Box alignItems="center">
        <Input borderColor="gray.700" placeholder="เปลี่ยนชื่อผู้ใช้" w="90%"/>
      </Box>;
  };

export default NameChangeInput;