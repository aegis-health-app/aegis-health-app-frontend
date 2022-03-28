import { Icon, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../internationalization/i18n.config';
import TextInput from '../atoms/TextInput';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type DataFieldInputProps = {
    hasX?: boolean
};

const DataFieldInput = ({hasX}: DataFieldInputProps) => {
    const inputSchema = Yup.object({
        title: Yup.string().required(i18n.t('healthRecording.titleBlankError')),
        fieldName: Yup.string().required(i18n.t('healthRecording.fieldBlankError')),
        unit: Yup.string().required('')
      });
    
      const { t } = useTranslation();
    
      const {
        control,
        formState: { errors },
        watch
      } = useForm({
        resolver: useYupValidationResolver(inputSchema),
        mode: 'onTouched'
      });
  return (
    <View mt={2} flexDir="row">
    <View width="50%">
      <Text fontSize={16} color="#52525B">
        {t('healthRecording.fieldName')}
      </Text>
      <TextInput
        placeholder={t('healthRecording.fieldName')}
        name="fieldName"
        control={control}
        errors={errors}
      />
    </View>
    <View ml={4} width="35%">
      <Text fontSize={16} color="#52525B">
        {t('healthRecording.unit')}
      </Text>
      <TextInput
        placeholder={t('healthRecording.unit')}
        name="unit"
        control={control}
        errors={errors}
      />
    </View>
    {hasX? <Icon mt={12} ml={3} as={MaterialIcons} name="close" size="6" color="muted.600" onPress={() => console.log('todo: delete')}/>: null}
  </View>

  );
};

export default DataFieldInput;