import { View, Box, HStack, IconButton, Icon, Text} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import React from 'react';
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type HeaderProps = {
    name: string,
  };

const HeaderBack = ({
    name,
}:HeaderProps) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
      <Box>
        <View flexDir="row" mb="6" bg="#FFF" px="2" py="3" justifyContent="center" alignItems="center" w="100%">
        <View flexDir="row" alignItems="center" position="absolute" left="2">
          <Icon mx="2" mt="3" size="sm" as={MaterialIcons} name="arrow-back-ios" color="blue.500" 
          onPress={() => navigation.navigate('UserLinkScreen')}/>
          <Text mt="3" color="blue.500" fontSize="17" onPress={() => navigation.navigate('UserLinkScreen')}>
            กลับ
          </Text>
          </View>
          <View >
          <Text mt="3" color="black" fontSize="20" fontWeight="bold">
              {name}
          </Text>
          </View>
        </View>
      </Box>
  );
};

export default HeaderBack;