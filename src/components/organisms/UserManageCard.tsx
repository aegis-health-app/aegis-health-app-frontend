import { View, Text, Image, Pressable, Icon } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type UserManageCardProps = {
  image: any;
  name: string;
};

const UserManageCard = ({ image, name }: UserManageCardProps) => {
  return (
    <View
      flexDir="row"
      mx={4}
      my={2}
      bgColor="white"
      borderRadius="4"
      py={2}
      px={3}
      justifyContent="space-between"
      alignItems="center"
      style={styles.card}>
      <Image
        source={image}
        width="12"
        height="12"
        borderRadius="2"
        mr={4}
        alt="User"
      />
      <View flex={1}>
        <Text fontSize="md" numberOfLines={1}>
          {name}
        </Text>
      </View>
      <Pressable>
        <View
          bgColor="gray.200"
          flexDir="row"
          alignItems="center"
          w="16"
          h="8"
          p={1}
          ml={2}
          borderRadius={4}>
          <Icon
            as={MaterialIcons}
            name="edit"
            size="5"
            color="gray.500"
            mx={1}
          />
          <Text>Edit</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default UserManageCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
