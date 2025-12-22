import {FormLayout, Select} from '@shopify/polaris';
import React from 'react';
import FormInputSettingTriggers from '../FormInput/FormInputSettingTriggers';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';

const options = [
  {label: 'All Pages', value: 'all-pages'},
  {label: 'Specific pages', value: 'specific-pages'}
];

export default function TabSettingTriggers() {
  const {settingForm, updateSetting} = useSettingFormContext();

  return (
    <FormLayout>
      <Select
        options={options}
        onChange={value => updateSetting('allowShow', value)}
        value={settingForm.allowShow}
      />

      {settingForm.allowShow === 'specific-pages' && (
        <FormInputSettingTriggers
          label="Included pages"
          helpText="Page URLs to show the pop-up (separated commas ',')"
          value={settingForm.includedUrls}
          handleChange={value => updateSetting('includedUrls', value)}
        />
      )}

      <FormInputSettingTriggers
        value={settingForm.excludedUrls}
        label="Excluded pages"
        helpText="Page URLs NOT to show the pop-up (separated commas ',')"
        handleChange={value => updateSetting('excludedUrls', value)}
      />
    </FormLayout>
  );
}
