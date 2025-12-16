import {Button, Card, InlineStack, Layout, Page, Text} from '@shopify/polaris';
import React, {useState} from 'react';

/**
 * Render a home page for overview
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Home() {
  const [enabled, setEnabled] = useState(false);

  return (
    <Page title="Home">
      <div style={{marginTop: '8px'}}>
        <Layout>
          <Layout.Section>
            <Card>
              <InlineStack blockAlign="center">
                <Text as="span">
                  App status is{' '}
                  <Text as="span" fontWeight="bold">
                    {enabled ? 'enabled' : 'disabled'}
                  </Text>
                </Text>
                <div style={{flex: 1}} />
                <Button
                  tone="success"
                  variant={enabled ? 'secondary' : 'primary'}
                  onClick={() => setEnabled(prev => !prev)}
                >
                  {enabled ? 'Disable' : 'Enable'}
                </Button>
              </InlineStack>
            </Card>
          </Layout.Section>
        </Layout>
      </div>
    </Page>
  );
}
