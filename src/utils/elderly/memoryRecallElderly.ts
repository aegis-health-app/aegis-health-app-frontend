import { client } from './../../config/axiosConfig';
import i18n from '../../internationalization/i18n.config';
import { MemoryRecallQuestionDto } from '../../dto/modules/memoryRecallElderly.dto';

export async function getMemoryRecallQuestionSet(): Promise<MemoryRecallQuestionDto> {
  const { data } = await client.get('/memoryPractice/questionSet');
  return data as MemoryRecallQuestionDto;
}
