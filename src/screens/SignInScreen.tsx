import {
  AspectRatio,
  Box,
  Button,
  Center,
  Icon,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
  VStack
} from 'native-base';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native-safe-area-context';

import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import FormHeader from '../components/atoms/FormHeader';
import TextInput from '../components/atoms/TextInput';
import images from '../assets/images';
import useDimensions from '../hooks/useDimensions';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignInScreen = () => {
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm();

  const { ScreenWidth } = useDimensions();
  const { t } = useTranslation();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onFormSubmit = useCallback(() => {}, []);

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
        <VStack px={2} justifyContent="flex-start">
          <FormHeader headerText={t('auth.signIn')} mt={10} mb={7} />
          <Box mb={6}>
            <TextInput
              label={t('profile.phoneNumber')}
              placeholder={t('profile.phoneNumber')}
              name="phoneNumber"
              control={control}
              errors={errors}
              isRequired
              errorMessage={t('error.isRequired').replace(
                '${name}',
                t('profile.phoneNumber')
              )}
            />
          </Box>
          <Box mb={6}>
            <TextInput
              label={t('auth.password')}
              placeholder={t('auth.password')}
              name="password"
              control={control}
              errors={errors}
              isRequired
              errorMessage={t('error.isRequired').replace(
                '${name}',
                t('auth.password')
              )}
              type={showPassword ? 'text' : 'password'}
              InputRightElement={
                <Icon
                  mr={2}
                  size="sm"
                  h="full"
                  as={Ionicons}
                  name={showPassword ? 'eye' : 'eye-off'}
                  color="muted.400"
                  onPress={() => setShowPassword((prev) => !prev)}
                />
              }
            />
          </Box>
          <Pressable>
            <Text textAlign="right" color="blue.600" mb={2}>
              {t('auth.forgotPassword')}
            </Text>
          </Pressable>
          <Button w="full" onPress={handleSubmit(onFormSubmit)}>
            {t('auth.signIn')}
          </Button>
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNIN} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignInScreen;
