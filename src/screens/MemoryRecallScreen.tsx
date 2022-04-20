import { Button, Icon, Image, Modal, Text, View } from 'native-base';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import Spacer from '../components/atoms/Spacer';
import { UserContext } from '../contexts/UserContext';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../library/rn-multiple-tourguide';

const MemoryRecallScreen = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [showScreen, setShowScreen] = useState<boolean>(true);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // tour guide copied and modified from health recording screen

  const { showMemoryRecallTourguide, setShowMemoryRecallTourguide } =
    useContext(TourguideContext);
  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController();

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedMemoryRecallTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowMemoryRecallTourguide(shouldShow);
  }, [AsyncStorage, showMemoryRecallTourguide]);

  useEffect(() => {
    if (canStart && showMemoryRecallTourguide && start) start();
  }, [canStart, showMemoryRecallTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowMemoryRecallTourguide(false);
      await AsyncStorage.setItem('viewedMemoryRecallTourguide', 'true');
    });
  }, [eventEmitter]);

  useFocusEffect(
    useCallback(() => {
      setShowScreen(false);
      setTimeout(() => {
        setShowScreen(true);
      }, 0);
    }, [])
  );

  if (!showScreen) return null;

  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View alignItems={'center'} padding={'16'}>
        <Image
          width={'183 px'}
          height={'69 px'}
          source={require('../assets/images/memoryRecallHead.png')}
          alt="Memory recall"
        />
        <Spacer />
        <Spacer />
        <TourGuideZone
          tourKey={tourKey}
          zone={1}
          shape="rectangle"
          text={'Press the “Start Game” button to start the game.'}>
          <View>
            <Button
              w="100%"
              colorScheme="primary"
              variant="solid"
              onPress={() => navigation.navigate('MemoryRecallQuestionScreen')}>
              Start Game
            </Button>
          </View>
        </TourGuideZone>
      </View>
      <View alignItems={'center'}>
        <Image
          width={'340 px'}
          height={'252 px'}
          marginRight={'8 px'}
          source={require('../assets/images/memoryRecallIntro.png')}
          alt="Memory recall"
        />
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallScreen;
