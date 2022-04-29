import { AlertDialog, Button, Text, View } from 'native-base';
import React, { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { RecurringInterval, RecursionPeriod } from '../../dto/modules/reminder.dto';
import DropDownSelect from '../atoms/DropDownSelect';
import Spacer from '../atoms/Spacer';

const CustomRecurringModal = ({
  dialogOpen = false,
  setDialogOpen,
  defaultRepetition,
  setRepetition,
  repeatsEvery,
  setRepeatsEvery,
  repeatsOnWeekday = [],
  setRepeatsOnWeekday,
  repeatsOnDate = 1,
  setRepeatsOnDate
}: {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  defaultRepetition: RecurringInterval;
  setRepetition: (repetition: RecurringInterval) => void;
  repeatsEvery: RecursionPeriod;
  setRepeatsEvery: (repeatsEvery: RecursionPeriod) => void;
  repeatsOnWeekday: number[];
  setRepeatsOnWeekday: (repeatsOnWeekday: number[]) => void;
  repeatsOnDate: number;
  setRepeatsOnDate: (repeatsOnDate: number) => void;
}) => {
  const { t } = useTranslation();
  const cancelRef = useRef(null);

  const [errorLog, setErrorLog] = useState('');
  const repeatEveryList = [
    { value: RecursionPeriod.WEEK, label: 'Week' },
    { value: RecursionPeriod.MONTH, label: 'Month' }
  ];

  const dateList = [...Array(31).keys()].map((x) => {
    const num = (++x);
    return {
      label: num.toString(),
      value: num,
    };
  });

  const weekdayList = [
    { value: 7, label: t('reminderRepetitionPattern.sa') },
    { value: 1, label: t('reminderRepetitionPattern.mo') },
    { value: 2, label: t('reminderRepetitionPattern.tu') },
    { value: 3, label: t('reminderRepetitionPattern.we') },
    { value: 4, label: t('reminderRepetitionPattern.th') },
    { value: 5, label: t('reminderRepetitionPattern.fr') },
    { value: 6, label: t('reminderRepetitionPattern.su') }
  ];

  const DateDisplay = () => {
    return (
      <View style={styles.spacer}>
        <Text fontSize={16} mb={2}>
          {t('reminderRepetitionPattern.date')}
        </Text>
        <DropDownSelect
          value={repeatsOnDate}
          items={dateList}
          setValue={setRepeatsOnDate}
          maxHeight={120}
        />
      </View>
    );
  };

  const onWeekdayButtonPressed = useCallback(
    (weekday) => {
      if (repeatsOnWeekday.includes(weekday))
        setRepeatsOnWeekday(repeatsOnWeekday.filter((e) => e !== weekday));
      else setRepeatsOnWeekday([...repeatsOnWeekday, weekday]);
    },
    [setRepeatsOnWeekday, repeatsOnWeekday]
  );

  const onOkButtonPressed = useCallback(() => {
    if (repeatsEvery === RecursionPeriod.WEEK) {
      if (!repeatsOnWeekday.length || !repeatsOnWeekday) {
        setErrorLog('Please choose a week day');
        return;
      }
      const response = {
        repeatEvery: 'week',
        repeatsOn: repeatsOnWeekday
      };
      setDialogOpen(false)
      return;
    }
    if (repeatsEvery === RecursionPeriod.MONTH) {
      const response = {
        repeatEvery: 'month',
        repeatsOn: repeatsOnDate
      };
      setDialogOpen(false)
      return;
    }
  }, [repeatsEvery, repeatsOnDate, repeatsOnWeekday, setErrorLog]);

  const onCancelButtonPressed = useCallback(() => {
    setRepetition(defaultRepetition);
    setErrorLog('');
    setDialogOpen(false);
  }, [defaultRepetition, setRepetition, setErrorLog]);

  const WeekDisplay = useCallback(() => {
    return (
      <View style={styles.spacer}>
        <Text fontSize={16} mb={2}>
          {t('reminderRepetitionPattern.repeatsOn')}
        </Text>
        <View style={styles.itemRow}>
          {weekdayList.map((weekday) => {
            return (
              <TouchableOpacity
                key={weekday.value}
                style={[
                  styles.circularButton,
                  repeatsOnWeekday.includes(weekday.value)
                    ? styles.selectedButton
                    : styles.unselectedButton
                ]}
                onPress={() => onWeekdayButtonPressed(weekday.value)}>
                <Text
                  fontSize={16}
                  mb={2}
                  style={[
                    styles.buttonText,
                    repeatsOnWeekday.includes(weekday.value)
                      ? styles.selectedButtonText
                      : styles.unselectedButtonText
                  ]}>
                  {/* {t('reminderRepetitionPattern.repeatsEvery')} */}
                  {weekday.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <Text style={styles.errorText}>{errorLog}</Text>
      </View>
    );
  }, [repeatsOnWeekday, errorLog]);

  const RepeatEveryDisplay = useCallback(() => {
    return (
      <View>
        <Text fontSize={16} mb={2}>
          {t('reminderRepetitionPattern.repeatsEvery')}
        </Text>
        <DropDownSelect
          value={repeatsEvery}
          defaultValue={RecursionPeriod.WEEK}
          items={repeatEveryList}
          setValue={setRepeatsEvery}
          zIndex={5100}
        />
      </View>
    );
  }, [repeatsEvery, setRepeatsEvery]);

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={dialogOpen}
      onClose={() => setDialogOpen(!dialogOpen)}>
      <AlertDialog.Content style={styles.container}>
        {/* <AlertDialog.CloseButton /> */}
        <AlertDialog.Header>
          {t('reminderRepetitionPattern.customRecurringSetting')}
        </AlertDialog.Header>
        <AlertDialog.Body>
          {/* {t('reminder.deleteConfirmationDesc')} */}
          <RepeatEveryDisplay />
          <Spacer />
          {repeatsEvery === RecursionPeriod.WEEK ? <WeekDisplay /> : <DateDisplay />}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              onPress={onCancelButtonPressed}
              ref={cancelRef}>
              {t('reminder.cancel')}
            </Button>
            <Button
              // onPress={handlePressRemove}
              variant="ghost"
              onPress={onOkButtonPressed}
              ref={cancelRef}>
              {t('reminder.ok')}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default CustomRecurringModal;

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    minWidth: '90%'
  },
  spacer: {
    minHeight: 200
  },
  circularButton: {
    height: 40,
    width: 40,
    margin: 2,
    borderRadius: 20,
    borderColor: 'transparent',
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: 'blue'
  },
  unselectedButton: {
    backgroundColor: 'lightgrey'
  },
  buttonText: {
    height: 40,
    width: 40,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  selectedButtonText: {
    color: 'white'
  },
  unselectedButtonText: {
    color: 'grey'
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  errorText: {
    color: 'red',
    marginVertical: 10
  }
});
