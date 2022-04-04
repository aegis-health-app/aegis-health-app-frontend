import React, { useState } from 'react';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp
} from '@react-navigation/native-stack';
import { Text, View, Switch, ScrollView, useToast } from 'native-base';
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
import {
<<<<<<< HEAD
  getIsEmotionTrackingOn,
  sendEmotionTrackerOff,
  sendEmotionTrackerOn
=======
  clearSwitchState,
  getSwitchState,
  saveSwitchState
>>>>>>> 535c4b0 (feat: add emotional tracking switch state checker & limit)
} from '../utils/caretaker/switch';

const TakeCareElderlyScreen = ({
  route
}: NativeStackScreenProps<RootStackParamList, 'TakeCareElderlyScreen'>) => {
  const { uid } = route.params;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [elderly, setElderly] = useState<Elderly>();
  const { t } = useTranslation();
<<<<<<< HEAD
  const { elderlyBasicProfile } = useProfileInfo(elderly);
  const [isEmotionTrackerOn, setIsEmotionTrackerOn] = useState(false);
=======
  const { elderlyBasicProfile, elderlyHealthProfile } = useProfileInfo(elderly);
  const [isEmotionTrackerOn, setIsEmotionTrackerOn] = useState(false);

  const toast = useToast();
>>>>>>> 535c4b0 (feat: add emotional tracking switch state checker & limit)

  useAsyncEffect(async () => {
    const _elderly = await getCaretakingElderlyByEid(uid);
    setElderly(_elderly);

    const { isEnabled } = await getIsEmotionTrackingOn(uid);
    setIsEmotionTrackerOn(isEnabled);
  }, [uid]);

<<<<<<< HEAD
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
=======
  useAsyncEffect(async () => {
    const now = new Date();
    await clearSwitchState(now);
    await getSwitchState();
  }, []);

  async function handleToggle() {
    const now = new Date();
    setIsEmotionTrackerOn((prev) => !prev);

    if (isEmotionTrackerOn === true) {
      const result = await saveSwitchState(now);
      if (result === 3) {
        toast.show({
          title: t('emotionalRecord.switchLast'),
          status: 'warning'
        });
      } else if (result === 4) {
        toast.show({
          title: t('emotionalRecord.switchDisabled'),
          status: 'warning'
        });
      }
    }
  }
>>>>>>> 535c4b0 (feat: add emotional tracking switch state checker & limit)

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
