import { Icon, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../internationalization/i18n.config';
import TextInput from '../atoms/TextInput';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { StyleSheet } from 'react-native';
import { Fields } from '../../screens/CustomHealthRecordingScreen';

type DataFieldInputProps = {
    id: number
    hasX?: boolean
    onChange: (val: any) => void;
    defaultValue?: Fields;
};

const DataFieldInput = ({id, hasX, onChange, defaultValue}: DataFieldInputProps) => {
    const inputSchema = Yup.object({
        title: Yup.string().required(i18n.t('healthRecording.titleBlankError')),
        fieldName: Yup.string().required(i18n.t('healthRecording.fieldBlankError')),
        unit: Yup.string().required('')
      });

      const [unitEditing, setUnitEditing] = useState(false);
      const [fieldNameEditing, setFieldNameEditing] = useState(false)
    
      const { t } = useTranslation();
    
      const {
        control,
        formState: { errors },
        watch,
        reset
      } = useForm({
        resolver: useYupValidationResolver(inputSchema),
        mode: 'onTouched'
      });

      const watchForms = watch()

  return (
    <View mt={2} flexDir="row">
    <View width="48">
      <Text fontSize={16} color="#52525B">
        {t('healthRecording.fieldName')} {id}
      </Text>
      <TextInput
        placeholder={t('healthRecording.fieldName')}
        name="fieldName"
        // defaultValue={defaultValue? defaultValue["fieldName"] : undefined}
        control={control}
        errors={errors}
        value={defaultValue? defaultValue["fieldName"]? defaultValue["fieldName"]: undefined : undefined}
        onEndEditing={() => {
          onChange({fieldName: watchForms['fieldName'], unit: watchForms['unit']})
          // setFieldNameEditing(false)
        }}
        // onFocus={() => setFieldNameEditing(true)}
      />
    </View>
    <View ml={4} style={styles.unitInput}>
      <Text fontSize={16} color="#52525B">
        {t('healthRecording.unit')}
      </Text>
      <TextInput
        placeholder={t('healthRecording.unit')}
        name="unit"
        control={control}
        errors={errors}
        value={defaultValue? defaultValue["unit"]? defaultValue["unit"]: undefined : undefined}
        onEndEditing={() => {
          onChange({fieldName: watchForms['fieldName'], unit: watchForms['unit']})
          // setUnitEditing(false)
        }}
        // onFocus={() => setUnitEditing(true)}  
        />
    </View>
  </View>

  );
};

export default DataFieldInput;

const styles = StyleSheet.create({
  unitInput: {
    width: 115
  },
});