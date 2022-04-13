import React from 'react';
import { View, Text} from 'native-base';
import { StyleSheet } from 'react-native';

type QuestionCardProps = {
  question: string;
};

const ViewQuestionPoolCard = ({
  question,
}: QuestionCardProps) => {

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
