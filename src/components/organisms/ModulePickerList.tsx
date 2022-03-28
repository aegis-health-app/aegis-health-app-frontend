import React, { useContext } from 'react';
import { Text, View, FlatList } from 'native-base';
import { useTranslation } from 'react-i18next';
import { ElderlyContext } from '../../contexts/ElderlyContext';
import ModulePickerItem from '../molecules/ModulePickerItem';
import { ModuleId } from '../../dto/modules/modules.dto';

type ModulePickerListProps = {
  data?: ModuleId[];
};

const ModulePickerList = ({ data }: ModulePickerListProps) => {
  const { t } = useTranslation();
  const { elderlyProfile } = useContext(ElderlyContext);

  return (
    <View flex={1} mt={2} minH="80">
      <Text fontSize="2xl" fontWeight="600">
        {t('modules.modules')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('modules.chooseModule')}
      </Text>
      <View>
        <FlatList
          data={data ? data : elderlyProfile?.listModuleid}
          renderItem={({ item }) => <ModulePickerItem mid={item} />}
          keyExtractor={(_, key) => key.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default ModulePickerList;
