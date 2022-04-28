import { weekdays } from 'moment';
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
  defaultRepeatition,
  setRepeatition,
  repeatsEvery,
  setRepeatsEvery,
  repeatsOnWeekday = [],
  setRepeatsOnWeekday,
  repeatsOnDate = 1,
  setRepeatsOnDate
}: {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
  defaultRepeatition: RecurringInterval;
  setRepeatition: (repeatition: RecurringInterval) => void;
  repeatsEvery: RecursionPeriod;
  setRepeatsEvery: (repeatsEvery: RecursionPeriod) => void;
  repeatsOnWeekday: number[];
  setRepeatsOnWeekday: (repeatsOnWeekday: number[]) => void;
  repeatsOnDate: number;
  setRepeatsOnDate: (repeatsOnDate: number) => void;
}) => {
  const { t } = useTranslation();
  const cancelRef = useRef(null);
  console.log(repeatsEvery)

  // const [repeatEvery, setRepeatEvery] = useState<string>('week');
  // const [repeatsOnWeekday, setRepeatsOnWeekday] = useState<string[]>([]);
  // const [repeatsOnDate, setRepeatsOnDate] = useState<string>('1');
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
    { value: 7, label: t('reminderRepeatitionPattern.sa') },
    { value: 1, label: t('reminderRepeatitionPattern.mo') },
    { value: 2, label: t('reminderRepeatitionPattern.tu') },
    { value: 3, label: t('reminderRepeatitionPattern.we') },
    { value: 4, label: t('reminderRepeatitionPattern.th') },
    { value: 5, label: t('reminderRepeatitionPattern.fr') },
    { value: 6, label: t('reminderRepeatitionPattern.su') }
  ];

  const DateDisplay = () => {
    console.log('rerender date');
    return (
      <View style={styles.spacer}>
        <Text fontSize={16} mb={2}>
          {t('reminderRepeatitionPattern.date')}
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
      console.log(weekday, 'pressed');
      if (repeatsOnWeekday.includes(weekday))
        setRepeatsOnWeekday(repeatsOnWeekday.filter((e) => e !== weekday));
      else setRepeatsOnWeekday([...repeatsOnWeekday, weekday]);
    },
    [setRepeatsOnWeekday, repeatsOnWeekday]
  );

  const onOkButtonPressed = useCallback(() => {
    if (repeatsEvery === RecursionPeriod.WEEK) {
      if (!repeatsOnWeekday.length || !repeatsOnWeekday) {
        console.log('yes');
        setErrorLog('Please choose a week day');
        return;
      }
      const response = {
        repeatEvery: 'week',
        repeatsOn: repeatsOnWeekday
      };
      console.log(response);
      setDialogOpen(false)
      return;
    }
    if (repeatsEvery === RecursionPeriod.MONTH) {
      const response = {
        repeatEvery: 'month',
        repeatsOn: repeatsOnDate
      };
      console.log(response);
      setDialogOpen(false)
      return;
    }
  }, [repeatsEvery, repeatsOnDate, repeatsOnWeekday, setErrorLog]);

  const onCancelButtonPressed = useCallback(() => {
    setRepeatition(defaultRepeatition);
    setErrorLog('');
    setDialogOpen(false);
  }, [defaultRepeatition, setRepeatition, setErrorLog]);

  const WeekDisplay = useCallback(() => {
    console.log('rerender repeats on');
    return (
      <View style={styles.spacer}>
        <Text fontSize={16} mb={2}>
          {t('reminderRepeatitionPattern.repeatsOn')}
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
                  {/* {t('reminderRepeatitionPattern.repeatsEvery')} */}
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
    console.log('rerender repeat every');
    return (
      <View>
        <Text fontSize={16} mb={2}>
          {t('reminderRepeatitionPattern.repeatsEvery')}
        </Text>
        <DropDownSelect
          value={repeatsEvery}
          defaultValue="week"
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
          {t('reminderRepeatitionPattern.customRecurringSetting')}
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
