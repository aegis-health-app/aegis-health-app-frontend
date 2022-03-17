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

const Header = ({
    name,
}:HeaderProps) => {
    const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
      <Box>
        <HStack bg="#FFF" px="2" py="3" alignItems="center" w="100%">
        <HStack alignItems="center">
          <IconButton icon={<Icon size="sm" as={MaterialIcons} name="arrow-back-ios" color="blue.500" onPress={() => navigation.navigate('UserLinkScreen')}/>} />
          <Text color="blue.500" fontSize="17">
            กลับ
          </Text>
          </HStack>
          <HStack>
          <Text color="black" fontSize="20" fontWeight="bold">
              {name}
          </Text>
          </HStack>
        </HStack>
      </Box>
  );
};

export default Header;