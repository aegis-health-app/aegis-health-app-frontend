import { StyleSheet } from 'react-native';
import { Text, View, Button, AlertDialog } from 'native-base';
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ModuleId } from '../../dto/modules/modules.dto';
import { postRemovedModule, postAddModule } from '../../utils/module/manage';
import { ElderlyContext } from '../../contexts/ElderlyContext';
import {
  getModuleIsAddedValue,
  addEmergencyAndManageToModuleIds
} from './../../utils/module/manage';

type ManageModuleCardProps = {
  icon: Element;
  moduleId: ModuleId;
  title: string;
  description: string;
  isAdded?: boolean;
  comingSoon?: boolean;
};

/**
 *
 * @param icon - native-base icon
 * @param title - module title
 * @param description - module description
 * @param isAdded - determiner if the user already have this module on
 * @param comingSoon - (optional, if isAdded field is undefined) readiness of the module
 * Card for ManageModule screen.
 */
const ManageModuleCard = ({
  icon,
  moduleId,
  title,
  description,
  comingSoon
}: ManageModuleCardProps) => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef(null);
  const { elderlyProfile, setElderlyProfile } = useContext(ElderlyContext);

  const [isAdded, setIsAdded] = useState(false);
  useEffect(() => {
    if (elderlyProfile?.listModuleid) {
      const result = getModuleIsAddedValue(
        moduleId,
        elderlyProfile.listModuleid
      );
      setIsAdded(result);
    }
  }, [elderlyProfile]);

  function handlePressButton() {
    if (!isAdded) {
      setDialogOpen(true);
    }
  }

  async function handlePressAdd() {
    if (!elderlyProfile) return;

    try {
      const result = await postAddModule(moduleId);
      if (result) {
        const _result = addEmergencyAndManageToModuleIds(result);
        setElderlyProfile({ ...elderlyProfile, listModuleid: _result });
        //TODO: show toast
      }
    } catch (err) {
      // open alert if http request failed
    }
  }

  async function handlePressRemove() {
    setDialogOpen(false);
    if (!elderlyProfile) return;

    try {
      const result = await postRemovedModule(moduleId);
      if (result) {
        const _result = addEmergencyAndManageToModuleIds(result);
        setElderlyProfile({ ...elderlyProfile, listModuleid: _result });
      }
    } catch (err) {
      // open alert if http request failed
    }
  }

  return (
    <View style={styles.card} bgColor="white" p={4} mb={2} w="full">
      <Text>{JSON.stringify(elderlyProfile?.listModuleid)}</Text>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {t('moduleSelection.confirm')}
          </AlertDialog.Header>
          <AlertDialog.Body>
            {t('moduleSelection.removeConfirmationText')}
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                {t('moduleSelection.cancel')}
              </Button>
              <Button
                colorScheme="danger"
                onPress={handlePressRemove}
                ref={cancelRef}>
                {t('moduleSelection.remove')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <View flexDir="row">
        {icon}
        <View flex={1}>
          <Text fontWeight="600" fontSize="xl">
            {title}
          </Text>
          <Text>{description}</Text>
        </View>
      </View>
      <View mt={2}>
        {comingSoon ? (
          <Button variant="outline" colorScheme="muted">
            {t('moduleSelection.comingSoon')}
          </Button>
        ) : (
          <>
            {isAdded ? (
              <Button
                variant="outline"
                colorScheme="primary"
                onPress={handlePressAdd}>
                {t('moduleSelection.add')}
              </Button>
            ) : (
              <Button
                variant="outline"
                colorScheme="error"
                onPress={handlePressButton}>
                {t('moduleSelection.remove')}
              </Button>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default ManageModuleCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  }
});
