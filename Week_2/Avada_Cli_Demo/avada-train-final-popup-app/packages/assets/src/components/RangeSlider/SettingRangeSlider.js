import {Box, RangeSlider, TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

const MIN = 0;
const MAX = 80;

export default function SettingRangeSlider({
  value,
  handleRangeSliderChange,
  label,
  helpText,
  subtitle,
  error
}) {
  const isInvalid = value < MIN || value > MAX;
  return (
    <RangeSlider
      output
      label={label}
      min={MIN}
      max={MAX}
      value={value}
      onChange={handleRangeSliderChange}
      helpText={helpText}
      suffix={
        <Box borderRadius="100" minWidth="160px">
          <TextField
            type="number"
            value={String(value)}
            onChange={val => {
              handleRangeSliderChange(Number(val));
            }}
            autoComplete="off"
            min={0}
            max={80}
            labelHidden
            suffix={subtitle}
          />
        </Box>
      }
      error={isInvalid && error}
    />
  );
}

SettingRangeSlider.propTypes = {
  value: PropTypes.number,
  handleRangeSliderChange: PropTypes.func,
  label: PropTypes.string,
  helpText: PropTypes.string,
  subtitle: PropTypes.string,
  error: PropTypes.string
};
