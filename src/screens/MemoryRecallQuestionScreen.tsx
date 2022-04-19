import { Text, View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChoiceMemoryRecallQuestion from '../components/molecules/ChoiceMemoryRecallQuestion';
import ShortAnswerMemoryRecallQuestion from '../components/molecules/ShortAnswerMemoryRecallQuestion';

const MemoryRecallQuestionScreen = () => {
  const [questionType, setQuestionType] = useState('choi');
  return (
    <SafeAreaView>
      <View>
        {questionType === 'choice' ? (
          <ChoiceMemoryRecallQuestion questionNumber={4} />
        ) : (
          <ShortAnswerMemoryRecallQuestion />
        )}
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallQuestionScreen;
