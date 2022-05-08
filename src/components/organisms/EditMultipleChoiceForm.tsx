import {
  FormControl,
  Text,
  View,
  VStack,
  Input,
  HStack,
  Button,
  Divider,
  Radio,
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
import FallbackImage from './../molecules/FallbackImage';
import { useMultipleChoiceValidation } from '../../hooks/useMultipleChoiceValidation';
import { client } from './../../config/axiosConfig';

type MultipleChoiceFormProps = {
  question: QuestionDetailsResponse;
  mid: string;
};

const EditMultipleChoiceForm = ({ question, mid }: MultipleChoiceFormProps) => {
  const { t } = useTranslation();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const [image, setImage] = useState<ImagePayload>();

  const [loading, setLoading] = useState(false);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const navigation = useNavigation();
  const MultipleChoiceValidationSchema = useMultipleChoiceValidation();

  const { width } = useWindowDimensions();

  const { errors, handleChange, setFieldValue, values, handleSubmit } =
    useFormik({
      validationSchema: MultipleChoiceValidationSchema,
      initialValues: {
        question: question.question,
        isMCQ: true,
        choice1: question.choice1,
        choice2: question.choice2,
        choice3: question.choice3,
        choice4: question.choice4,
        correctAnswer: question.correctAnswer
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

  function handleChangeRadioAnswer(val: string) {
    if (!val) return;
    setFieldValue('correctAnswer', val);
  }

  function handleChangeQuestion(val: string) {
    setFieldValue('question', val);
  }

  async function handleDelete() {
    await client.delete('/memoryPractice/deleteQuestion', {
      data: { elderlyuid: currentElderlyUid, mid: mid }
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
            onChangeText={(val) => handleChangeQuestion(val)}
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
          <Button w={width / 2.25} variant="solid">
            {t('createMemoryRecall.multipleChoice')}
          </Button>
          <Button w={width / 2.25} variant="outline" isDisabled>
            {t('createMemoryRecall.shortAnswer')}
          </Button>
        </HStack>

        <View>
          <Text bold my={2}>
            {t('createMemoryRecall.selectChoice')}
          </Text>
          <HStack space={2}>
            <Radio.Group
              name="Question radio"
              value={values.correctAnswer}
              onChange={(val) => handleChangeRadioAnswer(val)}>
              <VStack h="48" justifyContent="space-evenly">
                <Radio value={values.choice1 ? values.choice1 : '1'} h="16" />
                <Radio
                  value={values.choice2 ? values.choice2 : '2'}
                  h="16"
                  mt={1}
                />
                <Radio
                  value={values.choice3 ? values.choice3 : '3'}
                  h="16"
                  mt={2}
                />
                <Radio
                  value={values.choice4 ? values.choice4 : '4'}
                  h="16"
                  mt={2}
                />
              </VStack>
            </Radio.Group>
            <VStack space={2}>
              <FormControl isRequired isInvalid={'choice1' in errors}>
                <Input
                  placeholder={`${t('createMemoryRecall.choice')} 1`}
                  w="80"
                  value={values.choice1}
                  onChangeText={handleChange('choice1')}
                />
              </FormControl>
              <FormControl isRequired isInvalid={'choice2' in errors}>
                <Input
                  placeholder={`${t('createMemoryRecall.choice')} 2`}
                  w="80"
                  value={values.choice2}
                  onChangeText={handleChange('choice2')}
                />
              </FormControl>

              <FormControl isRequired isInvalid={'choice3' in errors}>
                <Input
                  placeholder={`${t('createMemoryRecall.choice')} 3`}
                  w="80"
                  value={values.choice3}
                  onChangeText={handleChange('choice3')}
                />
              </FormControl>

              <FormControl isRequired isInvalid={'choice4' in errors}>
                <Input
                  placeholder={`${t('createMemoryRecall.choice')} 4`}
                  w="80"
                  value={values.choice4}
                  onChangeText={handleChange('choice4')}
                />
              </FormControl>
            </VStack>
          </HStack>
          {(errors.choice1 ||
            errors.choice2 ||
            errors.choice3 ||
            errors.choice4) && (
            <Text color="error.500" mt={2}>
              {t('createMemoryRecall.choiceMissing')}
            </Text>
          )}
          <Text color="error.500">{errors.correctAnswer}</Text>
        </View>

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

export default EditMultipleChoiceForm;
