import React from 'react';
import { View, ScrollView } from 'native-base';
import AddButton from '../components/atoms/AddButton';
import Card from '../components/organisms/CaretakerCard';

const UserLinkScreen = () => {
  return (
    <ScrollView>
      <View bgColor="#FAFAFA">
        <Card name="Supatach Vanichayangkuranont" />
        <Card name="Somying Muangyim" />
        <Card name="Somying Muangyim" />
        <AddButton />
      </View>
    </ScrollView>
  );
};
export default UserLinkScreen;
