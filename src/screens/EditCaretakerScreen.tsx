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
          <ProfileInfoCard fname={info["fname"]} lname={info["lname"]} gender="Female" bdate="08/02/1917" phone="090909090"/>
          <Divider />
          <View paddingX={5}>
            <InputBox name={t('userForm.editName')} />
          </View>
          <Divider />
          <RemButton fname={info["fname"]} lname={info["lname"]} cid={info["cid"]}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default EditCaretakerScreen;
