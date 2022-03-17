import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, FlatList } from 'native-base';
import UserManageCard from './../components/organisms/UserManageCard';
import { RootStackParamList } from './../navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const UserLinkScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const userList = [
    {
      image: require('../assets/images/somying.png'),
      name: 'Somying Muangyim1'
    },
    {
      image: require('../assets/images/somying.png'),
      name: 'Somying Muangyim2asdfasdfasdfasdfadsfasdfdasf'
    },
    {
      image: require('../assets/images/somying.png'),
      name: 'Somying Muangyim3'
    }
  ];

  return (
    <View>
      <FlatList
        data={userList}
        renderItem={({ item }) => (
          <UserManageCard name={item.name} image={item.image} />
        )}
        keyExtractor={(_, key) => key.toString()}
      />
      <Button
        variant="outline"
        colorScheme="primary"
        mx={4}
        mt={4}
        onPress={() => navigation.navigate('ConnectScreen')}>
        Add Caretakers
      </Button>
    </View>
  );
};

export default UserLinkScreen;

const styles = StyleSheet.create({});
