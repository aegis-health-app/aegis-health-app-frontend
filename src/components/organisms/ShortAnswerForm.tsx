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
  FormState,
  QuestionDetails,
  ShortAnswerValidationSchema
} from '../../dto/modules/memoryRecall';
import { useWindowDimensions } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useImageSelection } from '../../hooks/useImageSelection';
import images from '../../assets/images';
import { useFormik } from 'formik';
import { ImagePayload } from '../../interfaces/image';
import { sendCreatedQuestion } from '../../utils/caretaker/memoryRecall';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { useNavigation } from '@react-navigation/native';

type ShortAnswerFormProps = {
  formState: { question: string; image: ImagePayload | undefined };
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  isMultipleChoice: boolean;
  setIsMultipleChoice: (val: boolean) => void;
  edit: boolean;
};

const ShortAnswerForm = ({
  formState,
  setFormState,
  isMultipleChoice,
  setIsMultipleChoice
}: ShortAnswerFormProps) => {
  const { t } = useTranslation();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const [image, setImage] = useState<ImagePayload>();
  const [loading, setLoading] = useState(false);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const { errors, setFieldValue, values, handleSubmit } = useFormik({
    validationSchema: ShortAnswerValidationSchema,
    initialValues: {
      question: formState.question,
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
      await sendCreatedQuestion(
        multipleChoiceQuestionPayload,
        currentElderlyUid
      );
      setLoading(false);
      navigation.goBack();
    }
  });

  function handlePressChoiceTemplate(type: 'multiple' | 'short') {
    if (type === 'multiple') {
      setIsMultipleChoice(true);
    } else if (type === 'short') {
      setIsMultipleChoice(false);
    }
  }

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
      setFormState({
        ...values,
        image: image
      });
    }
  }

  function handleChangeQuestion(val: string) {
    setFieldValue('question', val);
    setFormState({ ...formState, question: val });
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
          {loading ? (
            <Spinner color="white" />
          ) : (
            <Text fontSize="md" bold color="#fff">
              {t('viewQuestionPool.create')}
            </Text>
          )}
        </Button>
      </VStack>
    </View>
  );
};

export default ShortAnswerForm;
