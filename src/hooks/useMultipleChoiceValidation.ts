import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useMultipleChoiceValidation = () => {
  const { t } = useTranslation();

  const MultipleChoiceValidationSchema = Yup.object({
    question: Yup.string().required(t('createMemoryRecall.questionRequired')),
    isMCQ: Yup.boolean().required(),
    choice1: Yup.string().required(t('createMemoryRecall.choice1Required')),
    choice2: Yup.string().required(t('createMemoryRecall.choice2Required')),
    choice3: Yup.string().required(t('createMemoryRecall.choice3Required')),
    choice4: Yup.string().required(t('createMemoryRecall.choice4Required')),
    correctAnswer: Yup.string().required(t('createMemoryRecall.answerRequired'))
  });
  return MultipleChoiceValidationSchema;
};
