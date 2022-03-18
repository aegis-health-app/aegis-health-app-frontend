import React from "react";
import { Image, Box, Button, VStack, View, Divider, Text, Icon } from "native-base";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from "react-native";

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
        <View flexDir="row" justifyContent="center">
          <View flexDir="row" my={2} w="90%" bgColor="#fff" style={styles.card}>
            <Box bgColor="white" flexDir="row" justifyContent="flex-start" px="2" py="2" alignItems="center">
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
          </View>
        </View>
        
      );
}

export default InfoCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  },
  textWrapper: {
    textWrap: 'wrap',
    flex: 1
  }
});
