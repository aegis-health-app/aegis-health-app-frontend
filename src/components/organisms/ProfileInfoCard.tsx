import { View, Box, Image, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';

const CaretakerPic = require('../../assets/images/Caretaker.png');

type ProfileInfoCardProps = {
  name: string;
  gender: string;
  bdate: string;
  phone: string;
};

const ProfileInfoCard = ({
  name,
  gender,
  bdate,
  phone
}: ProfileInfoCardProps) => {
  const { t } = useTranslation();

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
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('102')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('103')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('104')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('105')}
            </Text>
          </View>
        </View>
        <View flexDir="column" ml="6">
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {name}
            </Text>
          </View>
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {gender}
            </Text>
          </View>
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {bdate}
            </Text>
          </View>
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {phone}
            </Text>
          </View>
        </View>
      </View>
    </Box>
  );
};

export default ProfileInfoCard;
