import React from "react";
import { Image, Box, Button, VStack, View, Divider, Text, Icon } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import EditCaretakerScreen from "../../screens/EditCaretakerScreen";


const CaretakerPic = require('../../assets/images/Caretaker.png');

type CardProps = {
  name: string,
};

const handleNameLength = (name) => {
  if(name.length <= 16) return 18;
  return (300/name.length);
}

const Card = ({
  name
}:CardProps) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
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
            <Box bgColor="white" flexDir="row" justifyContent="space-between" px="2" py="2" alignItems="center">
                <View flexDir="row" alignItems="center" minW="72%" overflow="hidden">
                <Image
                source={CaretakerPic}
                width="16"
                height="16"
                borderRadius={10}
                marginRight={3}
                alt="Profile Picture"
                />
              <Text fontSize={handleNameLength(name)}>
                {name}
              </Text>
              </View>
              <Button borderRadius='lg' bgColor='gray.300' width="auto" flexDir="row" onPress={() => navigation.navigate('EditCaretakerScreen')}
                leftIcon=
                {<Icon
                  as={MaterialIcons}
                  name="mode-edit"
                  size="5"
                  color="muted.600"
                />}
                _pressed={{
                  bg: "gray.400"
                }}
                >
                <Text ml="-1" color="gray.800">
                  แก้ใข
                </Text>
              </Button>
            </Box>
          </Box>
        
      );
}

export default Card;