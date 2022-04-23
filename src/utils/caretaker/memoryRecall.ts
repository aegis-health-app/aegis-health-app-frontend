import { client } from '../../config/axiosConfig';
import {
  QuestionInfo,
  QuestionDetails
} from './../../dto/modules/memoryRecall';

export async function getAllQuestions(eid: number): Promise<QuestionInfo[]> {
  const { data } = await client.post('/memoryPractice/allQuestions', {
    elderlyuid: eid
  });

  return data?.questions as QuestionInfo[];
}

export async function getQuestionDetails(eid: number, mid: string) {
  const { data } = await client.post('/memoryPractice/selectedQuestion', {
    elderlyuid: eid,
    mid: mid
  });

  return data as QuestionDetails;
}

export async function sendCreatedQuestion(
  question: QuestionDetails,
  eid: number
) {
  await client.post('memoryPractice/createQuestion', {
    ...question,
    elderlyuid: eid
  });
}
