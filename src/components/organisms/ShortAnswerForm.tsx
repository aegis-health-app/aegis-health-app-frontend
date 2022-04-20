import {
  FormControl,
  Text,
  View,
  VStack,
  Input,
  HStack,
  Button,
  Divider
} from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ShortAnswerValidationSchema } from '../../dto/modules/memoryRecall';
import { useWindowDimensions } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useImageSelection } from '../../hooks/useImageSelection';
import images from '../../assets/images';
import { useFormik } from 'formik';

type MultipleChoiceFormProps = {
  isMultipleChoice: boolean;
  setIsMultipleChoice: (val: boolean) => void;
};

const ShortAnswerForm = ({
  isMultipleChoice,
  setIsMultipleChoice
}: MultipleChoiceFormProps) => {
  const { t } = useTranslation();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const [image, setImage] = useState<ImagePickerResponse>();

  const { width } = useWindowDimensions();

  function handlePressChoiceTemplate(type: 'multiple' | 'short') {
    if (type === 'multiple') {
      setIsMultipleChoice(true);
    } else if (type === 'short') {
      setIsMultipleChoice(false);
    }
  }

  const getImage = () => {
    if (image && image.assets) {
      return { uri: image.assets[0].uri };
    } else {
      return images.picturePlaceholder;
    }
  };

  async function onUploadImage(result: ImagePickerResponse) {
    if (result) {
      setImage(result);
    }
  }

  const { errors, handleChange, values, handleSubmit } = useFormik({
    validationSchema: ShortAnswerValidationSchema,
    initialValues: {
      question: '',
      isMCQ: false
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <View px={4} py={4}>
      <VStack space={2}>
        <FormControl isRequired isInvalid={'question' in errors}>
          <Text bold>{t('createMemoryRecall.header')}</Text>
          <Input
            placeholder={t('createMemoryRecall.title')}
            value={values.question}
            onChangeText={handleChange('question')}
          />
          <FormControl.ErrorMessage>
            {errors.question ? errors.question : ''}
          </FormControl.ErrorMessage>
        </FormControl>
        <Text bold>{t('createMemoryRecall.image')}</Text>
        <View
          h="48"
          w="full"
          bgColor="#fff"
          alignItems="center"
          justifyContent="center">
          {image ? (
            <Image
              source={getImage()}
              width="48"
              height="48"
              borderRadius={4}
              alt="Memory Recall Image"
            />
          ) : (
            <Text fontSize="md" color="gray.400">
              {t('createMemoryRecall.imageHelperText')}
            </Text>
          )}
        </View>
        <HStack w="full" justifyContent="space-between" mb={2} mt={4}>
          <Button w={width / 2.25} onPress={() => takePicture(onUploadImage)}>
            {t('createMemoryRecall.takePhoto')}
          </Button>
          <Button
            w={width / 2.25}
            onPress={() => selectPictureFromDevice(onUploadImage)}>
            {t('createMemoryRecall.browse')}
          </Button>
        </HStack>
        <Divider />
        <Text bold>{t('createMemoryRecall.questionType')}</Text>
        <HStack justifyContent="space-between" my={2}>
          <Button
            w={width / 2.25}
            variant={isMultipleChoice === true ? 'solid' : 'outline'}
            onPress={() => handlePressChoiceTemplate('multiple')}>
            {t('createMemoryRecall.multipleChoice')}
          </Button>
          <Button
            w={width / 2.25}
            variant={isMultipleChoice === false ? 'solid' : 'outline'}
            onPress={() => handlePressChoiceTemplate('short')}>
            {t('createMemoryRecall.shortAnswer')}
          </Button>
        </HStack>

        <Button w="full" onPress={handleSubmit}>
          Create
        </Button>
      </VStack>
    </View>
  );
};

export default ShortAnswerForm;
