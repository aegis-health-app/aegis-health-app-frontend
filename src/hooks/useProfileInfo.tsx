import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../contexts/UserContext';
import { ProfileItem } from '../interfaces/User';
import { getFormattedDate } from '../utils/getFormattedDate';
import { useSettings } from './useSettings';

export const useProfileInfo = () => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [basicProfile, setBasicProfile] = useState<ProfileItem[]>([]);
  const [healthProfile, setHealthProfile] = useState<ProfileItem[]>([]);
  const { language } = useSettings();

  useEffect(() => {
    if (!user) return;
    setBasicProfile([
      {
        label: t('profile.name'),
        value: `${user.fname} ${user.lname}`
      },
      {
        label: t('profile.displayName'),
        value: user.dname
      },
      {
        label: t('profile.birthGender'),
        value: user.gender
      },
      {
        label: t('profile.birthDate'),
        value: getFormattedDate(new Date(user.bday), language)
      },
      {
        label: t('profile.phoneNumber'),
        value: user.phone ?? ''
      }
    ]);
    setHealthProfile([
      {
        label: t('profile.healthIssues'),
        value: user.healthCondition ?? ''
      },
      {
        label: t('profile.personalMedicine'),
        value: user.personalMedication ?? ''
      },
      {
        label: t('profile.allergens'),
        value: user.allergy ?? ''
      },
      {
        label: t('profile.previousVaccinations'),
        value: user.vaccine ?? ''
      },
      {
        label: t('profile.bloodType'),
        value: user.bloodType ?? 'N/A'
      }
    ]);
  }, [user]);

  return { basicProfile, healthProfile };
};
