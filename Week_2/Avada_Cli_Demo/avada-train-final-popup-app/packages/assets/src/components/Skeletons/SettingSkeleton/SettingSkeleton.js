import {
  BlockStack,
  Box,
  Card,
  InlineStack,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonTabs,
  SkeletonThumbnail
} from '@shopify/polaris';
import React from 'react';

export function SettingSkeleton() {
  return (
    <Card>
      <LegacyCard>
        <SkeletonTabs />
      </LegacyCard>

      <BlockStack gap="600">
        <Box paddingBlock={200}>
          <BlockStack gap="300">
            <SkeletonDisplayText size="small" />

            <InlineStack gap="400">
              {Array.from({length: 4}).map((_, i) => (
                <Box key={i} width="120px">
                  <SkeletonThumbnail size="large" />
                </Box>
              ))}
            </InlineStack>

            <Box maxWidth="320px">
              <SkeletonBodyText lines={1} />
            </Box>

            <BlockStack gap="200">
              <SkeletonBodyText lines={1} />
              <SkeletonBodyText lines={1} />
            </BlockStack>
          </BlockStack>
        </Box>

        <Card subdued>
          <BlockStack gap="400">
            <SkeletonDisplayText size="small" />

            <InlineStack gap="600" align="space-between">
              <Box width="45%">
                <SkeletonBodyText lines={2} />
              </Box>
              <Box width="45%">
                <SkeletonBodyText lines={2} />
              </Box>
            </InlineStack>

            <InlineStack gap="600" align="space-between">
              <Box width="45%">
                <SkeletonBodyText lines={2} />
              </Box>
              <Box width="45%">
                <SkeletonBodyText lines={2} />
              </Box>
            </InlineStack>
          </BlockStack>
        </Card>
      </BlockStack>
    </Card>
  );
}
