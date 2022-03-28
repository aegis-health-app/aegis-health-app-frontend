import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DisplayName {
  uid: number;
  newDisplayName: string;
}

export interface DisplayNameList {
  DisplayList: DisplayName[];
}

export const storeDisplayName = async (key: number, value: string) => {
  try {
    await AsyncStorage.setItem(`${key}`, value);
  } catch (e) {
    console.log(e);
  }
};

export const getDisplayName = async (key: number): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(`${key}`);
    if (value !== null) {
      return value as string;
    }
  } catch (e) {
    console.log(e);
  }
  return '';
};

export const removeDisplayName = async (key: number) => {
  try {
    await AsyncStorage.removeItem(`${key}`);
  } catch (e) {
    console.log(e);
  }

  console.log('Done.');
};

export const getAllKeys = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    return keys
  } catch (e) {
    console.log(e)
  }
}