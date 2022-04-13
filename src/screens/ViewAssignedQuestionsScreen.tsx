import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button, ScrollView, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditButton from '../components/atoms/EditButton';
import ViewAssignedQuestionsCard from '../components/organisms/ViewAssignedQuestionsCard';
import { RootStackParamList } from '../navigation/types';

interface QuestionCard {
  question: string;
}

const ViewAsssignedQuestionsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  //get backend question pool
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionCard[]>([
    { question: 'What did you eat this morning?' },
    { question: 'What did you eat this afternoon?' },
    { question: 'What will you eat tonight?' }
  ]);

  const [totalSelected, setTotalSelected] = useState<number>(
    selectedQuestions.length
  );

  const [editState, setEditState] = useState<boolean>(false);

  const totalChange = useCallback(() => {
    setTotalSelected(selectedQuestions.length);
  }, [selectedQuestions]);

  //post to backend selected questions
  const handleSubmit = () => {
    console.log(selectedQuestions);
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
            <EditButton
              h="8"
              alignText="15%"
              onPress={() => {
                console.log('edit');
                setEditState(!editState);
              }}
            />
          ) : (
            <Button
              h="8"
              borderRadius="md"
              onPress={() => setEditState(!editState)}>
              <Text bottom="15%" color="white">
                {t('viewAssignedQuestions.done')}
              </Text>
            </Button>
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
        <ScrollView pt={4}>
          {selectedQuestions.map((data, index: number) => (
            <View key={index}>
              <ViewAssignedQuestionsCard question={data.question} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        bottom="0"
        height="20%"
        width="100%"
        position="absolute"
        bgColor="white">
        <Button mx={4} mt={4} onPress={() => handleSubmit()}>
          {t('viewAssignedQuestions.selectQuestionsButton')}
        </Button>
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
          onPress={() => handleSubmit()}>
          {t('viewAssignedQuestions.viewHistoryButton')}
        </Button>
      </View>
    </View>
  );
};

export default ViewAsssignedQuestionsScreen;
