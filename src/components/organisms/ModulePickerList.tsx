import React, { useContext } from 'react';
import { Text, View, Button, HStack, FlatList } from 'native-base';
<<<<<<< HEAD
=======
import ModulePickerCard from './../molecules/ModulePickerCard';
>>>>>>> 458cbb8 (wip: dynamic module list)
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { ElderlyContext } from '../../contexts/ElderlyContext';
import ModulePickerItem from '../molecules/ModulePickerItem';

const ModulePickerList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
<<<<<<< HEAD
  const { elderlyProfile } = useContext(ElderlyContext);
=======
  const { moduleList } = useContext(ElderlyContext);
>>>>>>> 458cbb8 (wip: dynamic module list)

  return (
    <View flex={1} mt={2}>
      <Text fontSize="2xl" fontWeight="600">
        {t('modules.modules')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('modules.chooseModules')}
      </Text>
      <FlatList
        data={elderlyProfile?.listModuleid}
        renderItem={({ item }) => <ModulePickerItem mid={item} />}
        keyExtractor={(_, key) => key.toString()}
        numColumns={2}
        scrollEnabled={false}
      />
      <HStack justifyContent="center" w="full">
        <Button onPress={() => navigation.navigate('SignInScreen')}>
          Dummy Sign In Page
        </Button>
        <Button onPress={() => navigation.navigate('SignUpScreen')}>
          Dummy Sign Up Page
        </Button>
      </HStack>
    </View>
  );
};

export default ModulePickerList;
