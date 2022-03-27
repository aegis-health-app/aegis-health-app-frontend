import { View, Fab, Icon, ScrollView, Divider } from 'native-base';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ElderlyInCareList from '../components/organisms/ElderlyInCareList';
import ProfileSection from './../components/organisms/ProfileSection';
import UpComingAlert from './../components/organisms/UpComingAlert';

const CaretakerHomeScreen = () => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <Fab
        placement="bottom-right"
        renderInPortal={false}
        size="sm"
        bgColor="#000"
        icon={<Icon as={AntDesign} name="question" size="6" color="#fff" />}
      />

      <ScrollView nestedScrollEnabled>
        <View
          flex={1}
          alignItems="center"
          justifyContent="flex-start"
          paddingTop={6}
          paddingX={4}>
          <ProfileSection />
          <Divider />
          <UpComingAlert />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
            width="100%">
            <ElderlyInCareList />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CaretakerHomeScreen;
