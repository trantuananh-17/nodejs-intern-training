import {Box, InlineStack, SkeletonDisplayText, SkeletonThumbnail} from '@shopify/polaris';
import React from 'react';

export default function ProductSkeleton() {
  return (
    <InlineStack align="space-between" blockAlign="center">
      <InlineStack gap={'300'} blockAlign="center">
        <SkeletonThumbnail size="small" />
        <Box width="150px">
          <SkeletonDisplayText size="large" maxWidth="150px" />
        </Box>
      </InlineStack>

      <InlineStack align="end">
        <Box width="80px">
          <SkeletonDisplayText size="large" maxWidth="80px" />
        </Box>
      </InlineStack>
    </InlineStack>
  );
}
