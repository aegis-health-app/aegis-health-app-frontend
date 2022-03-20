import React from 'react';
import { ScrollView, View } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';

const EditCaretakerScreen = () => {
  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View bgColor="#FAFAFA">
          <ProfileInfoCard name="Somying Muangyim" gender="Female" bdate="08/02/1917" phone="090909090"/>
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
