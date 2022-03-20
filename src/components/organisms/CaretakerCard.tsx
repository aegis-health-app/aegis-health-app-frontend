import React from 'react';
import { Image, Box, View, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import EditButton from '../atoms/EditButton';

const CaretakerPic = require('../../assets/images/Caretaker.png');

type CardProps = {
  name: string;
};
// TODO: Consider removal
// const handleNameLength = (name) => {
//   if (name.length <= 18) {
//     return 20;
//   }
//   return 360 / name.length;
// };

const Card = ({ name }: CardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

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
            <Text flex={1} flexWrap="wrap" numberOfLines={1}>
              {name}
            </Text>
          </View>
          <EditButton
            onPress={() => navigation.navigate('EditCaretakerScreen')}
          />
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
