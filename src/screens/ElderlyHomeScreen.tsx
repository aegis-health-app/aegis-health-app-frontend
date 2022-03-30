import {
  Fab,
  Icon,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
  FormControl,
  Input,
  Button,
  Spacer
} from 'native-base';
import Divider from '../components/atoms/Divider';
import React, { useContext, useEffect, useState } from 'react';
import UpComingAlert from './../components/organisms/UpComingAlert';
import ModulePickerList from './../components/organisms/ModulePickerList';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import useAsyncEffect from '../hooks/useAsyncEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TourguideContext } from '../contexts/TourguideContext';
import { StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import useDimensions from '../hooks/useDimensions';
import { UserContext } from '../contexts/UserContext';
import FallbackImage from '../components/molecules/FallbackImage';
import EmotionCard from '../components/organisms/EmotionCard';
import { flexbox } from 'native-base/lib/typescript/theme/styled-system';
import moment from 'moment';
import FallbackImage from '../components/molecules/FallbackImage';
import EmotionCard from '../components/organisms/EmotionCard';
import { flexbox } from 'native-base/lib/typescript/theme/styled-system';

const ProfilePic = require('../assets/images/profile.png');

const ElderlyHomeScreen = () => {
  const { canStart, start, eventEmitter, tourKey } =
    useTourGuideController('elderlyHome');
  const { showElderlyHomeTourguide, setElderlyshowElderlyHomeTourguide } =
    useContext(TourguideContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { ScreenWidth } = useDimensions();
  const { user } = useContext(UserContext);
  const [showEmotionCard, setShowEmotionCard] = useState<boolean>(false);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedElderlyHomeTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setElderlyshowElderlyHomeTourguide(shouldShow);
  }, [AsyncStorage, showElderlyHomeTourguide]);

  useEffect(() => {
    if (canStart && showElderlyHomeTourguide && start) start();
  }, [canStart, showElderlyHomeTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setElderlyshowElderlyHomeTourguide(false);
      await AsyncStorage.setItem('viewedElderlyHomeTourguide', 'true');
    });
  }, [eventEmitter]);

  const getEmotionDate = async () => {
    const emotionDate = await AsyncStorage.getItem('emotionDate');
    const result = emotionDate ? JSON.parse(emotionDate) : new Date(0);
    console.log('result' + result);
    return result;
  };

  useAsyncEffect(async () => {
    const emotionDate = moment(await getEmotionDate());
    const todayDate = moment().format('L');
    console.log('emotion date' + emotionDate);
    if (emotionDate.isSame(todayDate, 'day')) {
      // change from ture to false
      setShowEmotionCard(true);
      console.log('emotion date is the same as today date');
    } else {
      console.log('emotion date is not the same as today date');
      setShowEmotionCard(true);
    }
  }, []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <ScrollView nestedScrollEnabled h="100%">
        {/* Emotion card */}
        <EmotionCard
          showEmotionCard={showEmotionCard}
          close={() => setShowEmotionCard(false)}
          message={moment().format('dddd')}
        />
        <View
          flex={1}
          alignItems="center"
          justifyContent="flex-start"
          paddingTop={6}
          paddingX={4}>
          <View
            flexDir="row"
            justifyContent="space-between"
            width="100%"
            alignItems="center">
            <TourGuideZone
              tourKey={tourKey}
              zone={1}
              shape="rectangle"
              text={t('homeElderlyTutorial.step1')}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <View flexDir="row">
                  <Image
                    source={user ? { uri: user.imageid } : ProfilePic}
                    width="12"
                    height="12"
                    borderRadius={4}
                    marginRight={4}
                    fallbackElement={FallbackImage}
                    alt="Profile Picture"
                  />
                  <View>
                    <Text fontSize="xl" fontWeight="600">
                      {`${user?.fname} ${user?.lname}`}
                    </Text>
                    <Text fontSize="sm" fontWeight="400" color="gray.500">
                      {t('home.profileTouchIndicator')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TourGuideZone>
            <TourGuideZone
              tourKey={tourKey}
              zone={2}
              shape="rectangle"
              text={t('homeElderlyTutorial.step2')}>
              <View alignItems="center" justifyContent="center">
                <Icon
                  as={MaterialIcons}
                  name="settings"
                  size={8}
                  color="muted.600"
                  onPress={() => navigation.navigate('SettingScreen')}
                />
                <Text fontSize="sm" color="gray.500">
                  {t('home.settingButton')}
                </Text>
              </View>
            </TourGuideZone>
          </View>
          <Divider />
          <View w="full">
            <TourGuideZone
              tourKey={tourKey}
              zone={3}
              shape="rectangle"
              text={t('homeElderlyTutorial.step3')}>
              <UpComingAlert />
            </TourGuideZone>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            width="100%">
            <TourGuideZone
              tourKey={tourKey}
              zone={4}
              shape="rectangle"
              text={t('homeElderlyTutorial.step4')}>
              <ModulePickerList />
            </TourGuideZone>
          </ScrollView>
        </View>
      </ScrollView>
      <TourGuideZoneByPosition
        tourKey={tourKey}
        zone={7}
        shape="circle"
        isTourGuide
        bottom={16}
        right={16}
        width={56}
        height={56}
        text={t('homeElderlyTutorial.step7')}
      />
      <Fab
        placement="bottom-right"
        renderInPortal={false}
        size="sm"
        bgColor="#000"
        icon={<Icon as={AntDesign} name="question" size="6" color="#fff" />}
        onPress={() => {
          if (start) {
            start();
          }
        }}
      />
      <TourGuideZoneByPosition
        tourKey={tourKey}
        zone={5}
        shape={'rectangle'}
        isTourGuide
        bottom={-50}
        left={0}
        width={ScreenWidth / 2}
        height={50}
        text={t('homeElderlyTutorial.step5')}
      />
      <TourGuideZoneByPosition
        tourKey={tourKey}
        zone={6}
        shape={'rectangle'}
        isTourGuide
        bottom={-50}
        right={0}
        width={ScreenWidth / 2}
        height={50}
        text={t('homeElderlyTutorial.step6')}
      />
    </SafeAreaView>
  );
};

export default ElderlyHomeScreen;

const styles = StyleSheet.create({
  emotionPicker: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexDirection: 'row'
  },
  emotionButton: {
    backgroundColor: '#fafafa',
    borderRadius: 20,
    padding: 10,
    margin: 8
  },
  pictureArea: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12
  }
});
