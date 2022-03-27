import React, { useContext } from 'react';
import { View, ScrollView, Button, FlatList } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import Card from '../components/organisms/UserCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import UserCard from './../components/organisms/UserCard';
import { ElderlyContext } from '../contexts/ElderlyContext';

const UserLinkScreen = () => {
  // todo: connect with backend's data
  const {caretakerList, setCaretakerList} = useContext(ElderlyContext);
  console.log(caretakerList);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView>
      <View bgColor="#FAFAFA">
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
              />
            </View>
          )}
          keyExtractor={(_, key) => key.toString()}
        />
        <AddButton />

        {/* Placeholder Navigation */}
        <View flexDir="row" justifyContent="center">
          <Button
            width="90%"
            onPress={() => navigation.navigate('ConnectElderlyScreen')}>
            Go to Caretaker's Page
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default UserLinkScreen;