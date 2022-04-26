export interface MemoryRecallQuestionDto {
  questions: MemoryRecallQuestion[];
}
export interface MemoryRecallQuestion {
  mid: string;
  question: string;
  imageid: string;
  multipleChoiceQuestion: {
    choice1: string;
    choice2: string;
    choice3: string;
    choice4: string;
    correctAnswer: string;
  };
  isMultipleChoice: boolean;
}

export interface Answer {
  mid: string;
  answer: string;
}
