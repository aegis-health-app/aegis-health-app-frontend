import { Image, View } from 'native-base';
import React from 'react';
const ProfilePic = require('../../assets/images/profile.png');

const FallbackImage = (
  <View>
    <Image
      source={ProfilePic}
      width={60}
      height={60}
      borderRadius={10}
      marginRight={3}
    />
  </View>
);

export default FallbackImage;
