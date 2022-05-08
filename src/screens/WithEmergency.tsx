/* eslint-disable indent */
import {
  firebase,
  FirebaseMessagingTypes
} from '@react-native-firebase/messaging';
import moment from 'moment';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { mockEmergencyInfo } from '../components/molecules/EmergencyAlertCard';
import EmergencyAlert from '../components/organisms/EmergencyAlert';
import ReminderAlert from '../components/organisms/ReminderAlert';
import { NotificationType } from '../constants/NotificationType';
import { UserContext } from '../contexts/UserContext';
import { determineMessageType, ReminderNoti } from '../utils/user/notification';
import { EmergencyInfo } from './EmergencyInfoScreen';

const withEmergency =
  (WrappedComponent) =>
  ({ ...props }) => {
    const [showEmergencyAlert, setShowEmergencyAlert] =
      useState<boolean>(false);
    const [emergencyInfo, setEmergencyInfo] =
      useState<EmergencyInfo>(mockEmergencyInfo);
    const [showReminderAlert, setShowReminderAlert] = useState<boolean>(false);
    const [reminderAlertInfo, setReminderAlertInfo] = useState<ReminderNoti>();

    const { isElderly } = useContext(UserContext);

    const displayNotification = useCallback(
      (message: FirebaseMessagingTypes.RemoteMessage) => {
        const { data } = message;
        const type = determineMessageType(data);

        if (type === NotificationType.EMERGENCY && !isElderly) {
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
        } else if (type === NotificationType.REMINDER && data) {
          const { title, note, isDone, startingDateTime, user, rid, eid } =
            data;

          setReminderAlertInfo({
            title,
            note,
            isDone: isDone === 'true',
            startingDateTime: startingDateTime,
            user,
            rid,
            eid
          });
          setShowReminderAlert(true);
        }
      },
      [
        setEmergencyInfo,
        setShowEmergencyAlert,
        setShowReminderAlert,
        setReminderAlertInfo
      ]
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
        {reminderAlertInfo && (
          <ReminderAlert
            isOpen={showReminderAlert}
            close={() => setShowReminderAlert(false)}
            reminderInfo={reminderAlertInfo}
          />
        )}
        <WrappedComponent {...props} />
      </>
    );
  };

export default withEmergency;
