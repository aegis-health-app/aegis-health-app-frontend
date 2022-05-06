import { client } from '../config/axiosConfig';

export const fetchUnfinishedRemindersElderly = async (currentDate) => {
  try {
    const payload = {
      currentDate: currentDate
    };
    const res = await client.post(
      '/reminder/unfinishedReminder/elderly',
      payload
    );
    return res;
  } catch (e: any) {
    return { ...e };
  }
};

export const fetchUnfinishedRemindersCaretaker = async (eid, currentDate) => {
  try {
    const payload = {
      currentDate: currentDate
    };
    const res = await client.post(
      `/reminder/unfinishedReminder/caretaker/${eid}`,
      payload
    );
    return res;
  } catch (e: any) {
    return { ...e };
  }
};

export const fetchFinishedRemindersElderly = async (currentDate) => {
  try {
    const payload = {
      currentDate: currentDate
    };
    const res = await client.post(
      '/reminder/finishedReminder/elderly',
      payload
    );
    return res;
  } catch (e: any) {
    return { ...e };
  }
};

export const fetchFinishedRemindersCaretaker = async (eid, currentDate) => {
  try {
    const payload = {
      currentDate: currentDate
    };
    const res = await client.post(
      `/reminder/finishedReminder/caretaker/${eid}`,
      payload
    );
    return res;
  } catch (e: any) {
    return { ...e };
  }
};

export const markAsCompletedElderly = async (rid, currentDate) => {
  try {
    const payload = {
      rid: rid,
      currentDate: currentDate
    };
    await client.put('/reminder/markAsComplete/elderly', payload);
  } catch (e: any) {
    return { ...e };
  }
};

export const markAsNotCompleteElderly = async (rid) => {
  try {
    const payload = {
      rid: rid
    };
    await client.put('/reminder/markAsNotComplete/elderly', payload);
  } catch (e: any) {
    return { ...e };
  }
};

export const deleteReminderElderly = async (rid) => {
  try {
    const data = {
      rid: rid
    };
    await client.delete('/reminder/elderly', {
      data
    });
  } catch (e: any) {
    return { ...e };
  }
};

export const deleteReminderCaretaker = async (eid, rid) => {
  try {
    const data = {
      rid: rid
    };
    await client.delete(`/reminder/caretaker/${eid}`, {
      data
    });
  } catch (e: any) {
    return { ...e };
  }
};
