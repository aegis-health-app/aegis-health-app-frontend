import { View, Box, Image } from 'native-base';
import React from 'react';

const CaretakerPic = require('../../assets/images/Caretaker.png');

const ProfileInfoCard = () => {
  return (
    <Box alignItems="center" my="5">
            <Image
                source={CaretakerPic}
                borderRadius={10}
                marginRight={3}
                alt="Profile Picture"
                />
                </Box>
  );
};

export default ProfileInfoCard;
