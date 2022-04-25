import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, Icon, ScrollView, Text, View } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Animated } from 'react-native';
import EditButton from '../components/atoms/EditButton';
import ViewAssignedQuestionsCard from '../components/organisms/ViewAssignedQuestionsCard';
import { RootStackParamList } from '../navigation/types';
import Entypo from 'react-native-vector-icons/Entypo';
import { TourguideContext } from '../contexts/TourguideContext';
import {
  TourGuideZone,
  useTourGuideController
} from '../library/rn-multiple-tourguide';
import useAsyncEffect from '../hooks/useAsyncEffect';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuestionCard } from './ViewQuestionPoolScreen';
import { getQuestions } from '../utils/module/question';
import { CaretakerContext } from '../contexts/CaretakerContext';
import { client } from '../config/axiosConfig';

const ViewAsssignedQuestionsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { canStart, start, stop, eventEmitter, tourKey } =
    useTourGuideController('memoryPracticeQuestions');
  const {
    showMemoryPracticeQuestionsTourguide,
    setShowMemoryPracticeQuestionsTourguide
  } = useContext(TourguideContext);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      const result = await AsyncStorage.getItem(
        'viewedMemoryPracticeQuestionsTourguide'
      );
      return result ? JSON.parse(result) : false;
    };
    const shouldShow = !(await fetchData());
    setShowMemoryPracticeQuestionsTourguide(shouldShow);
  }, [AsyncStorage, showMemoryPracticeQuestionsTourguide]);

  useEffect(() => {
    if (canStart && showMemoryPracticeQuestionsTourguide && start) start();
  }, [canStart, showMemoryPracticeQuestionsTourguide]);

  useEffect(() => {
    eventEmitter?.on('stop', async () => {
      setShowMemoryPracticeQuestionsTourguide(false);
      await AsyncStorage.setItem(
        'viewedMemoryPracticeQuestionsTourguide',
        'true'
      );
    });
  }, [eventEmitter]);
  //get backend question pool

  const { currentElderlyUid } = useContext(CaretakerContext);
  const isFocused = useIsFocused();

  const [selectedQuestions, setSelectedQuestions] = useState<QuestionCard[]>(
    []
  );

  const [totalSelected, setTotalSelected] = useState<number>(
    selectedQuestions.length
  );

  const [editState, setEditState] = useState<boolean>(false);

  useEffect(() => {
    setTotalSelected(selectedQuestions.length);
  }, [selectedQuestions]);

  useAsyncEffect(async () => {
    const data = await getQuestions(currentElderlyUid as number);
    const temp = data['questions'].filter((item) => item.isSelected == true);
    setSelectedQuestions(temp);
  }, [isFocused]);

  const handleDelete = async (id: number) => {
    setSelectedQuestions(
      selectedQuestions.filter((ele, index) => index !== id)
    );
    try {
      await client.put(`/memoryPractice/editSelection/false`, {
        elderlyuid: selectedQuestions[id].uid as number,
        mid: `${selectedQuestions[id].mid}`
      });
    } catch (err) {
      throw Error('Cannot remove question');
    }
  };
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 3,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 4,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(spinValue, {
          toValue: 5,
          duration: 50,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [spinValue]);

  const spin1 = spinValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: ['0deg', '-0.35deg', '0.35deg', '0deg', '-0.35deg', '0.35deg']
  });
  const spin2 = spinValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: ['0.35deg', '0deg', '-0.35deg', '0.35deg', '0deg', '-0.35deg']
  });
  const spin3 = spinValue.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5],
    outputRange: ['-0.35deg', '0.35deg', '0deg', '-0.35deg', '0.35deg', '0deg']
  });
  const handleSpin = (index: number) => {
    const rndInt = index % 3;
    if (rndInt == 0) return spin1;
    if (rndInt == 1) return spin2;
    if (rndInt == 2) return spin2;
    return spin1;
  };

  return (
    <View flex={1}>
      <View mx={4} width="100%">
        <View
          mt={4}
          flexDir="row"
          justifyContent="space-between"
          alignItems="center"
          width="92.5%">
          <Text fontWeight="bold" fontSize="17">
            {t('viewAssignedQuestions.assignedQuestions')}
          </Text>
          {editState ? (
            <Button
              h="8"
              borderRadius="md"
              onPress={() => setEditState(!editState)}>
              <Text bottom="15%" color="white">
                {t('viewAssignedQuestions.done')}
              </Text>
            </Button>
          ) : (
            <TourGuideZone
              tourKey={tourKey}
              zone={1}
              shape="rectangle"
              text={t('viewAssignedQuestionsTutorial.step1')}>
              <EditButton
                h="8"
                alignText="15%"
                onPress={() => {
                  setEditState(!editState);
                }}
              />
            </TourGuideZone>
          )}
        </View>
        <View mt={2} flexDir="row">
          <View
            flexDir="row"
            alignItems="center"
            justifyContent="space-between"
            width="77.5%">
            <View flexDir="row">
              <Text color="#52525B" fontSize="14">
                {t('viewAssignedQuestions.for')}
              </Text>
              <Text color="#1D84DF">Koonyai Lastname</Text>
            </View>
            <Text color="#52525B" fontSize="14">
              {t('viewQuestionPool.totalSelected')}
            </Text>
          </View>
          <Text fontWeight="bold" fontSize="17" ml="4">
            {totalSelected}/10
          </Text>
        </View>
        <ScrollView py={2} mb={'56'}>
          {selectedQuestions.length !== 0 ? (
            <TourGuideZone
              tourKey={tourKey}
              zone={2}
              shape="rectangle"
              text={t('homeElderlyTutorial.step2')}>
              {selectedQuestions.map((data: QuestionCard, index: number) => (
                <View key={index}>
                  <Animated.View
                    style={
                      editState
                        ? [
                            ,
                            {
                              transform: [
                                {
                                  rotate: handleSpin(index)
                                }
                              ]
                            }
                          ]
                        : null
                    }>
                    <View flexDir="row">
                      <ViewAssignedQuestionsCard question={data.question} />
                      {editState ? (
                        <Icon
                          ml="-3"
                          as={Entypo}
                          name="circle-with-cross"
                          size="5"
                          color="muted.600"
                          onPress={() => handleDelete(index)}
                        />
                      ) : null}
                    </View>
                  </Animated.View>
                </View>
              ))}
            </TourGuideZone>
          ) : (
            selectedQuestions.map((data: QuestionCard, index: number) => (
              <View key={index}>
                <Animated.View
                  style={
                    editState
                      ? [
                          ,
                          {
                            transform: [
                              {
                                rotate: handleSpin(index)
                              }
                            ]
                          }
                        ]
                      : null
                  }>
                  <View flexDir="row">
                    <ViewAssignedQuestionsCard question={data.question} />
                    {editState ? (
                      <Icon
                        ml="-3"
                        as={Entypo}
                        name="circle-with-cross"
                        size="5"
                        color="muted.600"
                        onPress={() => handleDelete(index)}
                      />
                    ) : null}
                  </View>
                </Animated.View>
              </View>
            ))
          )}
        </ScrollView>
      </View>
      <View
        bottom="0"
        height="20%"
        width="100%"
        position="absolute"
        bgColor="white">
        <TourGuideZone
          tourKey={tourKey}
          zone={3}
          shape="rectangle"
          text={t('viewAssignedQuestionsTutorial.step3')}>
          <Button
            mx={4}
            mt={4}
            onPress={() => navigation.navigate('QuestionPoolScreen')}>
            {t('viewAssignedQuestions.selectQuestionsButton')}
          </Button>
        </TourGuideZone>
        <TourGuideZone
          tourKey={tourKey}
          zone={4}
          shape="rectangle"
          text={t('viewAssignedQuestionsTutorial.step4')}>
          <Button
            borderWidth="1"
            borderColor="#F97316"
            backgroundColor="#FAFAFA"
            _text={{ color: '#F97316' }}
            _pressed={{
              borderColor: '#F94000',
              _text: { color: '#F94000' }
            }}
            mx={4}
            mt={2}
            onPress={() => navigation.navigate('ViewHistoryScreen')}>
            {t('viewAssignedQuestions.viewHistoryButton')}
          </Button>
        </TourGuideZone>
      </View>
    </View>
  );
};

export default ViewAsssignedQuestionsScreen;
