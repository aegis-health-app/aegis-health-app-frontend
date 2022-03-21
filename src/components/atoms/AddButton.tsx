/* eslint-disable prettier/prettier */
import React from 'react';
import { Box, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';

const AddButton = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Box alignItems="center" margin="2.5">
      <Button
        width="95%"
        size="md"
        borderWidth="1"
        borderColor="#1D84DF"
        backgroundColor="#FAFAFA"
        _text={{ color: '#1D84DF' }}
        _pressed={{
          borderColor: '#7CC2FF',
          _text: { color: '#7CC2FF' }
        }}
        onPress={() => navigation.navigate('ConnectCaretakerScreen')}>
        {t('100')}
      </Button>
    </Box>
  );
};

export default AddButton;
