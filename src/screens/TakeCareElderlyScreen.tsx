import React, { useState } from 'react';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { Text, View, Switch, ScrollView } from 'native-base';
import { RootStackParamList } from '../navigation/types';
import { Elderly } from './../dto/modules/user.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getCaretakingElderlyByEid } from '../utils/caretaker/profile';
import { useTranslation } from 'react-i18next';
import BasicProfile, {
  BasicProfileMode
} from '../components/molecules/BasicProfile';
import { TouchableOpacity } from 'react-native';
import ModulePickerList from './../components/organisms/ModulePickerList';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useProfileInfo } from './../hooks/useProfileInfo';
import Spacer from '../components/atoms/Spacer';
import { useNavigation } from '@react-navigation/native';
<<<<<<< HEAD
import {
  getIsEmotionTrackingOn,
  sendEmotionTrackerOff,
  sendEmotionTrackerOn
} from '../utils/caretaker/switch';
=======
>>>>>>> dd9a2dd (feat: update navigation and header fontWeight)

const TakeCareElderlyScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'TakeCareElderlyScreen'>) => {
  const { uid } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
<<<<<<< HEAD

=======
>>>>>>> dd9a2dd (feat: update navigation and header fontWeight)
  const [elderly, setElderly] = useState<Elderly>();
  const { t } = useTranslation();
  const { elderlyBasicProfile } = useProfileInfo(elderly);
  const [isEmotionTrackerOn, setIsEmotionTrackerOn] = useState(false);

  useAsyncEffect(async () => {
    const _elderly = await getCaretakingElderlyByEid(uid);
    setElderly(_elderly);

    const { isEnabled } = await getIsEmotionTrackingOn(uid);
    setIsEmotionTrackerOn(isEnabled);
  }, [uid]);

  async function handleToggle() {
    setIsEmotionTrackerOn((prev) => !prev);
  }

  useAsyncEffect(async () => {
    if (isEmotionTrackerOn) {
      await sendEmotionTrackerOn(uid);
    } else {
      await sendEmotionTrackerOff(uid);
    }
  }, [isEmotionTrackerOn]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <ScrollView nestedScrollEnabled>
        <View px={4}>
          <BasicProfile
            data={elderlyBasicProfile}
            image={elderly?.imageid}
            mode={BasicProfileMode.OTHER}
          />
        </View>
        <Spacer />
        <View px={4}>
          <View mb={4}>
            <View flexDir="row" justifyContent="space-between">
              <Text bold fontSize="lg">
                {t('home.enableEmotion')}
              </Text>
              <Switch
                defaultIsChecked
                colorScheme="primary"
                isChecked={isEmotionTrackerOn}
                onToggle={handleToggle}
              />
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ElderlyEmotionHistoryScreen', { uid: uid })
              }>
              <Text fontSize="md" color="primary.500" underline>
                {t('home.emotionHist')}
              </Text>
            </TouchableOpacity>
          </View>
          {elderly && elderly.listModuleid.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEnabled={false}>
              <ModulePickerList data={elderly?.listModuleid} />
            </ScrollView>
          ) : (
            <View h="80" alignItems="center" mt={6}>
              <View w="full">
                <Text fontSize="2xl" fontWeight="600">
                  {t('modules.modules')}
                </Text>
                <Text fontSize="md" color="gray.500">
                  {t('modules.chooseModule')}
                </Text>
              </View>
              <View mt="24">
                <Text fontSize="md" color="muted.500">
                  {t('modules.elderlyNoModule')}
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TakeCareElderlyScreen;
