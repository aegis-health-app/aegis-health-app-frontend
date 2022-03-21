import {
  AspectRatio,
  Box,
  Button,
  Center,
  Image,
  Pressable,
  ScrollView,
  Text,
  VStack
} from 'native-base';
import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import TextInput from '../components/atoms/TextInput';
import images from '../assets/images';
import useDimensions from '../hooks/useDimensions';
import { useTranslation } from 'react-i18next';

const SignInScreen = () => {
  const {
    control,
    formState: { errors }
  } = useForm();

  const { ScreenWidth } = useDimensions();
  const { t } = useTranslation();

  return (
    <SafeAreaView>
      <ScrollView>
        <AspectRatio
          ratio={{
            base: 78 / 56
          }}>
          <Center>
            <Image
              source={images.authBanner}
              alt="Aegis Authentication Banner"
              resizeMode="contain"
              width={ScreenWidth}
            />
          </Center>
        </AspectRatio>
        <VStack px={2}>
          <FormHeader headerText={t('56')} mt={10} mb={7} />
          <TextInput
            label={t('18')}
            name="phoneNumber"
            control={control}
            errors={errors}
            mb={6}
          />
          <TextInput
            label={t('54')}
            name="password"
            control={control}
            errors={errors}
            mb={6}
          />
          <Pressable>
            <Text textAlign="right" color="blue.600" mb={2}>
              {t('55')}
            </Text>
          </Pressable>
          <Button w="full">{t('56')}</Button>
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNIN} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
