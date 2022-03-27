import React, { useContext } from 'react';
import { Box, Button, AlertDialog, Text } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { client } from '../../config/axiosConfig';
import { UserContext } from '../../contexts/UserContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type remButtonProps = {
  fname: string;
  lname: string;
  cid: string;
};

const RemButton = ({ fname, lname, cid }: remButtonProps) => {

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    
  const { t } = useTranslation();

  const [dialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef(null);

  function handlePressButton() {
    setDialogOpen(true);
  }

  const { user } = useContext(UserContext);

  async function handlePressDelete() {
    //TODO: error handling
    await client
      .delete('/user/relationship', { data: { eid: user?.uid, cid: cid } }).then(() => navigation.navigate('UserLinkScreen'))
      .catch((err) => {
        console.log({ err });
      });
    setDialogOpen(false);
  }

  return (
    <Box alignItems="center" margin="1">
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(!dialogOpen)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            {t('userLink.removeCaretaker')}
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>
              {t('userLink.removeAlertBody1')}
              {fname} {lname}
              {t('userLink.removeAlertBody2')}
            </Text>
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="muted"
                onPress={() => setDialogOpen(false)}
                ref={cancelRef}>
                {t('setting.cancel')}
              </Button>
              <Button
                colorScheme="danger"
                onPress={handlePressDelete}
                ref={cancelRef}>
                {t('misc.remove')}
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Button
        width="92%"
        size="md"
        borderWidth="1"
        borderColor="#F97316"
        backgroundColor="#FAFAFA"
        _text={{ color: '#F97316' }}
        _pressed={{
          borderColor: '#F94000',
          _text: { color: '#F94000' }
        }}
        onPress={() => handlePressButton()}>
        {t('userLink.removeCaretaker')}
      </Button>
    </Box>
  );
};

export default RemButton;
