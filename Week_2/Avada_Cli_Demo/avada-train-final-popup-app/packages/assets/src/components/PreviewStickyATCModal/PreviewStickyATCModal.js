import PropTypes from 'prop-types';
import StickyProductPreview from '../StickyProductPreview/StickyProductPreview';
import React from 'react';
import {Frame, Modal} from '@shopify/polaris';

export default function PreviewStickyATCModal({active, handleChange}) {
  return (
    <Frame>
      <Modal
        open={active}
        onClose={handleChange}
        title="Desktop preview"
        primaryAction={{
          content: 'Close',
          onAction: handleChange
        }}
        size="large"
      >
        <div className="Avada-PreviewWrapper">
          <div
            className="Avada-PreviewWrapper_Container--Desktop"
            style={{
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url()`,
              backgroundColor: 'rgb(247, 247, 247)',
              backgroundSize: 'cover'
            }}
          >
            <StickyProductPreview device={'-desktop'} />
          </div>
        </div>
      </Modal>
    </Frame>
  );
}

PreviewStickyATCModal.propTypes = {
  active: PropTypes.bool,
  handleChange: PropTypes.func
};
