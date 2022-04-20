import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { number } from 'yup';
import MemoryRecallQuestionProgress from '../components/atoms/MemoryRecallQuestionProgress';
import ChoiceMemoryRecallQuestion from '../components/molecules/ChoiceMemoryRecallQuestion';
import ShortAnswerMemoryRecallQuestion from '../components/molecules/ShortAnswerMemoryRecallQuestion';
import { client } from '../config/axiosConfig';
import useAsyncEffect from '../hooks/useAsyncEffect';

const MemoryRecallQuestionScreen = () => {
  const [questionType, setQuestionType] = useState('choice');
  // useAsyncEffect = () => {
  //   try {
  //     const { data } = await client.get('/memoryRecall/getQuestionSet');
  //   } catch (err) {
  //     console.log('getting question set failed.');
  //   }
  // };
  const [questionNumber, setQuestionNumber] = useState(1);
  useEffect(() => {
    console.log('use effect id called');
  }, [questionNumber]);

  return (
    <SafeAreaView>
      <View>
        <View>
          <MemoryRecallQuestionProgress
            questionNumber={questionNumber}
            totalQuestion={5}
          />
          {questionType === 'choice' ? (
            <ChoiceMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={'22'}
              question={'Where have you been?'}
              imageId={'null'}
              setQuestionNumber={setQuestionNumber}
            />
          ) : (
            <ShortAnswerMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={'22'}
              question={'Where have you been?'}
              imageId={'null'}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallQuestionScreen;
