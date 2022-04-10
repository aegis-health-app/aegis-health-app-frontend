/* eslint-disable indent */
import {
  firebase,
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { mockEmergencyInfo } from '../components/molecules/EmergencyAlertCard';
import EmergencyAlert from '../components/organisms/EmergencyAlert';
import { EmergencyInfo } from './EmergencyInfoScreen';

const withEmergency =
  (WrappedComponent) =>
  ({ ...props }) => {
    const [showEmergencyAlert, setShowEmergencyAlert] =
      useState<boolean>(false);
    const [emergencyInfo, setEmergencyInfo] =
      useState<EmergencyInfo>(mockEmergencyInfo);

    const displayNotification = useCallback(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        const { data } = message;

        const emergencyPayload: EmergencyInfo = {
          address: data?.address ?? '',
          elderlyImageId: data?.elderlyImageId ?? '',
          name: data?.elderlyName ?? '',
          phone: data?.elderlyPhone ?? '',
          location: {
            latitude: parseFloat(data?.latitude ?? ''),
            longtitude: parseFloat(data?.longtitude ?? '')
          },
          date: moment(data?.timestamp).format('DD MMM YYYY') ?? '',
          time: moment(data?.timestamp).format('hh:mm:ss') ?? ''
        };

        setEmergencyInfo(emergencyPayload);
        setShowEmergencyAlert(true);
      },
      [setEmergencyInfo, setShowEmergencyAlert]
    );

    useEffect(() => {
      const unsubscribe = firebase
        .messaging()
        .onMessage(async (remoteMessage) => {
          displayNotification(remoteMessage);
        });

      return unsubscribe;
    }, []);

    return (
      <>
        <EmergencyAlert
          isOpen={showEmergencyAlert}
          close={() => setShowEmergencyAlert(false)}
          emergencyInfo={emergencyInfo}
        />
        <WrappedComponent {...props} />
      </>
    );
  };

export default withEmergency;
