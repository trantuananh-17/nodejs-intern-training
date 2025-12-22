import React, {createContext, useContext, useState} from 'react';
import PropTypes from 'prop-types';

const defaultSettingForm = {
  position: 'bottom-left',
  hideTimeAgo: false,
  truncateProductName: true,
  replayPlaylist: false,
  continueAfterPageReload: false,
  displayDuration: 0,
  firstDelay: 0,
  popsInterval: 0,
  maxPopsDisplay: 0,
  allowShow: 'all-pages',
  includedUrls: '',
  excludedUrls: '',
  shopId: '',
  shopifyDomain: ''
};

const SettingFormContext = createContext({
  settingForm: defaultSettingForm,
  updateSetting: () => {}
});

export const SettingFormProvider = ({children}) => {
  const [settingForm, setSettingForm] = useState(defaultSettingForm);

  const updateSetting = (key, value) => {
    setSettingForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <SettingFormContext.Provider
      value={{
        settingForm,
        setSettingForm,
        updateSetting
      }}
    >
      {children}
    </SettingFormContext.Provider>
  );
};

export const useSettingFormContext = () => useContext(SettingFormContext);

SettingFormProvider.propTypes = {
  children: PropTypes.node
};
