import { View, Box, Image, Text } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '../../hooks/useSettings';
import { getFormattedDate } from '../../utils/getFormattedDate';

const ProfilePic = require('../../assets/images/profile.png');

type ProfileInfoCardProps = {
  fullName: string;
  gender: 'F'|'M';
  bdate: string;
  phone?: string;
  imageId: string;
};

const ProfileInfoCard = ({
  fullName,
  gender,
  bdate,
  phone,
  imageId
}: ProfileInfoCardProps) => {
  const { t } = useTranslation();
  const { language } = useSettings();

  return (
    <Box>
      <Box alignItems="center" my="5">
        <Image
          source={imageId ? { uri: imageId } : ProfilePic}
          w={160}
          h={160}
          borderRadius={10}
          alt="Profile Picture"
        />
      </Box>
      <View flexDir="row">
        <View flexDir="column" width="45%">
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('profile.name')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('profile.gender')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('profile.birthDate')}
            </Text>
          </View>
          <View>
            <Text ml="5" color="gray.600" fontSize={16}>
              {t('profile.phoneNumber')}
            </Text>
          </View>
        </View>
        <View flexDir="column">
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {fullName}
            </Text>
          </View>
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {gender}
            </Text>
          </View>
          <View>
            <Text color="black" fontWeight="bold" fontSize={16}>
              {getFormattedDate(new Date(bdate), language)}
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
