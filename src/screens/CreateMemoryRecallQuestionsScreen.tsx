import { ScrollView } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MultipleChoiceForm from '../components/organisms/MultipleChoiceForm';
import ShortAnswerForm from '../components/organisms/ShortAnswerForm';

const CreateMemoryRecallQuestionsScreen = () => {
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);

  return (
    <SafeAreaView>
      <ScrollView>
        {isMultipleChoice ? (
          <MultipleChoiceForm
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
          />
        ) : (
          <ShortAnswerForm
            isMultipleChoice={isMultipleChoice}
            setIsMultipleChoice={setIsMultipleChoice}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMemoryRecallQuestionsScreen;
