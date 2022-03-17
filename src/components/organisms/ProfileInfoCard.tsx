import { View, Box, Image, Text, VStack, HStack } from 'native-base';
import React from 'react';

const CaretakerPic = require('../../assets/images/Caretaker.png');

const ProfileInfoCard = () => {
  return (
    <Box>
        <Box alignItems="center" my="5">
            <Image
                source={CaretakerPic}
                w={160}
                h={160}
                borderRadius={10}
                alt="Profile Picture"
                />
        </Box>
        <View flexDir="row">
            <View flexDir="column">
                <View>
                    <Text ml="5" color="gray.600" fontSize={16}>ชื่อ</Text>
                </View>
                <View>
                    <Text ml="5" color="gray.600" fontSize={16}>เพศ</Text>
                </View>
                <View>
                    <Text ml="5" color="gray.600" fontSize={16}>วันเกิด</Text>
                </View>
                <View>
                    <Text ml="5" color="gray.600" fontSize={16}>หมายเลขโทรศัพท์</Text>
                </View>
            </View>
            <View flexDir="column" ml="6">
                <View>
                    <Text color="black" fontWeight="bold" fontSize={16}>Somying Muangyim</Text>
                </View>
                <View>
                    <Text color="black" fontWeight="bold" fontSize={16}>Female</Text>
                </View>
                <View>
                    <Text color="black" fontWeight="bold" fontSize={16}>08 Feb 1917</Text>
                </View>
                <View>
                    <Text color="black" fontWeight="bold" fontSize={16}>090909090</Text>
                </View>
            </View>
        </View>
    </Box>
  );
};

export default ProfileInfoCard;
