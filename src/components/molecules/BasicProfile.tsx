import React, { useContext } from 'react';
import { Text, View, Image } from 'native-base';
import Spacer from '../atoms/Spacer';
import { ProfileItem } from '../../interfaces/User';
import images from '../../assets/images';
import { UserContext } from '../../contexts/UserContext';
import FallbackImage from './FallbackImage';

const ProfileInfoItem = ({ label, value }: ProfileItem) => {
  return (
    <View>
      <View flexDir="row" justifyContent="space-between">
        <View w="1/2">
          <Text fontSize="md" color="muted.500">
            {label}
          </Text>
        </View>
        <View w="full">
          <Text fontSize="md">{value}</Text>
        </View>
      </View>
      <Spacer h={8} />
    </View>
  );
};

export enum BasicProfileMode {
  SELF = 'SELF',
  OTHER = 'OTHER'
}

type BasicProfileProps = {
  data: ProfileItem[];
  image?: string;
  mode: BasicProfileMode;
};

const BasicProfile = ({ data, image, mode }: BasicProfileProps) => {
  const { user } = useContext(UserContext);
  const getImage = () => {
    if (mode === 'SELF')
      return user?.imageid ? { uri: user?.imageid } : images.picturePlaceholder;
    else {
      if (image) return { uri: image };
      if (image === '') return { uri: '' };
    }
  };

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
          source={getImage()}
          width="32"
          height="32"
          borderRadius={4}
          fallbackElement={FallbackImage}
          alt="Profile Picture"
        />
      </View>
      <Spacer />

      {data.map((item, key) => {
        return (
          <ProfileInfoItem key={key} label={item.label} value={item.value} />
        );
      })}
    </>
  );
};

export default BasicProfile;
