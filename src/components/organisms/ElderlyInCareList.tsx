import { FlatList, Text, View } from 'native-base';
import React, { useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { ElderlyInCare } from './../../dto/modules/caretaking.dto';
import ElderlyCard from './ElderlyCard';
import useDimensions from '../../hooks/useDimensions';

const ElderlyInCareList = () => {
  const { t } = useTranslation();
  const { caretakerHomeProfile } = useContext(CaretakerContext);
  const [elderies, setElderies] = useState<ElderlyInCare[]>([]);
  const { ScreenWidth } = useDimensions();

  useEffect(() => {
    if (caretakerHomeProfile?.listElderly) {
      setElderies(caretakerHomeProfile?.listElderly);
    }
  }, [caretakerHomeProfile]);

  return (
    <View flex={1} w={ScreenWidth - 32} mt={4} minH="80">
      <Text fontSize="2xl" fontWeight="600">
        {t('home.myElderly')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('home.viewElderly')}
      </Text>

      {elderies.length > 0 ? (
        <FlatList
          data={elderies}
          scrollEnabled={false}
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
    </View>
  );
};

export default ElderlyInCareList;
