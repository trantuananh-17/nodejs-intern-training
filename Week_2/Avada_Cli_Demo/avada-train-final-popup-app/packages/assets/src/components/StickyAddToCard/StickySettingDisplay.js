import React from 'react';
import {BlockStack, Box, Card, Checkbox, InlineStack, Labelled, Text} from '@shopify/polaris';
import StickyPositionInput from '@assets/components/StickyPositionInput/StickyPositionInput';
import {useStickyFormContext} from '@assets/contexts/stickyFormContext';

export default function StickySettingDisplay() {
  const {stickyForm, updateSticky} = useStickyFormContext();

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

StickySettingDisplay.propTypes = {};
