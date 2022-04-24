import { ScrollView } from 'native-base';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { QuestionDetailsResponse } from '../dto/modules/memoryRecall';
import EditMultipleChoiceForm from '../components/organisms/EditMultipleChoiceForm';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { CaretakerContext } from '../contexts/CaretakerContext';
import { getQuestionDetails } from '../utils/caretaker/memoryRecall';
import EditShortAnswerForm from './../components/organisms/EditShortAnswerForm';

const EditMemoryRecallQuestionsScreen = ({
  route
}: NativeStackScreenProps<
  RootStackParamList,
  'EditMemoryRecallQuestionsScreen'
>) => {
  const { data } = route.params;
  const [question, setQuestion] = useState<QuestionDetailsResponse>();
  const { currentElderlyUid } = useContext(CaretakerContext);

  useAsyncEffect(async () => {
    if (currentElderlyUid === undefined) return;
    const result = await getQuestionDetails(currentElderlyUid, data.mid);
    setQuestion(result);
  }, [data]);

  return (
    <SafeAreaView>
      <ScrollView>
        {question?.isMCQ ? (
          <>
            {question && (
              <EditMultipleChoiceForm question={question} mid={data.mid} />
            )}
          </>
        ) : (
          <>
            {question && (
              <EditShortAnswerForm question={question} mid={data.mid} />
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditMemoryRecallQuestionsScreen;
