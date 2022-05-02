import React, { useContext, useEffect, useState } from 'react';
import { View, FlatList } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import UserCard from '../components/organisms/CaretakerCard';
import { ElderlyContext } from '../contexts/ElderlyContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getCaretakerList } from '../utils/elderly/caretakerList';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  TourGuideZoneByPosition,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDimensions from '../hooks/useDimensions';
import { useTranslation } from 'react-i18next';

const UserLinkScreen = () => {
  const isFocused = useIsFocused();
  const { ScreenWidth } = useDimensions();
  const { t } = useTranslation();

  const { caretakerList, setCaretakerList } = useContext(ElderlyContext);
  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController('elderlyLink');
  const { showElderlyLinkTourguide, setShowElderlyLinkTourguide } =
    useContext(TourguideContext);
  const [hasElderly, setHasElderly] = useState(
    caretakerList.length === 0 ? false : true
  );

  useAsyncEffect(async () => {
    const data = await getCaretakerList();
    setCaretakerList(data);
    setHasElderly(data.length === 0 ? false : true);
  }, [isFocused]);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem('viewedElderlyLinkTourguide');
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowElderlyLinkTourguide(shouldShow);
  }, [AsyncStorage, showElderlyLinkTourguide]);

  useEffect(() => {
    if (canStart && showElderlyLinkTourguide && start) start();
  }, [canStart, showElderlyLinkTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowElderlyLinkTourguide(false);
      await AsyncStorage.setItem('viewedElderlyLinkTourguide', 'true');
    });
  }, [eventEmitter]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View bgColor="#FAFAFA" flex={1}>
      {hasElderly ? (
        <TourGuideZoneByPosition
          tourKey={tourKey}
          zone={1}
          shape={'rectangle'}
          isTourGuide
          top={21}
          right={24.5}
          width={83}
          height={40}
          text={t('homeElderlyTutorial.step5')}
        />
      ) : null}
      <FlatList
        data={caretakerList}
        renderItem={({ item }) => (
          <View alignItems="center">
            <UserCard
              name={item.dname}
              fullName={`${item.fname} ${item.lname}`}
              imageId={item.imageid}
              userIsElderly={false}
              gender={item.gender}
              bdate={item.bday}
              phone={item.phone}
              uid={item.uid}
            />
          </View>
        )}
        keyExtractor={(_, key) => key.toString()}
      />
      <TourGuideZone
        tourKey={tourKey}
        zone={2}
        shape="rectangle"
        text={t('homeElderlyTutorial.step1')}>
        <AddButton />
      </TourGuideZone>
      <TourGuideZoneByPosition
        tourKey={tourKey}
        zone={3}
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
        zone={4}
        shape={'circle'}
        isTourGuide
        top={-58}
        right={6}
        width={48}
        height={48}
        text={t('settingTutorial.step4')}
      />
    </View>
  );
};
export default UserLinkScreen;
