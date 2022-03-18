import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Switch, Text } from 'native-base';
import Divider from '../components/atoms/Divider';
import Spacer from '../components/atoms/Spacer';
import { LANGUAGES, useSettings } from '../hooks/useSettings';

const SettingScreen = () => {
  const { language, changeLanguage, isSoundEffectOn, setIsSoundEffectOn } =
    useSettings();

  return (
    <View style={styles.pageContainer}>
      <Text fontSize="2xl" fontWeight="700">
        Settings
      </Text>
      <Spacer />
      <Text fontSize="lg" fontWeight="500" mb={0}>
        App Settings
      </Text>
      <Divider my={1} />
      <Spacer />
      <View style={styles.settingsItemRow}>
        <View>
          <Text fontSize="md">Language</Text>
        </View>
        <View style={styles.toggleButtonsContainer}>
          <Button
            variant={language === LANGUAGES.THAI ? 'solid' : 'outline'}
            onPress={() => changeLanguage(LANGUAGES.THAI)}>
            ไทย
          </Button>
          <Spacer h={0} />
          <Button
            variant={language === LANGUAGES.ENGLISH ? 'solid' : 'outline'}
            onPress={() => changeLanguage(LANGUAGES.ENGLISH)}>
            English
          </Button>
        </View>
      </View>
      <Spacer />
      <View style={styles.settingsItemRow}>
        <View>
          <Text fontSize="md">Sound Effect</Text>
        </View>
        <View>
          <Switch
            size="sm"
            isChecked={isSoundEffectOn}
            onToggle={() => setIsSoundEffectOn(!isSoundEffectOn)}
          />
        </View>
      </View>
      <Spacer h={32} />
      <Text fontSize="lg" fontWeight="500" mb={0}>
        Account Settings
      </Text>

      <Divider my={1} />
      <Spacer />
      <View style={styles.settingsItemRow}>
        <Button
          size="lg"
          variant="link"
          padding={0}
          colorScheme="secondary"
          fontWeight={900}>
          Change Account Password
        </Button>
      </View>
      <Spacer />
      <View style={styles.settingsItemRow}>
        <Button
          size="lg"
          variant="link"
          padding={0}
          colorScheme="secondary"
          fontWeight={900}>
          Change Phone Number
        </Button>
      </View>
      <Spacer />
      <Button size="lg" variant="outline" colorScheme="secondary">
        Sign Out
      </Button>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  },
  settingsItemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  toggleButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    minWidth: 80
  }
});
