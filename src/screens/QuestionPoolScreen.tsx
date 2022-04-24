import {
  Button,
  HStack,
  Text,
  View,
  Checkbox,
  Icon,
  Spinner,
  VStack,
  ScrollView
} from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import {
  NavigationProp,
  useNavigation,
  useIsFocused
} from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { QuestionInfo } from './../dto/modules/memoryRecall';
import {
  changeSelectedStatus,
  getAllQuestions
} from '../utils/caretaker/memoryRecall';
import { CaretakerContext } from './../contexts/CaretakerContext';
import useAsyncEffect from './../hooks/useAsyncEffect';

const QuestionPoolScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { currentElderlyUid } = useContext(CaretakerContext);

  const MAX_SELECTION = 10;
  const [selectedCount, setSelectedCount] = useState(0);
  const [questions, setQuestions] = useState<QuestionInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  useAsyncEffect(async () => {
    if (currentElderlyUid === undefined || isFocused === false) return;

    setIsLoading(true);
    const _questions = await getAllQuestions(currentElderlyUid);
    setQuestions(_questions);
    setIsLoading(false);
  }, [currentElderlyUid, isFocused]);

  useEffect(() => {
    setSelectedCount(0);
    let count = 0;
    questions.forEach((question) => {
      if (question.isSelected) {
        count += 1;
      }
    });

    setSelectedCount(count);
  }, [questions]);

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
          <Text fontSize="lg" bold mt={4} mb={2}>
            {t('questionPool.selectQuestions')}
          </Text>
          {questions.length > 0 ? (
            <ScrollView>
              {questions.map((item, key) => {
                return (
                  <QuestionPoolItem
                    key={key}
                    data={item}
                    selectedCount={selectedCount}
                    setSelectedCount={setSelectedCount}
                    maxSelectedCount={MAX_SELECTION}
                    currentElderlyUid={currentElderlyUid}
                  />
                );
              })}
            </ScrollView>
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
  selectedCount: number;
  setSelectedCount: React.Dispatch<React.SetStateAction<number>>;
  maxSelectedCount: number;
  currentElderlyUid: number | undefined;
};

function QuestionPoolItem(props: QuestionPoolItemProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [selected, setSelected] = useState(props.data.isSelected);

  async function handleChangeSelected() {
    if (props.currentElderlyUid === undefined || props.selectedCount === 0) {
      return;
    }

    // select
    if (props.selectedCount < props.maxSelectedCount && selected === false) {
      await changeSelectedStatus(
        props.data.mid,
        props.currentElderlyUid,
        'true'
      );
      setSelected((prev) => !prev);
      props.setSelectedCount((prev) => prev + 1);
    } else {
      // unselect
      await changeSelectedStatus(
        props.data.mid,
        props.currentElderlyUid,
        'false'
      );
      setSelected((prev) => !prev);
      props.setSelectedCount((prev) => prev - 1);
    }
  }

  return (
    <HStack
      h="12"
      px={4}
      alignItems="center"
      justifyContent="space-between"
      bgColor={selected ? 'primary.100' : 'white'}
      my={1}
      borderRadius="lg"
      style={styles.card}>
      <Checkbox
        value="check"
        isChecked={selected}
        colorScheme="green"
        onChange={handleChangeSelected}>
        {props.data.question}
      </Checkbox>
      <Icon
        onPress={() =>
          navigation.navigate('EditMemoryRecallQuestionsScreen', {
            data: props.data
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
