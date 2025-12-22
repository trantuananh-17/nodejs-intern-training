import React from 'react';
import DesktopPositionInput from '@assets/components/DesktopPositionInput/DesktopPositionInput';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';
import {BlockStack, Checkbox, Grid, Text} from '@shopify/polaris';
import SettingRangeSlider from '@assets/components/RangeSlider/SettingRangeSlider';

export default function TabSettingDisplay() {
  const {settingForm, updateSetting} = useSettingFormContext();

  return (
    <BlockStack gap={300}>
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

      {/* Range Slider */}
      <Text as="h2" fontWeight="medium" variant="headingMd">
        TIMING
      </Text>
      <Grid>
        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          <SettingRangeSlider
            value={settingForm.displayDuration}
            handleRangeSliderChange={value => updateSetting('displayDuration', value)}
            label="Display duration"
            helpText="How long each pop will display on your page."
          />
        </Grid.Cell>

        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          <SettingRangeSlider
            value={settingForm.firstDelay}
            handleRangeSliderChange={value => updateSetting('firstDelay', value)}
            label="Time before the first pop"
            helpText="The delay time before the first notification."
          />
        </Grid.Cell>

        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          <SettingRangeSlider
            value={settingForm.popsInterval}
            handleRangeSliderChange={value => updateSetting('popsInterval', value)}
            label="Gap time between two pops"
            helpText="The time interval between two popup notifications."
          />
        </Grid.Cell>

        <Grid.Cell columnSpan={{xs: 6, sm: 6, md: 6, lg: 6, xl: 6}}>
          <SettingRangeSlider
            value={settingForm.maxPopsDisplay}
            handleRangeSliderChange={value => updateSetting('maxPopsDisplay', value)}
            label="Maximum of popups"
            helpText="The maximum number of popups are allowed to show after page loading. Maximum number is 80."
          />
        </Grid.Cell>
      </Grid>
    </BlockStack>
  );
}
