import {
  BlockStack,
  Box,
  Card,
  Layout,
  LegacyCard,
  SkeletonBodyText,
  SkeletonDisplayText,
  SkeletonPage,
  SkeletonTabs,
  TextContainer
} from '@shopify/polaris';
import React from 'react';

export function SettingSkeleton() {
  return (
    <SkeletonPage primaryAction>
      <Layout>
        <Layout.Section variant="oneThird">
          <LegacyCard>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText lines={20} />
              </TextContainer>
            </LegacyCard.Section>
          </LegacyCard>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <SkeletonTabs count={3} />

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
        </Layout.Section>
      </Layout>
    </SkeletonPage>
  );
}
