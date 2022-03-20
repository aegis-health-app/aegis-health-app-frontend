import React from 'react';
import { ScrollView, View } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';

const EditCaretakerScreen = () => {
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View bgColor="#FAFAFA">
          <ProfileInfoCard />
          <Divider />
          <View paddingX={5}>
            <InputBox name="เปลี่ยนชื่อผู้ใช้" />
          </View>
          <Divider />
          <RemButton />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default EditCaretakerScreen;
