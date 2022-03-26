import React, { useState } from 'react';
import { View, ScrollView, Button, FlatList } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import Card from '../components/organisms/UserCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import UserCard from './../components/organisms/UserCard';

const UserLinkScreen = () => {
  // todo: connect with backend's data
  const [caretakerNumber, setCaretakerNumber] = useState([
    {
      dname: 'Supatach Vanichayangkuranont',
      imageid: 'https://www.beartai.com/wp-content/uploads/2021/08/23.png'
    },
    {
      dname: 'Somying Muangyim',
      imageid: 'https://www.beartai.com/wp-content/uploads/2021/08/23.png'
    },
    {
      dname: 'Somying Muangyim',
      imageid: 'https://www.beartai.com/wp-content/uploads/2021/08/23.png'
    }
  ]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <ScrollView>
      <View bgColor="#FAFAFA">
        <FlatList
          data={caretakerNumber}
          renderItem={({ item }) => (
            <View alignItems="center">
              <UserCard
                name={item.dname}
                imageId={item.imageid}
                userIsElderly={false}
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
