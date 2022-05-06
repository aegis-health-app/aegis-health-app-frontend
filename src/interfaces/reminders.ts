export interface Reminder {
  rid: number;
  title: string;
  note: string;
  isRemindCaretaker: boolean;
  importanceLevel: string;
  imageid: string | null;
  hour: number;
  minute: number;
  isRecurring?: boolean;
}

export interface Reminders {
  date: string;
  reminder: Reminder[];
}

export interface UnfinishedReminders {
  overdue: Reminders[];
  future: Reminders[];
}
