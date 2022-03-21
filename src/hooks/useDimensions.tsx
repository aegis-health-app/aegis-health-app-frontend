import { Dimensions, StatusBar } from 'react-native';

const useDimensions = () => {
  const ScreenHeight =
    Dimensions.get('window').height - (StatusBar.currentHeight || 0);
  const ScreenWidth = Dimensions.get('window').width;

  return { ScreenHeight, ScreenWidth };
};

export default useDimensions;
