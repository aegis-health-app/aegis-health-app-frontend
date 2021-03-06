export interface EmotionTrackingState {
  isEnabled: boolean;
}

export type Emotion = 'NA' | 'HAPPY' | 'NEUTRAL' | 'BAD';
export interface EmotionHistory {
  date: Date;
  emotionalLevel: Emotion;
}

export interface EmotionHistoryResponse {
  count: number;
  records: EmotionHistory[];
}
