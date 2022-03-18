import { StyleSheet } from 'react-native';
import React from 'react';
import { Image, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import EditButton from '../components/atoms/EditButton';
import BasicProfile from '../components/molecules/BasicProfile';
import Divider from '../components/atoms/Divider';
import HealthProfile from '../components/molecules/HealthProfile';

// Temporary profile image
const ProfilePic = require('../assets/images/sompochHD.png');

const ProfileScreen = () => {
  // TODO: Update dummy data to use the fetched data
  const basicProfiledata = [
    {
      label: 'Name',
      value: 'Sompoch Muangyim'
    },
    {
      label: 'Display Name',
      value: 'sompoch'
    },
    {
      label: 'Gender',
      value: 'Male'
    },
    {
      label: 'Birthday',
      value: '08/02/1951'
    },
    {
      label: 'Phone Number',
      value: '0909090909'
    }
  ];

  // TODO: Update dummy data to use the fetched datad
  const healthProfileData = [
    {
      label: 'Health Issues',
      value: 'Diebetes, High blood pressure'
    },
    {
      label: 'Personal Medicine',
      value: 'Ibuprofen'
    },
    {
      label: 'Allergens',
      value: 'Chlorpheniramine เกสรดอกไม้'
    },
    {
      label: 'Previous Vaccinations',
      value: 'บาดทะยัก คอตีบ'
    },
    {
      label: 'Blood Type',
      value: 'B'
    }
  ];

  return (
    <View style={styles.pageContainer}>
      <View style={styles.profileInfoItemRow}>
        <Text fontSize="2xl" fontWeight="700">
          Details
        </Text>
        <EditButton />
      </View>
      <Spacer />
      <View display="flex" flexDir="row" justifyContent="center">
        <Image
          source={ProfilePic}
          width="32"
          height="32"
          borderRadius={4}
          marginRight={4}
          alt="Profile Picture"
        />
      </View>
      <Spacer />
      <BasicProfile data={basicProfiledata} />
      <Divider />
      <HealthProfile data={healthProfileData} />
      <Spacer />
    </View>
  );
};

export default ProfileScreen;

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
