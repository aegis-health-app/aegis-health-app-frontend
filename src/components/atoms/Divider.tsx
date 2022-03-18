import { View } from 'native-base';
import React from 'react';

const Divider = () => {
  return (
    <View flexDir="row" justifyContent="center">
    <View backgroundColor="muted.300" my={4} w="90%" style={{ height: 1 }} />
    </View>
  );
};

export default Divider;
