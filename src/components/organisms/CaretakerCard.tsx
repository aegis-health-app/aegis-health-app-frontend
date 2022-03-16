import React from "react";
import { Image, Box, Button, VStack, View, Divider, Text, Icon } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Shadow } from "react-native-shadow-2";

const CaretakerPic = require('../../assets/images/Caretaker.png');

const Card = () => {
    return (
        <Box my='1' alignSelf="center" width="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
          borderColor: "coolGray.800",
          backgroundColor: "gray.800"
        }} _web={{
          shadow: 2,
          borderWidth: 0
        }} _light={{
          backgroundColor: "gray.50"
        }}>
            <Box flexDir="row" justifyContent="space-between" px="2" py="2" alignItems="center">
                <Image
                source={CaretakerPic}
                width="16"
                height="16"
                borderRadius={10}
                marginRight={3}
                alt="Profile Picture"
                />
              <Text maxWidth="60%" fontSize="lg" fontWeight="bold">
                Somying Muangyim
              </Text>
              <Button borderRadius='lg' bgColor='gray.300' width="auto" flexDir="row" marginLeft="auto" onPress={() => console.log('hello world')}
                leftIcon=
                {<Icon
                  as={MaterialIcons}
                  name="mode-edit"
                  size={5}
                  color="muted.600"
                />}>
                <Text color="gray.800">
                  แก้ใข
                </Text>
              </Button>
            </Box>
          </Box>
        
      );
}

export default Card;