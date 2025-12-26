import {useStickyFormContext} from '@assets/contexts/stickyFormContext';
import {BlockStack, Box, Card, Checkbox, Labelled, Text, TextField} from '@shopify/polaris';
import React from 'react';

export default function StickySettingContent() {
  const {stickyForm, updateSticky} = useStickyFormContext();

  return (
    <Card roundedAbove="sm">
      <Box minHeight="180px">
        <BlockStack gap={'200'}>
          <Text as="h2" variant="headingSm">
            Step 1. Content
          </Text>

          <Labelled label={'What to show'}>
            <BlockStack gap={'200'}>
              <Checkbox
                label="Product image"
                onChange={value => updateSticky('showProductImage', value)}
                checked={stickyForm.showProductImage}
              />

              <Checkbox
                label="Product price"
                onChange={value => updateSticky('showProductPrice', value)}
                checked={stickyForm.showProductPrice}
              />

              <Checkbox
                label="Quantity selector"
                onChange={value => updateSticky('showQtyInput', value)}
                checked={stickyForm.showQtyInput}
              />

              <TextField
                label="Quantity text"
                value={stickyForm.qtyText}
                onChange={value => updateSticky('qtyText', value)}
              />

              <TextField
                label="Add-to-cart success response"
                value={stickyForm.successResponse}
                onChange={value => updateSticky('successResponse', value)}
              />
            </BlockStack>
          </Labelled>
        </BlockStack>
      </Box>
    </Card>
  );
}

StickySettingContent.propTypes = {};
