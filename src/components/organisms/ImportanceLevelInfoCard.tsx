import { AlertDialog, Button, Text, View, WarningIcon } from 'native-base';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

const ImportanceLevelInfoCard = ({
  dialogOpen,
  setDialogOpen
}: {
  dialogOpen: boolean;
  setDialogOpen: (dialogOpen: boolean) => void;
}) => {
  const { t } = useTranslation();
  const cancelRef = useRef(null);

  const importanceLevelInfos = [
    {
      title: 'Low Priority',
      icon: '--',
      descriptions: [
        'Alert at the selected time',
        'No notification repeatition'
      ]
    },
    {
      title: 'Medium Priority',
      icon: '!',
      descriptions: [
        'Alert at the selected time',
        'Repeat notification 3 times with 10 minutes interval'
      ]
    },
    {
      title: 'High Priority',
      icon: '!!!',
      descriptions: [
        'Alert at the selected time',
        'Repeat with 10 minutes interval until marked as complete'
      ]
    }
  ];
  const InfoCard = ({
    title,
    icon,
    descriptions
  }: {
    title: string;
    icon: string;
    descriptions: string[];
  }) => {
    return (
      <View style={styles.infoCardContainer}>
        <View style={styles.itemRow}>
          <Text
            fontSize="xl"
            fontWeight={'bold'}
            style={[styles.iconContainer, { color: 'orange' }]}>
            {icon}
          </Text>
          <Text fontSize="lg" fontWeight={'bold'}>
            {title}
          </Text>
        </View>

        {descriptions.map((description) => {
          return (
            <View style={styles.itemRow} key={`${title}-${description}`}>
              <Text> - </Text>
              <Text>{description}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <AlertDialog
      leastDestructiveRef={cancelRef}
      isOpen={dialogOpen}
      onClose={() => setDialogOpen(!dialogOpen)}>
      <AlertDialog.Content style={styles.container}>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>{t('reminder.importanceLevel')}</AlertDialog.Header>
        <AlertDialog.Body>
          {importanceLevelInfos.map((importanceLevelInfo) => {
            return (
              <InfoCard
                key={importanceLevelInfo.title}
                title={importanceLevelInfo.title}
                icon={importanceLevelInfo.icon}
                descriptions={importanceLevelInfo.descriptions}
              />
            );
          })}
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button
              colorScheme="orange"
              onPress={() => setDialogOpen(false)}
              ref={cancelRef}>
              {t('reminder.cancel')}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default ImportanceLevelInfoCard;

const styles = StyleSheet.create({
  container: {
    minHeight: 300,
    minWidth: '90%'
  },
  infoCardContainer: {
    marginVertical: 8,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '85%'
  },
  iconContainer: {
    width: 30
  }
});
