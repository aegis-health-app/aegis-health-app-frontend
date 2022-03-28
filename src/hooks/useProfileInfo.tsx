import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../contexts/UserContext';
import { Caretaker, Elderly } from '../dto/modules/user.dto';
import { ProfileItem } from '../interfaces/User';
import { getFormattedDate } from '../utils/getFormattedDate';
import { useSettings } from './useSettings';

export const useProfileInfo = (profile: Elderly | Caretaker | undefined) => {
  const { t } = useTranslation();
  const { user } = useContext(UserContext);
  const [basicProfile, setBasicProfile] = useState<ProfileItem[]>([]);
  const [healthProfile, setHealthProfile] = useState<ProfileItem[]>([]);
  const [elderlyBasicProfile, setElderlyBasicProfile] = useState<ProfileItem[]>(
    []
  );
  const [elderlyHealthProfile, setElderlyHealthProfile] = useState<
    ProfileItem[]
  >([]);
  const [caretakerBasicProfile, setCaretakerBasicProfile] = useState<
    ProfileItem[]
  >([]);
  const [caretakerHealthProfile, setCaretakerHealthProfile] = useState<
    ProfileItem[]
  >([]);

  const { language } = useSettings();

  useEffect(() => {
    if (!user) return;
    const currentPorfile = profile ?? user;

    const basic = [
      {
        label: t('profile.name'),
        value: `${currentPorfile.fname} ${currentPorfile.lname}`
      },
      {
        label: t('profile.displayName'),
        value: currentPorfile.dname
      },
      {
        label: t('profile.birthGender'),
        value: currentPorfile.gender
      },
      {
        label: t('profile.birthDate'),
        value: getFormattedDate(new Date(currentPorfile.bday), language)
      },
      {
        label: t('profile.phoneNumber'),
        value: currentPorfile.phone ?? ''
      }
    ];
    const health = [
      {
        label: t('profile.healthIssues'),
        value: currentPorfile.healthCondition ?? ''
      },
      {
        label: t('profile.personalMedicine'),
        value: currentPorfile.personalMedication ?? ''
      },
      {
        label: t('profile.allergens'),
        value: currentPorfile.allergy ?? ''
      },
      {
        label: t('profile.previousVaccinations'),
        value: currentPorfile.vaccine ?? ''
      },
      {
        label: t('profile.bloodType'),
        value: currentPorfile.bloodType ?? 'N/A'
      }
    ];

    // user is caretaker, show elderly's profile in TakeCareElderlyScreen
    if (profile && !user.isElderly) {
      setElderlyBasicProfile(basic);
      setElderlyHealthProfile(health);
      return;
    }
    // user is elderly, show caretaker profile in ManageCaretakerScreen
    if (profile && user.isElderly) {
      setCaretakerBasicProfile(basic);
      setCaretakerHealthProfile(health);
      return;
    }
    setBasicProfile(basic);
    setHealthProfile(health);
  }, [user, profile]);

  return {
    basicProfile,
    healthProfile,
    elderlyBasicProfile,
    elderlyHealthProfile,
    caretakerBasicProfile,
    caretakerHealthProfile
  };
};
