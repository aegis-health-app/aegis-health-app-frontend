import {
  FormControl,
  Text,
  View,
  VStack,
  Input,
  ScrollView,
  HStack,
  Button,
  Divider,
  Radio
} from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

const CreateMemoryRecallQuestionsScreen = () => {
  const [isMultipleChoice, setIsMultipleChoice] = useState(true);
  const { t } = useTranslation();

  function handlePressChoiceTemplate(type: 'multiple' | 'short') {
    if (type === 'multiple') {
      setIsMultipleChoice(true);
    } else if (type === 'short') {
      setIsMultipleChoice(false);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View px={4} py={4}>
          <VStack space={2}>
            <FormControl>
              <FormControl.Label>
                {t('createMemoryRecall.header')}
              </FormControl.Label>
              <Input
                defaultValue="12345"
                placeholder={t('createMemoryRecall.title')}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>
                {t('createMemoryRecall.image')}
              </FormControl.Label>
              <View
                h="48"
                w="full"
                bgColor="#fff"
                alignItems="center"
                justifyContent="center">
                <Text fontSize="md" color="gray.400">
                  {t('createMemoryRecall.imageHelperText')}
                </Text>
              </View>
              <HStack space={2} mb={2} mt={4}>
                <Button w="1/2">{t('createMemoryRecall.takePhoto')}</Button>
                <Button w="1/2">{t('createMemoryRecall.browse')}</Button>
              </HStack>
            </FormControl>
            <Divider />
            <FormControl>
              <FormControl.Label>
                {t('createMemoryRecall.questionType')}
              </FormControl.Label>
              <HStack space={2} mb={2} mt={4}>
                <Button
                  w="1/2"
                  variant={isMultipleChoice === true ? 'solid' : 'outline'}
                  onPress={() => handlePressChoiceTemplate('multiple')}>
                  {t('createMemoryRecall.multipleChoice')}
                </Button>
                <Button
                  w="1/2"
                  variant={isMultipleChoice === false ? 'solid' : 'outline'}
                  onPress={() => handlePressChoiceTemplate('short')}>
                  {t('createMemoryRecall.shortAnswer')}
                </Button>
              </HStack>
              {/* <Input defaultValue="12345" placeholder="Title" /> */}
            </FormControl>
            {isMultipleChoice === true ? (
              <FormControl>
                <FormControl.Label>
                  {t('createMemoryRecall.selectChoice')}
                </FormControl.Label>
                <Radio.Group name="Question radio">
                  <VStack space={2}>
                    <HStack w="full" space={4} alignItems="center">
                      <Radio value="1" my={1} />
                      <Input
                        defaultValue=""
                        placeholder={`${t('createMemoryRecall.choice')} 1`}
                        w="80"
                      />
                    </HStack>
                    <HStack w="full" space={4} alignItems="center">
                      <Radio value="2" my={1} />
                      <Input
                        defaultValue=""
                        placeholder={`${t('createMemoryRecall.choice')} 2`}
                        w="80"
                      />
                    </HStack>
                    <HStack w="full" space={4} alignItems="center">
                      <Radio value="3" my={1} />
                      <Input
                        defaultValue=""
                        placeholder={`${t('createMemoryRecall.choice')} 3`}
                        w="80"
                      />
                    </HStack>
                    <HStack w="full" space={4} alignItems="center">
                      <Radio value="4" my={1} />
                      <Input
                        defaultValue=""
                        placeholder={`${t('createMemoryRecall.choice')} 4`}
                        w="80"
                      />
                    </HStack>
                  </VStack>
                </Radio.Group>
              </FormControl>
            ) : (
              <FormControl>
                <FormControl.Label>
                  {t('createMemoryRecall.shortAnswer')}
                </FormControl.Label>
              </FormControl>
            )}
            <Button>Create</Button>
          </VStack>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateMemoryRecallQuestionsScreen;
