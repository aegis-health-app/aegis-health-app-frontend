import React from 'react';
import { View } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditCaretakerScreen = () => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View>
        <View bgColor="#FAFAFA">
          <ProfileInfoCard />
          <Divider />
          <InputBox name="เปลี่ยนชื่อผู้ใช้" />
          <Divider />
          <RemButton />
        </View>
      </View>
    </SafeAreaView>
  );
};
export default EditCaretakerScreen;
