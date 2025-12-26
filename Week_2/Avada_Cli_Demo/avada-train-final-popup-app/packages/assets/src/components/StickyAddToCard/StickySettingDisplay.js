import React from 'react';
import {BlockStack, Box, Card, Checkbox, InlineStack, Labelled, Text} from '@shopify/polaris';
import StickyPositionInput from '@assets/components/StickyPositionInput/StickyPositionInput';
import PropTypes from 'prop-types';

export default function StickySettingDisplay({stickyForm, updateSticky}) {
  return (
    <Card roundedAbove="sm">
      <Box minHeight="180px">
        <BlockStack gap={'200'}>
          <Text as="h2" variant="headingSm">
            Step 2. Display
          </Text>

          <Labelled label={'Show on devices'}>
            <InlineStack gap={'300'}>
              <Checkbox
                label="Mobile"
                onChange={value => updateSticky('enableMobile', value)}
                checked={stickyForm.enableMobile}
              />

              <Checkbox
                label="Desktop"
                onChange={value => updateSticky('enableDesktop', value)}
                checked={stickyForm.enableDesktop}
              />
            </InlineStack>
          </Labelled>

          <StickyPositionInput
            value={stickyForm.position}
            label={'Position'}
            onChange={value => updateSticky('position', value)}
          />
        </BlockStack>
      </Box>
    </Card>
  );
}

StickySettingDisplay.propTypes = {
  stickyForm: PropTypes.object,
  updateSticky: PropTypes.func
};
