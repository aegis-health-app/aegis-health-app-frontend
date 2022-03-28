import React, { useContext } from 'react';
import { FlatList, Text, View, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import Spacer from '../atoms/Spacer';
import { ProfileItem } from '../../interfaces/User';
import images from '../../assets/images';
import { UserContext } from '../../contexts/UserContext';

const ProfileInfoItem = ({ label, value }: ProfileItem) => {
  return (
    <View>
      <View style={styles.profileInfoItemRow}>
        <View w="1/2">
          <Text fontSize="md" color="muted.500">
            {label}
          </Text>
        </View>
        <View style={styles.profileInfoItemValue}>
          <Text fontSize="md">{value}</Text>
        </View>
      </View>
      <Spacer h={8} />
    </View>
  );
};

type BasicProfileProps = {
  data: ProfileItem[];
};

const BasicProfile = ({ data }: BasicProfileProps) => {
  const { user } = useContext(UserContext);

  return (
    <>
      <View
        display="flex"
        flexDir="row"
        alignItems="center"
        justifyContent="center"
        width="full"
        height="32"
        p={2}>
        <Image
          source={
            user?.imageid ? { uri: user?.imageid } : images.picturePlaceholder
          }
          width="32"
          height="32"
          borderRadius={4}
          alt="Profile Picture"
        />
      </View>
      <Spacer />
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ProfileInfoItem label={item.label} value={item.value} />
        )}
        keyExtractor={(item) => item.label}
        scrollEnabled={false}
      />
    </>
  );
};

export default BasicProfile;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  profileInfoItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  profileInfoItemLabel: {
    width: 150
  },
  profileInfoItemValue: {
    width: '100%'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  }
});
