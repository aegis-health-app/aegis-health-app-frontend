import { ScrollView, View } from 'native-base';
import Divider from '../components/atoms/Divider';
import React from 'react';
import ProfileSection from './../components/organisms/ProfileSection';
import UpComingAlert from './../components/organisms/UpComingAlert';
import ModulePickerList from './../components/organisms/ModulePickerList';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <ScrollView>
        <View
          flex={1}
          alignItems="center"
          justifyContent="flex-start"
          paddingTop={6}
          paddingX={4}>
          <ProfileSection />
          <Divider />
          <UpComingAlert />
          <ModulePickerList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
