import React from 'react';
import { Box, Button } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

const AddButton = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <Box alignItems="center" margin="4">
      <Button
        colorScheme="info"
        width="95%"
        size="md"
        variant="outline"
        onPress={() => navigation.navigate('ConnectCaretakerScreen')}>
        เพิ่มผู้ดูแล
      </Button>
    </Box>
  );
};

export default AddButton;
