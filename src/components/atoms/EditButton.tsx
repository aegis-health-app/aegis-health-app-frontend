import { Text, Icon, Button } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

type EditButtonProps = {
  w?: string;
  h?: string;
  p?: number;
  alignText?: string;
  onPress: () => void;
};

const EditButton = ({ w, h, p, alignText, onPress }: EditButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      borderRadius="lg"
      bgColor="gray.300"
      width={w ?? 'auto'}
      height={h ?? 'auto'}
      flexDir="row"
      padding={p ?? '2'}
      onPress={() => {
        if (onPress) onPress();
      }}
      leftIcon={
        <Icon as={MaterialIcons} name="mode-edit" size="5" color="muted.600" />
      }
      _pressed={{
        bg: 'gray.400'
      }}>
      <Text bottom={alignText}>{t('userLink.edit')}</Text>
    </Button>
  );
};

export default EditButton;
