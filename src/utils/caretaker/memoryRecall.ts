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

export async function getQuestionDetails(eid: number, mid: number) {
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

export async function changeSelectedStatus(
  mid: string,
  eid: number,
  isSelected: string
) {
  await client.put(`memoryPractice/editSelection/${isSelected}`, {
    elderlyuid: eid,
    mid: mid
  });
}

export async function sendEditedQuestion(
  question: QuestionDetails,
  eid: number,
  mid: string
) {
  await client.put('memoryPractice/editQuestion', {
    ...question,
    elderlyuid: eid,
    mid: mid
  });
}
