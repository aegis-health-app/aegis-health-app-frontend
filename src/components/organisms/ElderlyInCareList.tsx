import { Button, FlatList, Text, View } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import ElderlyInCareItem from '../molecules/ElderlyInCareItem';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ElderlyHomeProfile } from '../../dto/modules/modules.dto';

const ElderlyInCareList = () => {
  const { t } = useTranslation();
  const { caretakerHomeProfile } = useContext(CaretakerContext);
  const [elderies, setElderies] = useState<ElderlyHomeProfile[]>([]);

  useEffect(() => {
    if (caretakerHomeProfile?.listElderly) {
      setElderies(caretakerHomeProfile.listElderly);
    }
  }, [caretakerHomeProfile]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View flex={1} mt={4} minWidth="96" minH="96">
      <Text fontSize="2xl" fontWeight="600">
        {t('home.myElderly')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('home.viewElderly')}
      </Text>

      {elderies.length > 0 ? (
        <FlatList
          data={caretakerHomeProfile?.listElderly}
          renderItem={({ item }) => <ElderlyInCareItem elderly={item} />}
          keyExtractor={(_, key) => key.toString()}
        />
      ) : (
        <View
          alignItems="center"
          justifyContent="center"
          my={10}
          w="full"
          h="40">
          <Text fontSize="lg" color="gray.500">
            {t('home.noElderlyInCare')}
          </Text>
        </View>
      )}

      <Button
        variant="outline"
        colorScheme="primary"
        size="lg"
        w="full"
        my={4}
        onPress={() => navigation.navigate('ConnectCaretakerScreen')}>
        {t('home.addElderlyButton')}
      </Button>
    </View>
  );
};

export default ElderlyInCareList;
