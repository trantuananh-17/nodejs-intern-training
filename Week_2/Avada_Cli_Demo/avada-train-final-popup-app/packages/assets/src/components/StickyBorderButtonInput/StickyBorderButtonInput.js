import React from 'react';
import './StickyBorderButtonInput.scss';
import {BlockStack, InlineStack, Labelled, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';

const defaultOptions = [
  {label: 'None', value: 'none'},
  {label: 'Small', value: 'small'},
  {label: 'Medium', value: 'medium'},
  {label: 'Large', value: 'large'}
];

export default function StickyBorderButtonInput({
  label,
  value,
  onChange,
  options = defaultOptions
}) {
  return (
    <Labelled label={label}>
      <InlineStack gap={200}>
        {options.map((option, key) => (
          <BlockStack gap={'200'} key={key}>
            <div className="Avada-ButtonBorder-Container">
              <div
                className={`Avada-ButtonBorder ${
                  value === option.value ? 'Avada-ButtonBorder--selected' : ''
                }`}
                onClick={() => onChange(option.value)}
              >
                <div
                  className={`Avada-ButtonBorder__Input Avada-ButtonBorder__Input--${option.value}`}
                >
                  Add To Cart
                </div>
              </div>
            </div>
            <Text>{option.label}</Text>
          </BlockStack>
        ))}
      </InlineStack>
    </Labelled>
  );
}

StickyBorderButtonInput.propTypes = {
  options: PropTypes.array,
  value: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func
};
