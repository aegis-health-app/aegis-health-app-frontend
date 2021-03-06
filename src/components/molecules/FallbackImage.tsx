import { Image, View } from 'native-base';
import React from 'react';
const ProfilePic = require('../../assets/images/profile.png');

const FallbackImage = (
  <View>
    <Image
      source={ProfilePic}
      width={50}
      height={50}
      borderRadius={10}
      marginRight={3}
      alt="Fallback Image"
    />
  </View>
);

export const FallbackImageMedium = (
  <View>
    <Image
      source={ProfilePic}
      width={60}
      height={60}
      borderRadius={10}
      marginRight={3}
      alt="Fallback Image Medium"
    />
  </View>
);

export const FallbackImageLarge = (
  <View>
    <Image
      source={ProfilePic}
      width={160}
      height={160}
      borderRadius={10}
      marginRight={3}
      alt="Fallback Image Large"
    />
  </View>
);
export default FallbackImage;
