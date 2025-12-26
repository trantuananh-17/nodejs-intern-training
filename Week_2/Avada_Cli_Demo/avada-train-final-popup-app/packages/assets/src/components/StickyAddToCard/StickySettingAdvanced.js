import {useStickyFormContext} from '@assets/contexts/stickyFormContext';
import {
  BlockStack,
  Button,
  Card,
  Checkbox,
  Collapsible,
  Icon,
  InlineStack,
  Text,
  TextField
} from '@shopify/polaris';
import {ChevronDownIcon, ChevronUpIcon} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import React from 'react';

export default function StickySettingAdvanced({open, onToggle}) {
  const {stickyForm, updateSticky} = useStickyFormContext();

  return (
    <Card sectioned>
      <BlockStack gap={200}>
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h2" variant="headingSm">
            Advanced settings
          </Text>
          <Button
            variant="plain"
            onClick={onToggle}
            ariaExpanded={open}
            ariaControls="basic-collapsible"
          >
            {open ? (
              <Icon source={ChevronUpIcon} tone="base" />
            ) : (
              <Icon source={ChevronDownIcon} tone="base" />
            )}
          </Button>
        </InlineStack>
        <Collapsible
          open={open}
          id="basic-collapsible"
          transition={{duration: '300ms', timingFunction: 'ease-in-out'}}
          expandOnPrint
        >
          <BlockStack>
            <Checkbox
              label="Hide Sticky add to cart on out of stock products"
              onChange={value => updateSticky('hideOutStock', value)}
              checked={stickyForm.hideOutStock}
            />
            <Checkbox
              label="Buy now button"
              onChange={value => updateSticky('cartRedirectCheckout', value)}
              checked={stickyForm.cartRedirectCheckout}
              helpText={
                'This option will redirect the customer to the checkout page immediately after clicking ”Add to cart”'
              }
            />
            <Checkbox
              label="Show on Home page"
              onChange={value => updateSticky('showOnHomePage', value)}
              checked={stickyForm.showOnHomePage}
              helpText={
                'This option allows you to display sticky bar on Homepage. Recommended for single-product stores'
              }
            />
            <Checkbox
              label="Custom add-to-cart button"
              onChange={value => updateSticky('customBtn', value)}
              checked={stickyForm.customBtn}
            />

            {stickyForm.customBtn && (
              <TextField
                label="Add-to-cart button text"
                value={stickyForm.btnAddCartText}
                onChange={value => updateSticky('btnAddCartText', value)}
              />
            )}
          </BlockStack>
        </Collapsible>
      </BlockStack>
    </Card>
  );
}

StickySettingAdvanced.propTypes = {
  open: PropTypes.bool,
  onToggle: PropTypes.func
};
