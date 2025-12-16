import {Box, InlineStack, RangeSlider, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

export default function SettingRangeSlider({value, handleRangeSliderChange, label, helpText}) {
  return (
    <RangeSlider
      output
      label={label}
      min={0}
      max={80}
      value={value}
      onChange={handleRangeSliderChange}
      helpText={helpText}
      suffix={
        <Box
          borderWidth="050"
          borderColor="border-brand"
          borderRadius="100"
          padding={100}
          minWidth="90px"
        >
          <InlineStack align="space-between">
            <Text>{value}</Text>
            <Text>second(s)</Text>
          </InlineStack>
        </Box>
      }
    />
  );
}

SettingRangeSlider.propTypes = {
  value: PropTypes.number,
  handleRangeSliderChange: PropTypes.func,
  label: PropTypes.string,
  helpText: PropTypes.string
};
