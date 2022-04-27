import {
  FormControl,
  Text,
  View,
  VStack,
  Input,
  HStack,
  Button,
  Divider,
  Image,
  Spinner
} from 'native-base';
import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  QuestionDetails,
  QuestionDetailsResponse
} from '../../dto/modules/memoryRecall';
import { useWindowDimensions } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useImageSelection } from '../../hooks/useImageSelection';
import { useFormik } from 'formik';
import { ImagePayload } from '../../interfaces/image';
import { sendEditedQuestion } from '../../utils/caretaker/memoryRecall';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { useNavigation } from '@react-navigation/native';
import images from '../../assets/images';
import { ShortAnswerValidationSchema } from './../../dto/modules/memoryRecall';
import FallbackImage from './../molecules/FallbackImage';
import { client } from './../../config/axiosConfig';

type EditShortAnswerFormProps = {
  question: QuestionDetailsResponse;
  mid: string;
};

const EditShortAnswerForm = ({ question, mid }: EditShortAnswerFormProps) => {
  const { t } = useTranslation();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const [image, setImage] = useState<ImagePayload>();

  const [loading, setLoading] = useState(false);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const { errors, handleChange, values, handleSubmit } = useFormik({
    validationSchema: ShortAnswerValidationSchema,
    initialValues: {
      question: question.question,
      isMCQ: false
    },
    onSubmit: async (values) => {
      if (currentElderlyUid === undefined) return;
      setLoading(true);
      const multipleChoiceQuestionPayload: QuestionDetails = {
        ...values,
        ...(image && {
          image: {
            base64: image.base64,
            name: image.name,
            type: image.type,
            size: image.size
          }
        })
      };
      await sendEditedQuestion(
        multipleChoiceQuestionPayload,
        currentElderlyUid,
        mid
      );
      setLoading(false);
      navigation.goBack();
    }
  });

  const getImage = () => {
    if (image) {
      return { uri: image.uri };
    } else {
      return images.picturePlaceholder;
    }
  };

  async function onUploadImage(result: ImagePickerResponse) {
    if (
      result &&
      result.assets &&
      result.assets[0].base64 &&
      result.assets[0].fileName &&
      result.assets[0].type &&
      result.assets[0].fileSize
    ) {
      const _image = {
        base64: result.assets[0].base64,
        name: result.assets[0].fileName,
        type: result.assets[0].type,
        size: result.assets[0].fileSize,
        uri: result.assets[0].uri
      };
      setImage(_image);
    }
  }

  async function handleDelete() {
    await client.delete('/memoryPractice/deleteQuestion', {
      data: { elderlyuid: currentElderlyUid, mid: mid.toString() }
    });

    navigation.goBack();
  }

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
              fallbackElement={FallbackImage}
            />
          ) : (
            <Image
              source={{ uri: question.imageid }}
              width="48"
              height="48"
              borderRadius={4}
              alt="Memory Recall Image"
              fallbackElement={FallbackImage}
            />
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
          <Button w={width / 2.25} variant="outline" isDisabled>
            {t('createMemoryRecall.multipleChoice')}
          </Button>
          <Button w={width / 2.25} variant="solid">
            {t('createMemoryRecall.shortAnswer')}
          </Button>
        </HStack>

        <Button w="full" onPress={handleSubmit}>
          {loading ? (
            <Spinner color="white" />
          ) : (
            <Text fontSize="md" bold color="#fff">
              {t('createMemoryRecall.editQuestion')}
            </Text>
          )}
        </Button>
        <Button
          w="full"
          onPress={handleDelete}
          colorScheme="error"
          variant="outline">
          <Text fontSize="md" color="error.500">
            {t('createMemoryRecall.deleteQuestion')}
          </Text>
        </Button>
      </VStack>
    </View>
  );
};

export default EditShortAnswerForm;
