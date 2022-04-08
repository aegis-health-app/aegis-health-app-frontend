import React, { useState } from 'react';

import { createContext } from 'react';

export interface TourguideContextStruct {
  showSettingsTourguide: boolean;
  setShowSettingsTourguide: (value: boolean) => void;
  showElderlyHomeTourguide: boolean;
  setElderlyshowElderlyHomeTourguide: (value: boolean) => void;
  showCaretakerHomeTourguide: boolean;
  setShowCaretakerHomeTourguide: (value: boolean) => void;
  showElderlyLinkTourguide: boolean;
  setShowElderlyLinkTourguide: (value: boolean) => void;
  showHealthRecordingsTourguide: boolean;
  setShowHealthRecordingsTourguide: (value: boolean) => void;
}

export const TourguideContext = createContext({} as TourguideContextStruct);

const TourguideContextProvider = ({ ...props }) => {
  const [showSettingsTourguide, setShowSettingsTourguide] = useState(false);
  const [showElderlyHomeTourguide, setElderlyshowElderlyHomeTourguide] =
    useState(false);
  const [showCaretakerHomeTourguide, setShowCaretakerHomeTourguide] =
    useState(false);
  const [showElderlyLinkTourguide, setShowElderlyLinkTourguide] =
    useState(false);
  const [showHealthRecordingsTourguide, setShowHealthRecordingsTourguide] =
    useState(false);

  const value = {
    showSettingsTourguide,
    setShowSettingsTourguide,
    showElderlyHomeTourguide,
    setElderlyshowElderlyHomeTourguide,
    showCaretakerHomeTourguide,
    setShowCaretakerHomeTourguide,
    showElderlyLinkTourguide,
    setShowElderlyLinkTourguide,
    showHealthRecordingsTourguide,
    setShowHealthRecordingsTourguide
  };
  return <TourguideContext.Provider value={value} {...props} />;
};

export default TourguideContextProvider;
