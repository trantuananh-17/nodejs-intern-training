import React from 'react';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';
import {BlockStack, Checkbox, Divider, Text} from '@shopify/polaris';
import SettingRangeSlider from '@assets/components/RangeSlider/SettingRangeSlider';
import PropTypes from 'prop-types';

export default function TabSettingDisplay({errors}) {
  const {settingForm, updateSetting} = useSettingFormContext();

  return (
    <BlockStack gap={300}>
      <Text as="h2" fontWeight="medium" variant="headingSm">
        APPEARENCE
      </Text>

      <DesktopPositionInput
        label={'Desktop Position'}
        helpText={'The display position of the pop on your website.'}
        value={settingForm.position}
        onChange={value => updateSetting('position', value)}
      />

      <Checkbox
        label="Hide time ago"
        onChange={value => updateSetting('hideTimeAgo', value)}
        checked={settingForm.hideTimeAgo}
      />

      <Checkbox
        label="Truncate content text"
        onChange={value => updateSetting('truncateProductName', value)}
        checked={settingForm.truncateProductName}
        helpText={
          'If your product name is long for one line, it will be truncated to Product na...'
        }
      />

      <Checkbox
        label="Replay playlist"
        onChange={value => updateSetting('replayPlaylist', value)}
        checked={settingForm.replayPlaylist}
        helpText={
          'If enabled, the playlist will be replayed when all items have all been displayed.'
        }
      />

      <Checkbox
        label="Continue after page reload"
        onChange={value => updateSetting('continueAfterPageReload', value)}
        checked={settingForm.continueAfterPageReload}
        helpText={
          'If enabled, after the page is reloaded, the next popup is displayed. If not, the list will be replayed from the start.'
        }
      />

      <Divider />

      {/* Range Slider */}
      <Text as="h2" fontWeight="medium" variant="headingSm">
        TIMING
      </Text>

      <BlockStack gap={600}>
        <SettingRangeSlider
          value={settingForm.displayDuration}
          handleRangeSliderChange={value => updateSetting('displayDuration', value)}
          label="Display duration"
          helpText="How long each pop will display on your page."
          subtitle={'second(s)'}
          error={errors.displayDuration}
        />

        <SettingRangeSlider
          value={settingForm.firstDelay}
          handleRangeSliderChange={value => updateSetting('firstDelay', value)}
          label="Time before the first pop"
          helpText="The delay time before the first notification."
          subtitle={'second(s)'}
          error={errors.firstDelay}
        />

        <SettingRangeSlider
          value={settingForm.popsInterval}
          handleRangeSliderChange={value => updateSetting('popsInterval', value)}
          label="Gap time between two pops"
          helpText="The time interval between two popup notifications."
          subtitle={'second(s)'}
          error={errors.popsInterval}
        />

        <SettingRangeSlider
          value={settingForm.maxPopsDisplay}
          handleRangeSliderChange={value => updateSetting('maxPopsDisplay', value)}
          label="Maximum of popups"
          helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
          subtitle={'pop(s)'}
          error={errors.maxPopsDisplay}
        />
      </BlockStack>
    </BlockStack>
  );
}

TabSettingDisplay.propTypes = {
  errors: PropTypes.object
};
