import {
  Card,
  ResourceList,
  ResourceItem,
  InlineStack,
  BlockStack,
  SkeletonDisplayText,
  SkeletonThumbnail,
  Divider,
  SkeletonBodyText,
  Box
} from '@shopify/polaris';
import React from 'react';

export default function NotificationListSkeleton() {
  return (
    <>
      <Card>
        <Box padding="300">
          <InlineStack align="space-between" blockAlign="center">
            <InlineStack gap="200" blockAlign="center">
              <SkeletonThumbnail size="extraSmall" />
              <Box width="140px">
                <SkeletonBodyText lines={1} />
              </Box>
            </InlineStack>

            <BlockStack inlineAlign="end">
              <Box width="120px">
                <SkeletonDisplayText size="small" />
              </Box>
            </BlockStack>
          </InlineStack>
        </Box>

        <Divider />

        <ResourceList
          resourceName={{singular: 'customer', plural: 'customers'}}
          items={[1, 2, 3]}
          renderItem={(_, index) => (
            <ResourceItem id={index}>
              <InlineStack align="space-between" blockAlign="center">
                <InlineStack gap="300" blockAlign="center">
                  <SkeletonThumbnail size="extraSmall" />
                  <SkeletonThumbnail size="medium" />

                  <BlockStack gap="100">
                    <SkeletonDisplayText size="small" />
                    <Box width="160px">
                      <SkeletonBodyText lines={1} />
                    </Box>
                  </BlockStack>
                </InlineStack>

                <BlockStack align="end" inlineAlign="end" gap="100">
                  <Box width="140px">
                    <SkeletonBodyText lines={1} />
                  </Box>
                  <Box width="80px">
                    <SkeletonBodyText lines={1} />
                  </Box>
                </BlockStack>
              </InlineStack>
            </ResourceItem>
          )}
        />
      </Card>
      <Box padding="300">
        <InlineStack align="center" gap="200">
          <SkeletonThumbnail size="extraSmall" />
          <SkeletonThumbnail size="extraSmall" />
        </InlineStack>
      </Box>
    </>
  );
}
