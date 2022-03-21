import { ImageSourcePropType } from 'react-native';
import i18n from '../../internationalization/i18n.config';

export interface OnBoardingSLide {
  page: number;
  title: string;
  desc: string;
  image: ImageSourcePropType;
}

export const onBoardingSlides: OnBoardingSLide[] = [
  {
    page: 1,
    title: i18n.t('109'),
    desc: i18n.t('110'),
    image: require('../../assets/images/landing/1.png')
  },
  {
    page: 2,
    title: i18n.t('93'),
    desc: i18n.t('94'),
    image: require('../../assets/images/landing/2.png')
  },
  {
    page: 3,
    title: i18n.t('95'),
    desc: i18n.t('96'),
    image: require('../../assets/images/landing/3.png')
  },
  {
    page: 4,
    title: i18n.t('97'),
    desc: i18n.t('98'),
    image: require('../../assets/images/landing/4.png')
  },
  {
    page: 5,
    title: i18n.t('99'),
    desc: i18n.t('100'),
    image: require('../../assets/images/landing/5.png')
  },
  {
    page: 6,
    title: i18n.t('101'),
    desc: i18n.t('102'),
    image: require('../../assets/images/landing/6.png')
  },
  {
    page: 7,
    title: i18n.t('103'),
    desc: i18n.t('104'),
    image: require('../../assets/images/landing/7.png')
  },
  {
    page: 8,
    title: i18n.t('105'),
    desc: i18n.t('106'),
    image: require('../../assets/images/landing/8.png')
  }
];
