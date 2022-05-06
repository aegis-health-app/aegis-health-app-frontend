import React, { useMemo } from 'react';
import { Button, Center, Container, Text } from 'native-base';
import useDimensions from '../../hooks/useDimensions';

const EmergencyButton = ({ isEmergency, reportEmergency }) => {
  const { ScreenWidth } = useDimensions();

  const buttonSize = useMemo(() => ScreenWidth * 0.7, [ScreenWidth]);

  return (
    <Center>
      <Container
        borderRadius={999}
        background="red.300"
        p={4}
        width={buttonSize}
        height={buttonSize}>
        <Center>
          <Container
            borderRadius={999}
            background="red.400"
            p={4}
            minWidth={buttonSize - 32}
            height={buttonSize - 32}>
            <Button
              onPress={() => reportEmergency()}
              background={'red.600'}
              isDisabled={isEmergency}
              _disabled={{ background: 'white', opacity: 100 }}
              _hover={{ background: 'red.500' }}
              _pressed={{ background: 'red.500' }}
              borderRadius={999}
              minWidth={buttonSize - 64}
              height={buttonSize - 64}>
              <Text
                fontSize={ScreenWidth * 0.2}
                color={isEmergency ? 'red.600' : 'white'}>
                SOS
              </Text>
            </Button>
          </Container>
        </Center>
      </Container>
    </Center>
  );
};

export default EmergencyButton;
