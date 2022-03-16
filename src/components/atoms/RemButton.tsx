import React from "react";
import { Box, Button } from "native-base";

const RemButton = () => {
    return (
        <Box alignItems="center" margin="4">
            <Button colorScheme="danger" width="95%" size="md" variant="outline" onPress={() => console.log("hello world")}>
            ลบผู้ดูแลคนนี้ออก
            </Button>
        </Box>
    )
}

export default RemButton;