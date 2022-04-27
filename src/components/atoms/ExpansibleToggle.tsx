import { ChevronDownIcon, ChevronUpIcon, Text, View } from 'native-base';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager
} from 'react-native';
import Divider from './Divider';

const ExpansibleToggle = ({
  title,
  expand,
  divider,
  children
}: {
  title: string;
  expand?: boolean;
  divider?: boolean;
  children?: JSX.Element | JSX.Element[];
}) => {
  const [expandFields, setExpandFields] = useState<boolean>(expand || false);
  const changeLayout = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandFields(!expandFields);
  };

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => changeLayout()}
        style={{ ...styles.itemRow, paddingTop: 20 }}>
        <Text fontSize={18} fontWeight="bold" mb={2}>
          {title}
        </Text>
        {expandFields ? (
          <ChevronUpIcon name="chevron-up" size="9" />
        ) : (
          <ChevronDownIcon name="chevron-down" size="9" />
        )}
      </TouchableOpacity>
      {divider && <Divider mt={0} />}
      <View
        style={{
          height: expandFields ? undefined : 0,
          overflow: 'hidden'
        }}>
        {children}
      </View>
    </View>
  );
};

export default ExpansibleToggle;

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  itemRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  expansionBtn: {
    paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%'
  }
});
