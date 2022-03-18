import React from 'react';
import { View } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';

const EditCaretakerScreen = () => {
  return (
    <View>
      <View bgColor="#FAFAFA">
        <ProfileInfoCard />
        <Divider />
        <InputBox name="เปลี่ยนชื่อผู้ใช้" />
        <Divider />
        <RemButton />
      </View>
    </View>
  );
};
export default EditCaretakerScreen;
