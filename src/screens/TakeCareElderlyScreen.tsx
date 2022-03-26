import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, View } from 'native-base';
import { RootStackParamList } from '../navigation/types';
import { Elderly } from './../dto/modules/user.dto';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getCaretakingElderlyByEid } from '../utils/caretaker/profile';

const TakeCareElderlyScreen = ({
  route,
  navigation
}: NativeStackScreenProps<RootStackParamList, 'TakeCareElderlyScreen'>) => {
  const { uid } = route.params;
  const [elderly, setElderly] = useState<Elderly>();

  useAsyncEffect(async () => {
    const _elderly = await getCaretakingElderlyByEid(uid);
    setElderly(_elderly);
  }, [uid]);

  return (
    <View>
      <Text>{JSON.stringify(elderly)}</Text>
    </View>
  );
};

export default TakeCareElderlyScreen;
