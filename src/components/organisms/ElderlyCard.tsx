import React from 'react';
import { Image, View, Text, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import useDimensions from '../../hooks/useDimensions';
import FallbackImage from '../molecules/FallbackImage';

// const ProfilePic = require('../../assets/images/profile.png');

type ElderlyCardProps = {
  name: string;
  imageId: string;
  userIsElderly: boolean;
  uid?: number;
};

const ElderlyCard = ({ name, imageId, uid }: ElderlyCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();
  const { ScreenWidth } = useDimensions();

  function handlePressTakeCare() {
    if (uid !== undefined) {
      navigation.navigate('TakeCareElderlyScreen', {
        uid: uid
      });
    }
  }

  return (
    <View
      flexDir="row"
      my={1.5}
      justifyContent="space-between"
      alignItems="center"
      width={ScreenWidth - 32}
      p={1}
      px={2}
      style={styles.card}>
      <>
        <Image
          source={{ uri: imageId }}
          style={styles.image}
          borderRadius={10}
          marginRight={3}
          fallbackElement={FallbackImage}
          alt="Profile Picture"
        />
        <Text flex={1} flexWrap="wrap" fontSize="lg" numberOfLines={1}>
          {name}
        </Text>
      </>

      <Button onPress={handlePressTakeCare}>{t('home.takeCare')}</Button>
    </View>
  );
};

export default ElderlyCard;

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
