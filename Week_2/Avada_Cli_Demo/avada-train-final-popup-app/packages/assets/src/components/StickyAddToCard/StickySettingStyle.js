import {BlockStack, Box, Card, Labelled, Text} from '@shopify/polaris';
import React from 'react';
import ThemeColorInput from '../ThemeColorInput/ThemeColorInput';
import StickyBorderButtonInput from '../StickyBorderButtonInput/StickyBorderButtonInput';
import PropTypes from 'prop-types';

const colors = [
  {key: 'bgColor', label: 'Background color'},
  {key: 'productNameColor', label: 'Product name color'},
  {key: 'priceColor', label: 'Price color'},
  {key: 'specialPriceColor', label: 'Special price color'},
  {key: 'buttonTextColor', label: 'Button text color'},
  {key: 'buttonBackgroundColor', label: 'Button background color'}
];

export default function StickySettingStyle({stickyForm, updateSticky}) {
  return (
    <Card roundedAbove="sm">
      <Box minHeight="180px">
        <Text as="h2" variant="headingSm">
          Step 3. Style
        </Text>
        {/* Color */}
        <Labelled label={'Custom color'}>
          <BlockStack gap={'200'}>
            {colors.map(({key, label}) => (
              <ThemeColorInput
                key={key}
                colorHex={stickyForm[key] ?? '#fff'}
                label={label}
                onChange={value => updateSticky(key, value)}
              />
            ))}
          </BlockStack>
        </Labelled>

        {/* Button border */}
        <StickyBorderButtonInput
          label={'Button border'}
          value={stickyForm.buttonBorderRadius}
          onChange={value => updateSticky('buttonBorderRadius', value)}
        />
      </Box>
    </Card>
  );
}

StickySettingStyle.propTypes = {
  stickyForm: PropTypes.object,
  updateSticky: PropTypes.func
};
