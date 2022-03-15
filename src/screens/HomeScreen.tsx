import { View } from 'native-base';
import Divider from '../components/atoms/Divider';
import React from 'react';
import ProfileSection from './../components/organisms/ProfileSection';
import UpComingAlert from './../components/organisms/UpComingAlert';

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
      <UpComingAlert />
    </View>
  );
};

export default HomeScreen;
