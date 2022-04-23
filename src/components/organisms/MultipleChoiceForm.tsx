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
  Image
} from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MultipleChoiceValidationSchema,
  MultipleChoiceAnswer,
  QuestionDetails,
  QuestionInfo
} from '../../dto/modules/memoryRecall';
import { useWindowDimensions } from 'react-native';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useImageSelection } from '../../hooks/useImageSelection';
import images from '../../assets/images';
import { useFormik } from 'formik';

type MultipleChoiceFormProps = {
  questionInfo: QuestionInfo | undefined;
  question: string | undefined;
  isMultipleChoice: boolean;
  setIsMultipleChoice: (val: boolean) => void;
};

const MultipleChoiceForm = ({
  questionInfo,
  question,
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

  const { errors, handleChange, setFieldValue, values, handleSubmit } =
    useFormik({
      validationSchema: MultipleChoiceValidationSchema,
      initialValues: {
        question: questionInfo?.question ? questionInfo.question : question,
        isMCQ: true,
        choice1: '',
        choice2: '',
        choice3: '',
        choice4: '',
        correctAnswer: undefined
      },
      onSubmit: (values) => {
        console.log(values);
      }
    });

  function handleChangeRadioAnswer(val: MultipleChoiceAnswer) {
    if (!val) return;

    setFieldValue('correctAnswer', val);
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
              onChange={(val) =>
                handleChangeRadioAnswer(val as MultipleChoiceAnswer)
              }>
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
          Create
        </Button>
      </VStack>
    </View>
  );
};

export default MultipleChoiceForm;
