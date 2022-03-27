import { Button, FlatList, Text, View } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { ElderlyInCare } from './../../dto/modules/caretaking.dto';
import ElderlyCard from './ElderlyCard';

const ElderlyInCareList = () => {
  const { t } = useTranslation();
  const { caretakerHomeProfile } = useContext(CaretakerContext);
  const [elderies, setElderies] = useState<ElderlyInCare[]>([]);

  useEffect(() => {
    if (caretakerHomeProfile?.listElderly) {
      setElderies(caretakerHomeProfile?.listElderly);
    }
  }, [caretakerHomeProfile]);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View flex={1} minW="full" mt={4} minH="96">
      <Text fontSize="2xl" fontWeight="600">
        {t('home.myElderly')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('home.viewElderly')}
      </Text>

      {elderies.length > 0 ? (
        <FlatList
          data={elderies}
          renderItem={({ item }) => (
            <View alignItems="center">
              <ElderlyCard
                name={item.dname}
                imageId={item.imageid}
                uid={item.uid}
                userIsElderly={true}
              />
            </View>
          )}
          keyExtractor={(_, key) => key.toString()}
        />
      ) : (
        <View alignItems="center" justifyContent="center" my={10} h="40">
          <Text fontSize="lg" color="gray.500">
            {t('home.noElderlyInCare')}
          </Text>
        </View>
      )}

      <Button
        variant="outline"
        colorScheme="primary"
        my={4}
        onPress={() => navigation.navigate('ConnectElderlyScreen')}>
        {t('home.addElderlyButton')}
      </Button>
    </View>
  );
};

export default ElderlyInCareList;
