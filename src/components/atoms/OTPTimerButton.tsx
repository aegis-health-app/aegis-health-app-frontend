import React, { useEffect, useState } from 'react';
import { Button } from 'native-base';
import { useTranslation } from 'react-i18next';

type OTPTimerButtonProps = {
  onPress: () => void;
};

const OTPTimerButton = ({ onPress }: OTPTimerButtonProps) => {
  // timer copied from Linkedin -----
  const [basis, setBasis] = useState<number>();
  const [timer, setTimer] = useState<number>();
  const [timerDisp, setTimerDisp] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<number>(0);
  const { t } = useTranslation();

  useEffect(() => {
    let _intervalId;
    if (basis)
      _intervalId = setInterval(() => {
        setTimer(new Date().valueOf());
      }, 100);
    setIntervalId(_intervalId);
    return () => {
      clearInterval(_intervalId);
    };
  }, [basis]);

  useEffect(() => {
    if (basis && timer) {
      const toDisp = Math.floor((basis - timer) / 1000);
      if (timerDisp !== toDisp) {
        setTimerDisp(toDisp);
      }
    }
  }, [timer]);

  useEffect(() => {
    if (timerDisp <= 0) {
      clearInterval(intervalId);
      setTimerDisp(0);
    }
  }, [timerDisp]);
  // ----------

  if (timerDisp === 0) {
    return (
      <Button
        w="full"
        onPress={() => {
          onPress();
          const time = new Date();
          time.setSeconds(time.getSeconds() + 60);
          setBasis(time.valueOf());
        }}>
        {t('general.resendOTP')}
      </Button>
    );
  } else {
    return (
      <Button w="full" isDisabled>
        {`${t('general.resendOTP')} 0:${
          timerDisp < 10 ? '0' : ''
        }${timerDisp} วินาที`}
      </Button>
    );
  }
};

export default OTPTimerButton;
