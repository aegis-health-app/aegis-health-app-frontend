import { View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MemoryRecallQuestionProgress from '../components/atoms/MemoryRecallQuestionProgress';
import ChoiceMemoryRecallQuestion from '../components/molecules/ChoiceMemoryRecallQuestion';
import ShortAnswerMemoryRecallQuestion from '../components/molecules/ShortAnswerMemoryRecallQuestion';
import { MemoryRecallQuestionDto } from '../dto/modules/memoryRecallElderly.dto';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getMemoryRecallQuestionSet } from '../utils/elderly/memoryRecallElderly';

const MemoryRecallQuestionScreen = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionSet, setQuestionSet] = useState<MemoryRecallQuestionDto>();
  useAsyncEffect(async () => {
    const data = await getMemoryRecallQuestionSet();
    console.log('question set ', data);
    setQuestionSet(data);
  }, []);
  const totalQuestion: number = questionSet?.questions.length ?? 0;
  useEffect(() => {
    console.log(questionSet?.questions[questionNumber].isMultipleChoice);
  }, [questionNumber]);
  console.log(questionSet);
  return (
    <SafeAreaView>
      <View>
        <View>
          <MemoryRecallQuestionProgress
            questionNumber={questionNumber + 1}
            totalQuestion={totalQuestion}
            setQuestionNumber={setQuestionNumber}
          />
          {questionSet?.questions[questionNumber].isMultipleChoice ? (
            <ChoiceMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={'22'}
              question={questionSet?.questions[questionNumber].question ?? ' '}
              imageId={questionSet?.questions[questionNumber].imageid ?? ' '}
              choice1={
                questionSet?.questions[questionNumber].multipleChoiceQuestion
                  .choice1
              }
              choice2={
                questionSet?.questions[questionNumber].multipleChoiceQuestion
                  .choice2
              }
              choice3={
                questionSet?.questions[questionNumber].multipleChoiceQuestion
                  .choice3
              }
              choice4={
                questionSet?.questions[questionNumber].multipleChoiceQuestion
                  .choice4
              }
              correctAnswer={
                questionSet?.questions[questionNumber].multipleChoiceQuestion
                  .correctAnswer
              }
              setQuestionNumber={setQuestionNumber}
              totalQuestion={totalQuestion}
            />
          ) : (
            <ShortAnswerMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={'22'}
              question={questionSet?.questions[questionNumber].question ?? ' '}
              imageId={questionSet?.questions[questionNumber].imageId ?? ' '}
              setQuestionNumber={setQuestionNumber}
              totalQuestion={totalQuestion}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallQuestionScreen;
