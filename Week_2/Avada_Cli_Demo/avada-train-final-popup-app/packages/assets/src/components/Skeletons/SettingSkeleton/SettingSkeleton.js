import {
  BlockStack,
  Box,
  Card,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonTabs,
  TextContainer
} from '@shopify/polaris';
import React from 'react';

export function SettingSkeleton() {
  return (
    <Card>
      <SkeletonTabs />

      <BlockStack gap="600">
        <Box paddingBlock={200}>
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </Box>

        <BlockStack gap="400">
          <TextContainer>
            <SkeletonDisplayText size="small" />
            <SkeletonBodyText />
          </TextContainer>
        </BlockStack>
      </BlockStack>
    </Card>
  );
}
