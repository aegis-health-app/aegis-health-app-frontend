import React from 'react';
import { Image, Box, Button, View, Text, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';

const CaretakerPic = require('../../assets/images/Caretaker.png');

type CardProps = {
  name: string;
};

const handleNameLength = (name) => {
  if (name.length <= 18) {
    return 20;
  }
  return 360 / name.length;
};

const Card = ({ name }: CardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View flexDir="row" justifyContent="center">
      <View flexDir="row" my={1.5} w="90%" bgColor="#fff" style={styles.card}>
        <Box
          bgColor="white"
          flexDir="row"
          justifyContent="space-between"
          px="2"
          py="2"
          alignItems="center">
          <View flexDir="row" alignItems="center" minW="72%" overflow="hidden">
            <Image
              source={CaretakerPic}
              width="16"
              height="16"
              borderRadius={10}
              marginRight={3}
              alt="Profile Picture"
            />
            <Text fontSize={handleNameLength(name)}>{name}</Text>
          </View>
          <Button
            borderRadius="lg"
            bgColor="gray.300"
            width="auto"
            flexDir="row"
            onPress={() => navigation.navigate('EditCaretakerScreen')}
            leftIcon={
              <Icon
                as={MaterialIcons}
                name="mode-edit"
                size="5"
                color="muted.600"
              />
            }
            _pressed={{
              bg: 'gray.400'
            }}>
            <Text ml="-1" color="gray.800">
              แก้ใข
            </Text>
          </Button>
        </Box>
      </View>
    </View>
  );
};

export default Card;

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
    borderRadius: 10
  },
  textWrapper: {
    textWrap: 'wrap',
    flex: 1
  }
});
