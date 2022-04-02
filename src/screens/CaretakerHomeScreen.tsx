import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  View,
  Fab,
  Icon,
  ScrollView,
  Divider,
  Image,
  Text,
  Button
} from 'native-base';
import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ElderlyInCareList from '../components/organisms/ElderlyInCareList';
import { TourguideContext } from '../contexts/TourguideContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import { RootStackParamList } from '../navigation/types';
import UpComingAlert from './../components/organisms/UpComingAlert';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../contexts/UserContext';

const ProfilePic = require('../assets/images/profile.png');

const CaretakerHomeScreen = () => {
  const { canStart, start, eventEmitter, tourKey } =
    useTourGuideController('caretakerHome');
  const { showCaretakerHomeTourguide, setShowCaretakerHomeTourguide } =
    useContext(TourguideContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { user } = useContext(UserContext);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedCaretakerHomeTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowCaretakerHomeTourguide(shouldShow);
  }, [AsyncStorage, showCaretakerHomeTourguide]);

  useEffect(() => {
    if (canStart && showCaretakerHomeTourguide && start) start();
  }, [canStart, showCaretakerHomeTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowCaretakerHomeTourguide(false);
      await AsyncStorage.setItem('viewedCaretakerHomeTourguide', 'true');
    });
  }, [eventEmitter]);

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <Fab
        placement="bottom-right"
        renderInPortal={false}
        size="sm"
        bgColor="#000"
        icon={<Icon as={AntDesign} name="question" size="6" color="#fff" />}
      />

      <ScrollView nestedScrollEnabled>
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
              text={t('homeCaretakerTutorial.step1')}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProfileScreen')}>
                <View flexDir="row">
                  <Image
                    source={user ? { uri: user.imageid } : ProfilePic}
                    width="12"
                    height="12"
                    borderRadius={4}
                    marginRight={4}
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
              text={t('homeCaretakerTutorial.step2')}>
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
              text={t('homeCaretakerTutorial.step3')}>
              <UpComingAlert />
            </TourGuideZone>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}>
            <View>
              <TourGuideZone
                tourKey={tourKey}
                zone={4}
                shape="rectangle"
                text={t('homeCaretakerTutorial.step4')}>
                <ElderlyInCareList />
              </TourGuideZone>
            </View>
          </ScrollView>
          <View w="full">
            <TourGuideZone
              tourKey={tourKey}
              zone={5}
              shape="rectangle"
              text={t('homeCaretakerTutorial.step5')}>
              <View>
                <Button
                  variant="outline"
                  colorScheme="primary"
                  width="100%"
                  my={4}
                  onPress={() => navigation.navigate('ConnectElderlyScreen')}>
                  {t('home.addElderlyButton')}
                </Button>
              </View>
            </TourGuideZone>
          </View>
        </View>
      </ScrollView>
      <Fab
        placement="bottom-right"
        renderInPortal={false}
        size="sm"
        bgColor="#000"
        icon={<Icon as={AntDesign} name="question" size="6" color="#fff" />}
        onPress={() => start()}
      />
      <TourGuideZoneByPosition
        tourKey={tourKey}
        zone={6}
        shape="circle"
        isTourGuide
        bottom={16}
        right={16}
        width={56}
        height={56}
        text={t('homeCaretakerTutorial.step6')}
      />
    </SafeAreaView>
  );
};

export default CaretakerHomeScreen;
