import React from 'react';
import { Box, Button } from 'native-base';
import { useTranslation } from 'react-i18next';

const RemButton = () => {
  const { t } = useTranslation();

  return (
    <Box alignItems="center" margin="1">
      <Button
        colorScheme="danger"
        width="92%"
        size="md"
        variant="outline"
        onPress={() => console.log('hello world')}>
        {t('101')}
      </Button>
    </Box>
  );
};

export default RemButton;
