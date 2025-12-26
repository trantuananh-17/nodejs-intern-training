import {InlineStack, Labelled, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';
import './StickyPositionInput.scss';

const defaultOptions = [
  {label: 'Bottom', value: 'avada-position-bottom'},
  {label: 'Top', value: 'avada-position-top'}
];

export default function StickyPositionInput({label, value, onChange, options = defaultOptions}) {
  return (
    <Labelled label={label}>
      <InlineStack gap={100}>
        {options.map((option, key) => (
          <>
            <div
              key={key}
              className={`Avada-MobilePositionNew ${
                value === option.value ? 'Avada-MobilePositionNew--selected' : ''
              }`}
              onClick={() => onChange(option.value)}
            >
              <div
                className={`Avada-MobilePositionNew__Input Avada-MobilePositionNew__Input--${option.value}`}
              ></div>
            </div>
            <Text>{option.label}</Text>
          </>
        ))}
      </InlineStack>
    </Labelled>
  );
}

StickyPositionInput.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};
