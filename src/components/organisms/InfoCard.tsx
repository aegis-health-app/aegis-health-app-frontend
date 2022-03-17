import React from "react";
import { Image, Box, Button, VStack, View, Divider, Text, Icon } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CaretakerPic = require('../../assets/images/Caretaker.png');

type InfoCardProps = {
  icon: any,
  desc: string,
};

const InfoCard = ({
  icon,
  desc
}: InfoCardProps) => {
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
            <Box flexDir="row" justifyContent="flex-start" px="2" py="2" alignItems="center">
            <Icon
                  as={MaterialIcons}
                  name={icon}
                  size={8}
                  color="orange.500"
                />
              <Text ml="2" fontSize="md" maxW="85%">
              {desc}
              </Text>
            </Box>
          </Box>
        
      );
}

export default InfoCard;