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
    <Box alignItems="center" margin="4">
      <Button
        colorScheme="primary"
        width="95%"
        size="md"
        variant="outline"
        onPress={() => navigation.navigate('ConnectCaretakerScreen')}>
        {t('100')}
      </Button>
    </Box>
  );
};

export default AddButton;
