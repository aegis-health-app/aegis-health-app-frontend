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
import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FormState,
  MultipleChoiceValidationSchema,
  QuestionDetails
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
import FallbackImage from '../molecules/FallbackImage';

type MultipleChoiceFormProps = {
  formState: { question: string; image: ImagePayload | undefined };
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  isMultipleChoice: boolean;
  setIsMultipleChoice: (val: boolean) => void;
};

const MultipleChoiceForm = ({
  formState,
  setFormState,
  isMultipleChoice,
  setIsMultipleChoice
}: MultipleChoiceFormProps) => {
  const { t } = useTranslation();
  const { takePicture, selectPictureFromDevice } = useImageSelection();
  const [image, setImage] = useState<ImagePayload>();
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const { currentElderlyUid } = useContext(CaretakerContext);
  const navigation = useNavigation();

  const { width } = useWindowDimensions();

  const { errors, handleChange, setFieldValue, values, handleSubmit } =
    useFormik({
      validationSchema: MultipleChoiceValidationSchema,
      initialValues: {
        question: formState.question,
        isMCQ: true,
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correctAnswer: undefined
      },
      onSubmit: async (values) => {
        if (currentElderlyUid === undefined || !answer) return;
        setLoading(true);
        const multipleChoiceQuestionPayload: QuestionDetails = {
          ...values,
          correctAnswer: answer,
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

  useEffect(() => {
    if (values.correctAnswer === '1') {
      setAnswer(values.choice1);
    } else if (values.correctAnswer === '2') {
      setAnswer(values.choice2);
    } else if (values.correctAnswer === '3') {
      setAnswer(values.choice3);
    } else if (values.correctAnswer === '4') {
      setAnswer(values.choice4);
    }
  }, [values.correctAnswer]);

  function handleChangeRadioAnswer(val: string) {
    if (!val) return;
    setFieldValue('correctAnswer', val);
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
              fallbackElement={FallbackImage}
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
                <Radio value="1" h="16" />
                <Radio value="2" h="16" mt={1} />
                <Radio value="3" h="16" mt={2} />
                <Radio value="4" h="16" mt={2} />
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
              All choices are required
            </Text>
          )}
          <Text color="error.500">{errors.correctAnswer}</Text>
        </View>

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

export default MultipleChoiceForm;
