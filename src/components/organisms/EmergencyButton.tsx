import React from 'react';
import { Button, Center, Container, Text } from 'native-base';
import useDimensions from '../../hooks/useDimensions';

const EmergencyButton = ({ isEmergency, setEmergency }) => {
  const { ScreenWidth } = useDimensions();

  return (
    <Center>
      <Container
        borderRadius={999}
        background="red.300"
        p={4}
        width={ScreenWidth * 0.8}
        height={ScreenWidth * 0.8}>
        <Center>
          <Container
            borderRadius={999}
            background="red.400"
            p={4}
            minWidth={ScreenWidth * 0.8 - 32}
            height={ScreenWidth * 0.8 - 32}>
            <Button
              onPress={() => setEmergency(true)}
              background={'red.600'}
              isDisabled={isEmergency}
              _disabled={{ background: 'white', opacity: 100 }}
              _hover={{ background: 'red.500' }}
              _pressed={{ background: 'red.500' }}
              borderRadius={999}
              minWidth={ScreenWidth * 0.8 - 64}
              height={ScreenWidth * 0.8 - 64}>
              <Text fontSize="8xl" color={isEmergency ? 'red.600' : 'white'}>
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
