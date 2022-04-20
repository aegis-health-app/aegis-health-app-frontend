import * as Yup from 'yup';
import i18n from '../../internationalization/i18n.config';

export type MultipleChoiceAnswer = '1' | '2' | '3' | '4' | undefined;

export interface QuestionDetails {
  question: string;
  imageid: string | undefined;
  isMCQ: boolean;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  correctAnswer?: MultipleChoiceAnswer;
}

export const ShortAnswerValidationSchema = Yup.object({
  question: Yup.string().required(i18n.t('createMemoryRecall.questionRequired'))
});

export const MultipleChoiceValidationSchema = Yup.object({
  question: Yup.string().required(
    i18n.t('createMemoryRecall.questionRequired')
  ),
  isMCQ: Yup.boolean().required(),
  choice1: Yup.string().required(i18n.t('createMemoryRecall.choice1Required')),
  choice2: Yup.string().required(i18n.t('createMemoryRecall.choice2Required')),
  choice3: Yup.string().required(i18n.t('createMemoryRecall.choice3Required')),
  choice4: Yup.string().required(i18n.t('createMemoryRecall.choice4Required')),
  correctAnswer: Yup.string().required(
    i18n.t('createMemoryRecall.answerRequired')
  )
});
