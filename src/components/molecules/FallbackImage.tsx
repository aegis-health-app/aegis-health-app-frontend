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
<<<<<<< HEAD
      alt="Fallback Image"
=======
      alt="fallbackImage"
>>>>>>> 5cd283f (fix: image handling & added alt to FallbackImage)
    />
  </View>
);

export default FallbackImage;
