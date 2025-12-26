import {BlockStack, Box, Button, Card, InlineGrid, InlineStack, Text} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';

export default function Preview({preview, onChange, fetched, data, inline}) {
  return (
    <Card roundedAbove="sm">
      <Box minHeight="180px">
        <BlockStack>
          <InlineGrid columns="1fr auto">
            <Text as="h2" variant="headingMd">
              Preview
            </Text>
            <Button
              onClick={onChange}
              accessibilityLabel="Open Preview"

              // loading={loading}
            >
              Desktop
            </Button>
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
  onChange: PropTypes.func,
  fetched: PropTypes.bool,
  data: PropTypes.object,
  inline: PropTypes.bool
};
