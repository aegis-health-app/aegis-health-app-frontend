import React from 'react';
import ModuleAlertCard from '../molecules/ModuleAlertCard';

const UpComingAlert = () => {
  return (
    <ModuleAlertCard
      moduleName="Lorem Ipsum"
      title="Lorem Ipsum"
      description="Lorem Ipsum"
      time={new Date()}
    />
  );
};

export default UpComingAlert;
