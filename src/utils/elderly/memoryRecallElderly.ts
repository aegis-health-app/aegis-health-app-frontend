import { client } from './../../config/axiosConfig';
import i18n from '../../internationalization/i18n.config';
import { MemoryRecallQuestionDto } from '../../dto/modules/memoryRecallElderly.dto';

export async function getMemoryRecallQuestionSet(): Promise<MemoryRecallQuestionDto> {
  const { data } = await client.get('/memoryPractice/questionSet');
  return data as MemoryRecallQuestionDto;
}
/**
 * This function return the color for checking the choices.
 * @param choice the value of the choice
 * @param answer the value that user selected
 * @param correctAnswer the correct answer from backend
 * @returns the color of each choice.
 */
export const getBackGroundColor = (
  choice: string,
  answer: string,
  correctAnswer: string
) => {
  if (choice === correctAnswer) {
    return '#D1FAE5';
  } else if (choice === answer) {
    return '#FFE4E6';
  } else {
    return 'null';
  }
};
