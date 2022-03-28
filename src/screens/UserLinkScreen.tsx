import React, { useContext } from 'react';
import { View, Button, FlatList } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import UserCard from '../components/organisms/CaretakerCard';
import { ElderlyContext } from '../contexts/ElderlyContext';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { getCaretakerList } from '../utils/elderly/caretakerList';

const UserLinkScreen = () => {
  const isFocused = useIsFocused();

  const { caretakerList, setCaretakerList } = useContext(ElderlyContext);

  useAsyncEffect(async () => {
    setCaretakerList(await getCaretakerList());
  }, [isFocused]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View bgColor="#FAFAFA" flex={1}>
      <FlatList
        data={caretakerList}
        renderItem={({ item }) => (
          <View alignItems="center">
            <UserCard
              name={item.dname}
              fullName={`${item.fname} ${item.lname}`}
              imageId={item.imageid}
              userIsElderly={false}
              gender={item.gender}
              bdate={item.bday}
              phone={item.phone}
              uid={item.uid}
            />
          </View>
        )}
        keyExtractor={(_, key) => key.toString()}
      />
      <AddButton />

      {/* Placeholder Navigation */}
      <View flexDir="column" justifyContent="center" alignItems="center">
        <Button
          width="90%"
          onPress={() => navigation.navigate('ConnectElderlyScreen')}>
          Go to Caretaker's Page
        </Button>
        <Button
          width="90%"
          onPress={() => navigation.navigate('CustomHealthRecordingScreen')}>
          Go to Custom Health Recording's Screen
        </Button>
      </View>
    </View>
  );
};
export default UserLinkScreen;
