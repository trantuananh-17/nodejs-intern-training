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
  shopifyDomain: '',
  isGradient: true,
  backgroundImage: '',
  actionColorStart: '#EEEEEEFF',
  actionColorEnd: '#FFFFFFFF',
  backgroundColor: '#FFFFFFFF',
  themeName: 'Basic',
  headingColor: '#000000FF',
  headerTextColor: '#18A5A7FF',
  timeColor: '#000000FF',
  theme: 'sp-basic',
  textColor: '#000000FF',
  hideBackgroundSelect: false
};

const SettingFormContext = createContext({
  settingForm: defaultSettingForm,
  updateSetting: () => {},
  updateSettings: () => {}
});

export const SettingFormProvider = ({children}) => {
  const [settingForm, setSettingForm] = useState(defaultSettingForm);

  const updateSetting = (key, value) => {
    setSettingForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateSettings = payload => {
    setSettingForm(prev => ({
      ...prev,
      ...payload
    }));
  };

  return (
    <SettingFormContext.Provider
      value={{
        settingForm,
        setSettingForm,
        updateSetting,
        updateSettings
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
