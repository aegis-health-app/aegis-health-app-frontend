import { Box, HStack, Icon, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type HeaderProps = {
  name: string;
};

const Header = ({ name }: HeaderProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Box>
      <HStack
        mb="6"
        bg="#FFF"
        px="2"
        py="3"
        justifyContent="center"
        alignItems="flex-end"
        w="100%">
        <HStack>
          <Text mt="3" color="black" fontSize="20" fontWeight="bold">
            {name}
          </Text>
        </HStack>
        <HStack position="absolute" right="5" top="5">
          <Icon
            mt="2"
            size="sm"
            as={MaterialIcons}
            name="help-outline"
            color="orange.500"
            onPress={() => navigation.navigate('UserLinkScreen')}
          />
        </HStack>
      </HStack>
    </Box>
  );
};

export default Header;
