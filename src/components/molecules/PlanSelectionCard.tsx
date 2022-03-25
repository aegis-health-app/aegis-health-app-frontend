import { StyleSheet } from 'react-native';
import { Text, View, Image, Button } from 'native-base';
import React from 'react';

type PlanSelectionCardType = {
  backgroundColor: string;
  image: any; // FIXME: what is the type of the image?
  header: string;
  list: string[];
  buttonText: string;
  buttonColor: string | null;
  handlePress: () => void;
};

const PlanSelectionCard = ({
  backgroundColor,
  image,
  header,
  list,
  buttonText,
  buttonColor,
  handlePress
}: PlanSelectionCardType) => {
  const bullet = (text: string, i: number) => {
    return (
      <View key={i} style={styles.column}>
        <View style={styles.row}>
          <View style={styles.bullet}>
            <Text>{'\u2022' + ' '}</Text>
          </View>
          <View style={styles.bulletText}>
            <Text style={styles.bulletText}>{text}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View
      style={styles.card}
      backgroundColor={backgroundColor}
      borderRadius="md"
      mb="5">
      <View
        flexDirection="row"
        justifyContent="flex-start"
        mt={3}
        mb={5}
        w="full">
        <Image
          source={image}
          alt="Plan Selection Image"
          width={150}
          height={150}
          resizeMode="contain"
          mr={3}
        />
        <View w="1/2">
          {/* TODO: Return fontSize based on isElderly hook */}
          <Text padding="1" fontWeight="400" fontSize="md" mt={2} mb={4}>
            <Text style={styles.headerText}>{header}</Text>
          </Text>
          {list.map((item, i) => bullet(item, i))}
        </View>
      </View>
      <Button w="full" backgroundColor={buttonColor} onPress={handlePress}>
        {buttonText}
      </Button>
    </View>
  );
};

export default PlanSelectionCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  column: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  headerText: {
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1
  },
  bullet: {
    width: 10
  },
  bulletText: {
    flex: 1,
    fontSize: 14
  }
});
