import {Box, Frame, Modal} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

export default function PreviewNotificationModal({active, handleChange, settings}) {
  return (
    <div style={{height: '500px'}}>
      <Frame>
        <Modal
          // activator={activator}
          open={active}
          onClose={handleChange}
          title="Desktop preview"
          primaryAction={{
            content: 'Close',
            onAction: handleChange
          }}
          size="large"
        >
          <Modal.Section>
            <Box minHeight="300px" position="relative">
              <Box position="absolute" {...getPositionProps(settings?.position)}>
                <NotificationPopup settings={settings} />
              </Box>
            </Box>
          </Modal.Section>
        </Modal>
      </Frame>
    </div>
  );
}

const getPositionProps = position => {
  switch (position) {
    case 'top-left':
      return {insetBlockStart: '200', insetInlineStart: '200'};
    case 'top-right':
      return {insetBlockStart: '200', insetInlineEnd: '200'};
    case 'bottom-right':
      return {insetBlockEnd: '200', insetInlineEnd: '200'};
    default:
      return {insetBlockEnd: '200', insetInlineStart: '200'};
  }
};

PreviewNotificationModal.propTypes = {
  active: PropTypes.bool,
  handleChange: PropTypes.func,
  settings: PropTypes.object
};
