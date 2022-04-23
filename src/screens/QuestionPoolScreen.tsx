import {
  Button,
  FlatList,
  HStack,
  Text,
  View,
  Checkbox,
  Icon,
  Spinner,
  VStack
} from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuestionInfo } from './../dto/modules/memoryRecall';
import useAsyncEffect from './../hooks/useAsyncEffect';
import { getAllQuestions } from '../utils/caretaker/memoryRecall';
import { CaretakerContext } from './../contexts/CaretakerContext';

const QuestionPoolScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentElderlyUid } = useContext(CaretakerContext);

  const MAX_SELECTION = 10;
  const [selectedCount, setSelectedCount] = useState(0);
  const [questions, setQuestions] = useState<QuestionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    if (!currentElderlyUid) return;
    setIsLoading(true);
    const _questions = await getAllQuestions(currentElderlyUid);
    setQuestions(_questions);
    setIsLoading(false);
  }, [currentElderlyUid]);

  return (
    <SafeAreaView>
      <View px={4} pt={2}>
        <HStack justifyContent="space-between">
          <Text fontSize="md" bold>
            {t('questionPool.questions')}
          </Text>
          <HStack space={4}>
            <Text fontSize="md">{t('questionPool.totalSelected')} </Text>
            <Text fontSize="md" bold>
              {selectedCount}/{MAX_SELECTION}
            </Text>
          </HStack>
        </HStack>
        <View h="86%" p={2} my={2}>
          <VStack space={2}>
            <Text fontSize="lg" bold>
              {t('questionPool.createTemplate')}
            </Text>
            <HStack
              h="12"
              px={4}
              alignItems="center"
              justifyContent="space-between"
              bgColor="white"
              borderRadius="lg"
              style={styles.card}>
              <Text fontSize="md">{t('questionPool.template1')}</Text>
              <Icon
                onPress={() =>
                  navigation.navigate('CreateMemoryRecallQuestionsScreen', {
                    question: t('questionPool.template1')
                  })
                }
                as={MaterialIcons}
                name="add"
                size="sm"
                color="black"
              />
            </HStack>
            <HStack
              h="12"
              px={4}
              alignItems="center"
              justifyContent="space-between"
              bgColor="white"
              borderRadius="lg"
              style={styles.card}>
              <Text fontSize="md">{t('questionPool.template2')}</Text>
              <Icon
                onPress={() =>
                  navigation.navigate('CreateMemoryRecallQuestionsScreen', {
                    question: t('questionPool.template2')
                  })
                }
                as={MaterialIcons}
                name="add"
                size="sm"
                color="black"
              />
            </HStack>
          </VStack>

          {questions.length > 0 ? (
            <FlatList
              data={questions}
              renderItem={({ item }) => <QuestionPoolItem data={item} />}
              keyExtractor={(_, key) => key.toString()}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View alignItems="center" justifyContent="center" h="64">
              {isLoading ? (
                <Spinner size="lg" />
              ) : (
                <>
                  <Text fontSize="xl">{t('questionPool.noQuestions')}</Text>
                  <Text textAlign="center" fontSize="md" color="gray.400">
                    {t('questionPool.createQuestionHelper')}
                  </Text>
                </>
              )}
            </View>
          )}
        </View>
        <Button
          w="full"
          rightIcon={
            <Icon name="add" as={MaterialIcons} color="white" size="sm" />
          }
          onPress={() =>
            navigation.navigate('CreateMemoryRecallQuestionsScreen', {
              question: ''
            })
          }>
          <Text color="#fff" bold fontSize="md">
            {t('questionPool.createCustom')}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

type QuestionPoolItemProps = {
  data: QuestionInfo;
};

function QuestionPoolItem({ data }: QuestionPoolItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, isSelected] = useState(data.isSelected);

  return (
    <HStack
      h="12"
      px={4}
      alignItems="center"
      justifyContent="space-between"
      // bgColor={isSelected ? 'primary.100' : 'white'}
      bgColor="white"
      my={1}
      borderRadius="lg"
      style={styles.card}>
      <Checkbox isChecked={selected} colorScheme="green">
        {data.question}
      </Checkbox>
      <Icon
        onPress={() =>
          navigation.navigate('CreateMemoryRecallQuestionsScreen', {
            questionInfo: data
          })
        }
        as={MaterialCommunityIcons}
        name="pencil"
        size="sm"
        color="black"
      />
    </HStack>
  );
}

export default QuestionPoolScreen;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  }
});
