import { Box, Spinner } from 'native-base';
import React from 'react';
import useDimensions from '../../hooks/useDimensions';

const SpinnerOverlay = ({ isOpen }) => {
  const { ScreenWidth } = useDimensions();

  return (
    <>
      {isOpen && (
        <Box
          h="full"
          w={ScreenWidth}
          zIndex={99999}
          position="absolute"
          backgroundColor="rgba(100,100,100,0.5)"
          backgroundBlendMode="overlay"
          justifyContent="center">
          <Spinner accessibilityLabel="Loading" size={ScreenWidth * 0.7} />
        </Box>
      )}
    </>
  );
};

export default SpinnerOverlay;
