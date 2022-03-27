import React from 'react';
import { View, Text, ScrollView } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const EditCaretakerScreen = ({route}:NativeStackScreenProps<RootStackParamList, 'EditCaretakerScreen'>) => {

  // WIP
  const {info} = route.params;

  const { t } = useTranslation();
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View bgColor="#FAFAFA">
          <ProfileInfoCard fullName={info["fullName"]} gender={info["gender"]} bdate={info["bdate"]} phone={info["phone"]} imageId={info["imageId"]}/>
          <Divider />
          <View paddingX={5}>
            <InputBox name={t('userForm.editName')} />
          </View>
          <Divider />
          <RemButton fullName={info["fullName"]} cid={info["cid"]}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default EditCaretakerScreen;
