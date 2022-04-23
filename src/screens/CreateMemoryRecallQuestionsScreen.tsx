import { ScrollView, Text } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleChoiceForm from '../components/organisms/MultipleChoiceForm';
import ShortAnswerForm from '../components/organisms/ShortAnswerForm';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { FormState } from './../dto/modules/memoryRecall';

const CreateMemoryRecallQuestionsScreen = ({
  route
}: NativeStackScreenProps<
  RootStackParamList,
  'CreateMemoryRecallQuestionsScreen'
>) => {
  const { questionInfo, question, edit } = route.params;
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);
  const [formState, setFormState] = useState<FormState>({
    question: questionInfo ? questionInfo.question : question,
    image: undefined
  });

  return (
    <SafeAreaView>
      <ScrollView>
        {isMultipleChoice ? (
          <MultipleChoiceForm
            formState={formState}
            setFormState={setFormState}
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
            edit={edit}
          />
        ) : (
          <ShortAnswerForm
            formState={formState}
            setFormState={setFormState}
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
            edit={edit}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMemoryRecallQuestionsScreen;
