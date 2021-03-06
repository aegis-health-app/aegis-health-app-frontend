import { Platform, Linking, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import { t } from 'i18next';
import { usePermission } from './usePermission';

export interface Geolocation {
  latitude: number;
  longtitude: number;
}

export const useGeolocation = () => {
  const { requestLocationPermission } = usePermission();
  const openMapApp: (location: Geolocation) => void = ({
    latitude,
    longtitude
  }) => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q='
    });
    const latLng = `${latitude},${longtitude}`;
    const label = t('emergency.emergencyLocation');
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`
    }) as string;

    Linking.openURL(url);
  };

  const getCurrentLocation = async (successFunction) => {
    const granted = await requestLocationPermission();
    let coords;
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Geolocation.getCurrentPosition(
        async (position) => {
          coords = position.coords;
          const { latitude, longitude: longtitude } = coords;
          const result = await successFunction({ latitude, longtitude });
          return result;
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else return coords;
  };

  const initGeocoding = (language = 'en') => {
    Geocoder.init(process.env.GOOGLE_MAPS_API_KEY ?? '', { language });
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    const address = await Geocoder.from({
      lat,
      lng
    });

    return address.plus_code.compound_code;
  };

  return { openMapApp, getCurrentLocation, initGeocoding, reverseGeocode };
};
