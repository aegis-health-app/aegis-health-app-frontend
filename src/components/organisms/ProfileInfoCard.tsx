import { View, Box, Image, Text } from 'native-base';
import React from 'react';

const CaretakerPic = require('../../assets/images/Caretaker.png');

const ProfileInfoCard = () => {
  return (
    <Box>
        <Box alignItems="center" my="5">
            <Image
                source={CaretakerPic}
                borderRadius={10}
                alt="Profile Picture"
                />
        </Box>
        {/* todo center */}
        <Box flexDir="row">
        <Text ml="5" color="gray.600" fontSize={16}>ชื่อ</Text>
        <Text color="black" fontWeight="bold" fontSize={16}>Hi</Text>
        </Box>
        <Box flexDir="row">
        <Text ml="5" color="gray.600" fontSize={16}>เพศ</Text>
        <Text color="black" fontWeight="bold" fontSize={16}>Hi</Text>
        </Box>
        <Box flexDir="row">
        <Text ml="5" color="gray.600" fontSize={16}>วันเกิด</Text>
        <Text color="black" fontWeight="bold" fontSize={16}>Hi</Text>
        </Box>
        <Box flexDir="row">
        <Text ml="5" color="gray.600" fontSize={16}>หมายเลขโทรศัพท์</Text>
        <Text color="black" fontWeight="bold" fontSize={16}>Hi</Text>
        </Box>
    </Box>
  );
};

export default ProfileInfoCard;
