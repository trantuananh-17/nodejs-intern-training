import {BlockStack, Box, Button, Card, InlineGrid, InlineStack, Text} from '@shopify/polaris';
import {ViewIcon} from '@shopify/polaris-icons';
import PropTypes from 'prop-types';
import React from 'react';

export default function Preview({preview, fetched, data, inline}) {
  return (
    <Card roundedAbove="sm">
      <Box minHeight="180px">
        <BlockStack>
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingSm">
              Preview
            </Text>
            <Button
              // onClick={handleChange}
              accessibilityLabel="Open Preview"
              icon={ViewIcon}
              // loading={loading}
            />
          </InlineGrid>
          {inline ? (
            <InlineStack blockAlign="center" align="center">
              {fetched && data && preview}
            </InlineStack>
          ) : (
            <>{fetched && data && preview}</>
          )}
        </BlockStack>
      </Box>
    </Card>
  );
}

Preview.propTypes = {
  preview: PropTypes.node,
  settings: PropTypes.object,
  fetched: PropTypes.bool,
  data: PropTypes.object,
  inline: PropTypes.bool
};
