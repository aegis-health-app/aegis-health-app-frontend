import React, { useEffect, useState } from 'react';
import { View, Text, Icon, Box, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type QuestionCardProps = {
  question: string;
};

const ViewQuestionPoolCard = ({
  question,
}: QuestionCardProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { t } = useTranslation();

  return (
      <View
        flexDir="row"
        my={1.5}
        justifyContent="space-between"
        alignItems="center"
        width="93%"
        p={1}
        px={2}
        py={3.5}
        style={styles.card}
        bgColor='white'>
        <>
          <Text ml="2" flex={1} flexWrap="wrap" fontSize="15" numberOfLines={1}>
            {question}
          </Text>
        </>
        <Icon
          as={MaterialIcons}
          name="mode-edit"
          size="5"
          color="muted.600"
          onPress={() => console.log('navigate to edit')}
        />
      </View>
  );
};

export default ViewQuestionPoolCard;

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
