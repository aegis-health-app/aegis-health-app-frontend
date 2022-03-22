import React from 'react';
import { View, Text, ScrollView } from 'native-base';
import RemButton from '../components/atoms/RemButton';
import Divider from '../components/atoms/Divider';
import InputBox from '../components/atoms/Input';
import ProfileInfoCard from '../components/organisms/ProfileInfoCard';
import KeyboardAvoidingView from '../components/atoms/KeyboardAvoidingView';
import { useTranslation } from 'react-i18next';

const EditCaretakerScreen = ({route, navigation}) => {

  // WIP
  const {itemId} = route.params;

  const { t } = useTranslation();
  return (
    <ScrollView>
        <View bgColor="#FAFAFA">
          <ProfileInfoCard name={itemId} gender="Female" bdate="08/02/1917" phone="090909090"/>
          <Divider />
          <View paddingX={5}>
            <InputBox name={t('userForm.editName')} />
          </View>
          <Divider />
          <RemButton name={itemId}/>
        </View>
    </ScrollView>
  );
};
export default EditCaretakerScreen;
