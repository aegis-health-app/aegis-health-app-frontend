import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, View, ScrollView, Switch } from 'native-base';
import { RootStackParamList } from '../navigation/types';
import { Elderly } from './../dto/modules/user.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getCaretakingElderlyByEid } from '../utils/caretaker/profile';
import { useTranslation } from 'react-i18next';
import images from '../assets/images';
import BasicProfile from '../components/molecules/BasicProfile';
import HealthProfile from '../components/molecules/HealthProfile';
import { TouchableOpacity } from 'react-native';
import ModulePickerList from './../components/organisms/ModulePickerList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileInfo } from './../hooks/useProfileInfo';

const TakeCareElderlyScreen = ({
  route,
  navigation
}: NativeStackScreenProps<RootStackParamList, 'TakeCareElderlyScreen'>) => {
  const { uid } = route.params;
  const [elderly, setElderly] = useState<Elderly>();
  const { t } = useTranslation();
  const { basicProfile, healthProfile } = useProfileInfo();

  useAsyncEffect(async () => {
    const _elderly = await getCaretakingElderlyByEid(uid);
    setElderly(_elderly);
  }, [uid]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View flex={1} px={4}>
        <BasicProfile data={basicProfile} />
        <View>
          <View flexDir="row" justifyContent="space-between">
            <Text bold fontSize="lg">
              {t('home.enableEmotion')}
            </Text>
            <Switch defaultIsChecked colorScheme="primary" />
          </View>
          <TouchableOpacity>
            <Text fontSize="md" color="primary.500" underline>
              {t('home.emotionHist')}
            </Text>
          </TouchableOpacity>
        </View>
        <HealthProfile data={healthProfile} />
        {elderly && [] > 0 ? (
          <ModulePickerList data={elderly?.listModuleid} />
        ) : (
          <View h="80" alignItems="center" justifyContent="center">
            <View w="full">
              <Text fontSize="2xl" fontWeight="600">
                {t('modules.modules')}
              </Text>
              <Text fontSize="md" color="gray.500">
                {t('modules.chooseModule')}
              </Text>
            </View>
            <View justifyContent="center" bgColor="red.100">
              <Text fontSize="md" color="muted.500">
                {t('modules.elderlyNoModule')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default TakeCareElderlyScreen;
