import {TextField} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

export default function FormInputSettingTriggers({value, label, helpText, handleChange}) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      helpText={helpText}
      multiline={5}
    />
  );
}

FormInputSettingTriggers.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  helpText: PropTypes.node,
  handleChange: PropTypes.func
};
