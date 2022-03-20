import React, { useState } from 'react';

import { createContext } from 'react';

export interface TourguideContextStruct {
  showSettingsTourguide: boolean;
  setShowSettingsTourguide: (value: boolean) => void;
}

export const TourguideContext = createContext({} as TourguideContextStruct);

const TourguideContextProvider = ({ ...props }) => {
  const [showSettingsTourguide, setShowSettingsTourguide] = useState(false);

  const value = {
    showSettingsTourguide,
    setShowSettingsTourguide
  };
  return <TourguideContext.Provider value={value} {...props} />;
};

export default TourguideContextProvider;
