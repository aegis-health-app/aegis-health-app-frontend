import React from 'react';
import { View, ScrollView, Button } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import Card from '../components/organisms/CaretakerCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';


const UserLinkScreen = () => {

  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <View bgColor="#FAFAFA">
        <Card name="Supatach Vanichayangkuranont" />
        <Card name="Somying Muangyim" />
        <Card name="Somying Muangyim" />
        <AddButton />

        {/* Placeholder Navigation */}
        <View flexDir="row" justifyContent="center">
        <Button width="90%" onPress={() => navigation.navigate('ConnectElderlyScreen')}>Go to Caretaker's Page</Button>
        </View>
      </View>
    </ScrollView>
  );
};
export default UserLinkScreen;
