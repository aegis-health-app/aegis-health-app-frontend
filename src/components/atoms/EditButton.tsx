import { View, Text, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

type EditButtonProps = {
  w?: string;
  h?: string;
  p?: number;
  ml?: number;
  onPress?: () => void;
};

const EditButton = ({ w, h, p, ml, onPress }: EditButtonProps) => {
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      <View
        bgColor="gray.200"
        flexDir="row"
        alignItems="center"
        w={w ?? '16'}
        h={h ?? '8'}
        p={p ?? 1}
        ml={ml ?? 2}
        borderRadius={4}>
        <Icon as={MaterialIcons} name="edit" size="5" color="gray.500" mx={1} />
        <Text>{t('25')}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default EditButton;
