import { client } from '../../config/axiosConfig';
import { HistoryDetailsCard } from '../../screens/ViewHistoryDetailsScreen';
import { QuestionCard } from '../../screens/ViewQuestionPoolScreen';

export async function getQuestions(eid: number): Promise<QuestionCard[]> {
  try {
    const { data } = await client.post(`/memoryPractice/allQuestions`, { elderlyuid: eid });
    return data;
  } catch (err) {
    throw Error('Cannot retrieve questions');
  }
}
