import { View } from 'native-base';
import Divider from '../components/atoms/Divider';
import React from 'react';
import ProfileSection from './../components/organisms/ProfileSection';

const HomeScreen = () => {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="flex-start"
      paddingTop={6}
      paddingX={2}>
      <ProfileSection />
      <Divider />
    </View>
  );
};

export default HomeScreen;
