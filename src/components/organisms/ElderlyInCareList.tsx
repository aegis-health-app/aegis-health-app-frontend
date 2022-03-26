import { Button, FlatList, Text, View } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import UserCard from './UserCard';
import { ElderlyInCare } from './../../dto/modules/caretaking.dto';

const ElderlyInCareList = () => {
  const { t } = useTranslation();
  const { caretakerHomeProfile } = useContext(CaretakerContext);
  const [elderies, setElderies] = useState<ElderlyInCare[]>([]);

  useEffect(() => {
    setElderies([
      {
        dname: 'Rick',
        imageid: 'https://www.beartai.com/wp-content/uploads/2021/08/23.png',
        uid: 1
      },
      {
        dname: 'Ashley',
        imageid: 'https://www.beartai.com/wp-content/uploads/2021/08/23.png',
        uid: 2
      }
    ]);
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
          data={elderies}
          renderItem={({ item }) => (
            <UserCard
              name={item.dname}
              imageId={item.imageid}
              uid={item.uid}
              userIsElderly={true}
            />
          )}
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
        w="90%"
        my={4}
        alignSelf="center"
        onPress={() => navigation.navigate('ConnectElderlyScreen')}>
        {t('home.addElderlyButton')}
      </Button>
    </View>
  );
};

export default ElderlyInCareList;
