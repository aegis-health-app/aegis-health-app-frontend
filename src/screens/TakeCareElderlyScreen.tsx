import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, View } from 'native-base';
import { RootStackParamList } from '../navigation/types';
import { Elderly } from './../dto/modules/user.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getCaretakingElderlyByEid } from '../utils/caretaker/profile';
import { useTranslation } from 'react-i18next';
import images from '../assets/images';

const TakeCareElderlyScreen = ({
  route,
  navigation
}: NativeStackScreenProps<RootStackParamList, 'TakeCareElderlyScreen'>) => {
  const { uid } = route.params;
  const [elderly, setElderly] = useState<Elderly>();
  const { t } = useTranslation();

  useAsyncEffect(async () => {
    const _elderly = await getCaretakingElderlyByEid(uid);
    setElderly(_elderly);
  }, [uid]);

  return (
    <View>
      <Text fontSize="2xl" fontWeight="700">
        Profile Information
      </Text>
      <View display="flex" flexDir="row" justifyContent="center">
        <Image
          source={
            elderly?.imageid
              ? { uri: elderly.imageid }
              : images.picturePlaceholder
          }
          width="32"
          height="32"
          borderRadius={4}
          alt="Profile Picture"
        />
      </View>
    </View>
  );
};

export default TakeCareElderlyScreen;
