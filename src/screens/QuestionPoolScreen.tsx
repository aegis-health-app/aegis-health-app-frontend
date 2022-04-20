import { Button, FlatList, HStack, Text, View, Checkbox } from 'native-base';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

const QuestionPoolScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const MAX_SELECTION = 10;
  const [selectedCount, setSelectedCount] = useState(0);

  const MOCK_Q = [
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY',
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY',
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY',
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY',
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY',
    'WHAT DID YOU EAT THIS MORNING',
    'HOW DO YOU FEEL TODAY'
  ];

  return (
    <SafeAreaView>
      <View px={4} pt={2}>
        <HStack justifyContent="space-between">
          <Text fontSize="md" bold>
            Questions
          </Text>
          <HStack space={4}>
            <Text fontSize="md">Total Selected </Text>
            <Text fontSize="md" bold>
              {selectedCount}/{MAX_SELECTION}
            </Text>
          </HStack>
        </HStack>
        <View h="86%" p={2} my={2}>
          <FlatList
            data={MOCK_Q}
            renderItem={({ item }) => <QuestionPoolItem data={item} />}
            keyExtractor={(_, key) => key.toString()}
          />
        </View>
        <Button
          w="full"
          onPress={() =>
            navigation.navigate('CreateMemoryRecallQuestionsScreen')
          }>
          Create a custom question
        </Button>
      </View>
    </SafeAreaView>
  );
};

type QuestionPoolItemProps = {
  data: string;
};

function QuestionPoolItem({ data }: QuestionPoolItemProps) {
  return (
    <View
      h="12"
      px={4}
      alignItems="flex-start"
      justifyContent="center"
      // bgColor={isSelected ? 'primary.100' : 'white'}
      bgColor="white"
      my={1}
      borderRadius="lg"
      style={styles.card}>
      <Checkbox isChecked colorScheme="green">
        {data}
      </Checkbox>
    </View>
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
