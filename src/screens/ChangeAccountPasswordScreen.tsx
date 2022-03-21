import { Text } from 'native-base';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Divider from '../components/atoms/Divider';

const ChangeAccountPasswordScreen = () => {
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View style={styles.pageContainer}>
        <View>
          <Text fontSize="2xl">Change password</Text>
        </View>
        <Divider my={1} />
        <View>
          <Text fontSize="xl">Change password</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChangeAccountPasswordScreen;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 16
  }
});
