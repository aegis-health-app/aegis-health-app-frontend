import { View, Text, Button } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import TextInput from '../../components/atoms/TextInput';
import { useForm, useFormState } from 'react-hook-form';
import * as Yup from 'yup';
import { useYupValidationResolver } from '../../hooks/useYupValidationResolver';
import { client } from '../../config/axiosConfig';

const InputCodeScreen = () => {
  const { t } = useTranslation();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const codeSchema = Yup.object({
    elderlyCode: Yup.string().min(6, '')
  });

  const {
    control,
    formState: { errors },
    watch
  } = useForm({ resolver: useYupValidationResolver(codeSchema), mode: 'all' });

  // todo: get codes from backend
  const [codes, setCodes] = useState(['000000', 'AAAAAA']);
  const [isCodeValid, setIsCodeValid] = useState(true);
  const watchElderlyCode = watch();

  const { isValid } = useFormState({ control });

  const handleSubmit = async () => {
    const enteredCode = watchElderlyCode["elderlyCode"]
    await client
      .get(`/link/elderly/${enteredCode}`)
      .then(({ data }) => {
        console.log(data);
        navigation.navigate('ConfirmConnectScreen', { info: data });
        setIsCodeValid(true)
      })
      .catch((err) => {
        console.log({ err });
        setIsCodeValid(false)
      });
  };

  return (
    <View my="2">
      {/* TODO: add tab */}
      <Button.Group isAttached justifyContent="center" mb="4">
        <Button
          borderWidth="1"
          borderColor="#1D84DF"
          backgroundColor="#FAFAFA"
          _text={{ color: '#1D84DF' }}
          _pressed={{
            borderColor: '#7CC2FF',
            _text: { color: '#7CC2FF' }
          }}
          borderRadius="0"
          width="45%"
          onPress={() => navigation.navigate('ConnectElderlyScreen')}>
          {t('userLink.scanQR')}
        </Button>
        <Button
          borderRadius="0"
          width="45%"
          onPress={() => navigation.navigate('InputCodeScreen')}>
          {t('userLink.enterCode')}
        </Button>
      </Button.Group>
      <View mt={2} paddingX={5}>
        <TextInput
          label={t('userLink.enterElderlyCode')}
          placeholder="XXXXXX"
          name="elderlyCode"
          control={control}
          errors={errors}
          mb={2}
        />
      </View>
      {isCodeValid ? null : (
        <View flexDir="row">
          <Text ml="5" color="red.500">
            {t('userLink.invalidCode')}
          </Text>
        </View>
      )}
      <View my="4" flexDir="row" justifyContent="center">
        <Button
          isDisabled={!isValid}
          width="90.5%"
          onPress={() => handleSubmit()}>
          {t('userLink.enterButton')}
        </Button>
      </View>
    </View>
  );
};

export default InputCodeScreen;
