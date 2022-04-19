import { Text, View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChoiceMemoryRecallQuestion from '../components/molecules/ChoiceMemoryRecallQuestion';

const MemoryRecallQuestionScreen = () => {
  const [questionType, setQuestionType] = useState('choice');
  return (
    <SafeAreaView>
      {questionType === 'choice' ? (
        <ChoiceMemoryRecallQuestion questionNumber={4} />
      ) : (
        <View>
          <Text>The question type is a short answer.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MemoryRecallQuestionScreen;
