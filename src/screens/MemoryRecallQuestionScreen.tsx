import { View } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MemoryRecallQuestionProgress from '../components/atoms/MemoryRecallQuestionProgress';
import ChoiceMemoryRecallQuestion from '../components/molecules/ChoiceMemoryRecallQuestion';
import ShortAnswerMemoryRecallQuestion from '../components/molecules/ShortAnswerMemoryRecallQuestion';
import {
  Answer,
  MemoryRecallQuestionDto
} from '../dto/modules/memoryRecallElderly.dto';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getMemoryRecallQuestionSet } from '../utils/elderly/memoryRecallElderly';

const MemoryRecallQuestionScreen = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionSet, setQuestionSet] = useState<MemoryRecallQuestionDto>();
  const [answerArray, setAnswerArray] = useState<Answer[]>([]);
  useAsyncEffect(async () => {
    const data = await getMemoryRecallQuestionSet();
    setQuestionSet(data);
  }, []);
  const totalQuestion: number = questionSet?.questions.length ?? 0;
  console.log('question set: ', questionSet);

  return (
    <SafeAreaView>
      <View>
        <View>
          <MemoryRecallQuestionProgress
            questionNumber={questionNumber}
            totalQuestion={totalQuestion}
            setQuestionNumber={setQuestionNumber}
            answerArray={answerArray}
            setAnswerArray={setAnswerArray}
            mid={questionSet?.questions[questionNumber].mid ?? 0}
          />
          {questionSet?.questions[questionNumber].isMultipleChoice ? (
            <ChoiceMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={questionSet?.questions[questionNumber].mid}
              question={questionSet?.questions[questionNumber].question ?? ' '}
              imageid={questionSet?.questions[questionNumber].imageid ?? ' '}
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
              answerArray={answerArray}
              setAnswerArray={setAnswerArray}
            />
          ) : (
            <ShortAnswerMemoryRecallQuestion
              questionNumber={questionNumber}
              mid={questionSet?.questions[questionNumber].mid ?? 0}
              question={questionSet?.questions[questionNumber].question ?? ' '}
              imageid={questionSet?.questions[questionNumber].imageid ?? ' '}
              setQuestionNumber={setQuestionNumber}
              totalQuestion={totalQuestion}
              answerArray={answerArray}
              setAnswerArray={setAnswerArray}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallQuestionScreen;
