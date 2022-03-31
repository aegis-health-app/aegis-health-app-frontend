export interface EmotionalHistory {
  date: Date;
  emotion: Emotion;
}

export type Emotion = 'N/A' | 'HAPPY' | 'NEUTRAL' | 'BAD';
