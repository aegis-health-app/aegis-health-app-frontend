import React, { useEffect, useState } from 'react';
import { View, Text, Icon, Box, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

type QuestionCardProps = {
  question: string;
  isSelected: boolean;
  onSelect: any;
  isFull: boolean;
};

const ViewQuestionPoolCard = ({
  question,
  isSelected,
  onSelect,
  isFull
}: QuestionCardProps) => {
  const [selected, setSelected] = useState<boolean>(isSelected);

  useEffect(() => {
    onSelect(selected);
  }, [selected]);
  return (
    <Pressable
      disabled={isFull}
      onPress={() => {
        setSelected(!selected);
      }}>
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
        bgColor={selected ? '#C1E2FF' : 'white'}>
        <>
          <Pressable
            onPress={() => {
              setSelected(!selected);
            }}>
            {selected ? (
              <Icon
                as={AntDesign}
                name="checksquare"
                size="5"
                color="#005DB4"></Icon>
            ) : (
              <Box
                width="5"
                height="5"
                bgColor="white"
                borderColor="#D4D4D4"
                borderRadius={3}
                borderWidth={2}
              />
            )}
          </Pressable>
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
    </Pressable>
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
