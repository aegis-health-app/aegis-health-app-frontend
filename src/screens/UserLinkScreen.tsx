import React, { useState } from 'react';
import { View, ScrollView, Button } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import Card from '../components/organisms/CaretakerCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';


const UserLinkScreen = () => {

  // todo: connect with backend's data
  const [caretakerNumber, setCaretakerNumber] = useState([
    {name: "Supatach Vanichayangkuranont"}, 
    {name: "Somying Muangyim"}, 
    {name: "Somying Muangyim"}
  ]);
  const navigation =
  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <View bgColor="#FAFAFA">
        {Array.from(Array(caretakerNumber.length)).map((x, index) => <Card key={index} name={caretakerNumber[index].name}/>)}
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
