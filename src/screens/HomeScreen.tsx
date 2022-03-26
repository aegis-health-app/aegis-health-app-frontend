import { Fab, Icon, ScrollView, Text, View, Image } from 'native-base';
import Divider from '../components/atoms/Divider';
import React, { useContext, useEffect } from 'react';
import UpComingAlert from './../components/organisms/UpComingAlert';
import ModulePickerList from './../components/organisms/ModulePickerList';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController
} from 'rn-tourguide';
import useAsyncEffect from '../hooks/useAsyncEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TourguideContext } from '../contexts/TourguideContext';
import { TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useTranslation } from 'react-i18next';
import useDimensions from '../hooks/useDimensions';

const ProfilePic = require('../assets/images/sompoch.png');

const HomeScreen = () => {
  const { canStart, start, stop, eventEmitter } = useTourGuideController();
  const { showHomeTourguide, setShowHomeTourguide } =
    useContext(TourguideContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { ScreenWidth } = useDimensions();

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedHomeTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowHomeTourguide(shouldShow);
  }, [AsyncStorage, showHomeTourguide]);

  useEffect(() => {
    if (canStart && showHomeTourguide && start) start();
  }, [canStart, showHomeTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      if (stop) {
        setShowHomeTourguide(false);
        await AsyncStorage.setItem('viewedHomeTourguide', 'true');
        stop();
      }
    });
    // @ts-ignore
    return () => eventEmitter?.off('*', null);
  }, []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <ScrollView nestedScrollEnabled h="100%">
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
              zone={1}
              shape="rectangle"
              text={t('homeTutorial.step1')}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <View flexDir="row">
                  <Image
                    source={ProfilePic}
                    width="12"
                    height="12"
                    borderRadius={4}
                    marginRight={4}
                    alt="Profile Picture"
                  />
                  <View>
                    <Text fontSize="xl" fontWeight="600">
                      Name
                    </Text>
                    <Text fontSize="sm" fontWeight="400" color="gray.500">
                      {t('home.profileTouchIndicator')}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TourGuideZone>
            <TourGuideZone
              zone={2}
              shape="rectangle"
              text={t('homeTutorial.step2')}>
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
              zone={3}
              shape="rectangle"
              text={t('homeTutorial.step3')}>
              <UpComingAlert />
            </TourGuideZone>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            width="100%">
            <TourGuideZone
              zone={4}
              shape="rectangle"
              text={t('homeTutorial.step4')}>
              <ModulePickerList />
            </TourGuideZone>
          </ScrollView>
        </View>
      </ScrollView>
      <TourGuideZoneByPosition
        zone={7}
        shape="circle"
        isTourGuide
        bottom={16}
        right={16}
        width={56}
        height={56}
        text={t('homeTutorial.step7')}
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
        zone={5}
        shape={'rectangle'}
        isTourGuide
        bottom={-50}
        left={0}
        width={ScreenWidth / 2}
        height={50}
        text={t('homeTutorial.step5')}
      />
      <TourGuideZoneByPosition
        zone={6}
        shape={'rectangle'}
        isTourGuide
        bottom={-50}
        right={0}
        width={ScreenWidth / 2}
        height={50}
        text={t('homeTutorial.step6')}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
