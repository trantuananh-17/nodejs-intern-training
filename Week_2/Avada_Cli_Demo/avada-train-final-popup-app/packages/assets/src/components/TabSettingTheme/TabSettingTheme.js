import {BlockStack, Checkbox, Divider, InlineGrid, Text} from '@shopify/polaris';
import React from 'react';
import ThemePopInput from '../ThemePopInput/ThemePopInput';
import {basicThemeOptions, designedThemes} from '@assets/const/themeOptions';
import ThemeColorInput from '../ThemeColorInput/ThemeColorInput';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';

export default function TabSettingTheme() {
  const {settingForm, updateSetting, updateSettings} = useSettingFormContext();

  return (
    <BlockStack gap={400}>
      <Text as="h2" fontWeight="medium" variant="headingSm">
        BASIC THEMES
      </Text>

      <InlineGrid columns={{xs: 1, sm: 2, md: 4}} gap="400">
        <ThemePopInput
          options={basicThemeOptions}
          theme={settingForm.theme}
          onChange={option => updateSettings(option)}
        />
      </InlineGrid>

      <Divider />

      <Text as="h2" fontWeight="medium" variant="headingSm">
        DESIGNED THEMES
      </Text>

      <InlineGrid columns={{xs: 1, sm: 2, md: 4}} gap="400">
        <ThemePopInput
          options={designedThemes}
          theme={settingForm.theme}
          onChange={option => updateSettings(option)}
        />
      </InlineGrid>

      <Divider />

      <Text as="h2" fontWeight="medium" variant="headingSm">
        COLOR SETTINGS
      </Text>

      <BlockStack gap={300}>
        {!settingForm.hideBackgroundSelect && (
          <>
            <Checkbox
              label="Gradient background"
              onChange={value => updateSetting('isGradient', value)}
              checked={settingForm.isGradient}
            />

            {settingForm.isGradient && (
              <InlineGrid columns={{xs: 1, sm: 2}} gap="200">
                <ThemeColorInput
                  label="Background color start"
                  colorHex={settingForm.actionColorStart}
                  onChange={value => updateSetting('actionColorStart', value)}
                />
                <ThemeColorInput
                  label="Background color end"
                  colorHex={settingForm.actionColorEnd}
                  onChange={value => updateSetting('actionColorEnd', value)}
                />
              </InlineGrid>
            )}

            {!settingForm.isGradient && (
              <ThemeColorInput
                label="Background color"
                colorHex={settingForm.backgroundColor}
                onChange={value => updateSetting('backgroundColor', value)}
              />
            )}
          </>
        )}

        <ThemeColorInput
          label={'Heading color'}
          colorHex={settingForm.headingColor}
          onChange={value => updateSetting('headingColor', value)}
        />
        <ThemeColorInput
          label={'Text color'}
          colorHex={settingForm.textColor}
          onChange={value => updateSetting('textColor', value)}
        />
        <ThemeColorInput
          label={'Time color'}
          colorHex={settingForm.timeColor}
          onChange={value => updateSetting('timeColor', value)}
        />
      </BlockStack>
    </BlockStack>
  );
}

TabSettingTheme.propTypes = {};
