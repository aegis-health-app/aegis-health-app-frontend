import React from "react";
import { Box, Button } from "native-base";

const AddButton = () => {
    return (
        <Box alignItems="center" margin="4">
            <Button colorScheme="info" width="95%" size="md" variant="outline" onPress={() => console.log('hello world')}>
            เพิ่มผู้ดูแล
            </Button>
        </Box>
    )
}

export default AddButton;