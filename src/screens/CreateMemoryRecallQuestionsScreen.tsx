import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleChoiceForm from '../components/organisms/MultipleChoiceForm';
import ShortAnswerForm from '../components/organisms/ShortAnswerForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const CreateMemoryRecallQuestionsScreen = ({
  route
}: NativeStackScreenProps<
  RootStackParamList,
  'CreateMemoryRecallQuestionsScreen'
>) => {
  const { questionInfo, question } = route.params;
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);

  return (
    <SafeAreaView>
      <ScrollView>
        {isMultipleChoice ? (
          <MultipleChoiceForm
            questionInfo={questionInfo}
            question={question}
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
          />
        ) : (
          <ShortAnswerForm
            questionInfo={questionInfo}
            question={question}
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMemoryRecallQuestionsScreen;
