import { Platform, Linking, PermissionsAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { requestLocationPermission } from './permission';

export interface Geolocation {
  latitude: number;
  longtitude: number;
}

export const openMapApp: (location: Geolocation) => void = ({
  latitude,
  longtitude
}) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longtitude}`;
  const label = 'Emergency Location';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`
  }) as string;

  Linking.openURL(url);
};

export const getCurrentLocation = async () => {
  console.log(
    'location permission',
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )
  );
  const granted = await requestLocationPermission();
  if (granted === PermissionsAndroid.RESULTS.GRANTED)
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};
