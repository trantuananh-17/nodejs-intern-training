import {Banner, BlockStack, Button, Modal, Text, TextContainer} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';

export default function NotificationBanner({handleHideBanner, loading, handleSync}) {
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleSubmit = async () => {
    handleSync();
    setActive(false);
  };

  return (
    <>
      <Banner title="If orders are not up to date" onDismiss={handleHideBanner}>
        <BlockStack inlineAlign="start" gap={200}>
          <Text as="p">
            We only keep maximum amount of 30 purchase notifications synchronized from your store.
            If you find your orders are not up to date, try synchronizing it again.
          </Text>

          <Button onClick={handleChange} loading={loading}>
            Sync manually
          </Button>
        </BlockStack>
      </Banner>

      <Modal
        open={active}
        onClose={handleChange}
        title="Are you sure you want to sync manually?"
        primaryAction={{
          content: 'Confirm',
          onAction: handleSubmit
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange
          }
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              {
                "Make sure to delete all your notifications then sync again if you want full update since the manual updates will be appended to the list. We do this since you may have other imported notifications, we don't want to replace the whole list."
              }
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}

NotificationBanner.propTypes = {
  handleHideBanner: PropTypes.func,
  loading: PropTypes.bool,
  handleSync: PropTypes.func
};
