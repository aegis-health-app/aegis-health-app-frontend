export interface EmotionalHistory {
  date: Date;
  emotion: Emotion;
}

export type Emotion = 'NA' | 'HAPPY' | 'NEUTRAL' | 'BAD';
