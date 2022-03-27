import React from 'react';
import { Image, View, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import EditButton from '../atoms/EditButton';
import { useTranslation } from 'react-i18next';

const ProfilePic = require('../../assets/images/profile.png');

type UserCardProps = {
  name: string;
  fullName: string;
  imageId: string;
  userIsElderly: boolean;
  uid: number;
  gender: 'F' | 'M';
  bdate: string;
  phone?: string | '';
};

const UserCard = ({
  name,
  fullName,
  imageId,
  userIsElderly,
  gender,
  bdate,
  uid,
  phone
}: UserCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  return (
    <View
      flexDir="row"
      my={1.5}
      justifyContent="space-between"
      alignItems="center"
      width="93%"
      p={1}
      px={2}
      style={styles.card}>
      <>
        <Text>{userIsElderly ? uid : null}</Text>
        <Image
          source={imageId ? imageId : ProfilePic}
          style={styles.image}
          borderRadius={10}
          marginRight={3}
          alt="Profile Picture"
        />
        <Text flex={1} flexWrap="wrap" fontSize="lg" numberOfLines={1}>
          {name}
        </Text>
      </>
      <EditButton
        onPress={() =>
          navigation.navigate('EditCaretakerScreen', {
              info: {
              fullName: fullName,
              gender: gender,
              bdate: bdate,
              phone: phone,
              imageId: imageId,
              cid: uid
              }
          })
        }
      />
    </View>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
  },
  image: {
    width: 60,
    height: 60
  }
});
