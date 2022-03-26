import { Text, View, Box, Image } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { ElderlyHomeProfile } from './../../dto/modules/modules.dto';

type ElderlyInCareItemProps = {
  elderly: ElderlyHomeProfile;
};

const ElderlyInCareItem = ({ elderly }: ElderlyInCareItemProps) => {
  return (
    <View flexDir="row" my={1.5} w="90%" bgColor="#fff" style={styles.card}>
      <Box
        bgColor="white"
        flexDir="row"
        justifyContent="space-between"
        px="2"
        py="2"
        alignItems="center">
        <View flexDir="row" alignItems="center" minW="72%" overflow="hidden">
          <Image
            source={{ uri: elderly.imageid }}
            width="16"
            height="16"
            borderRadius={10}
            marginRight={3}
            alt="Profile Picture"
          />
          <Text flex={1} flexWrap="wrap" numberOfLines={1}>
            {elderly.dname}
          </Text>
        </View>
        <View ml={3}>
          {/* <EditButton
            onPress={() =>
              navigation.navigate('EditCaretakerScreen', { itemId: name })
            }
          /> */}
        </View>
      </Box>
    </View>
  );
};

export default ElderlyInCareItem;

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
