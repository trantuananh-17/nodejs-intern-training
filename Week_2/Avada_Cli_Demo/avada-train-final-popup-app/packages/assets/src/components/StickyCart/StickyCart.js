import React from 'react';
import './StickyCart.scss';
import StickyProductPreview from '../StickyProductPreview/StickyProductPreview';
import {useStickyFormContext} from '@assets/contexts/stickyFormContext';

export default function StickyCart() {
  const {stickyForm} = useStickyFormContext();

  return (
    <div className="Avada-PreviewWrapper__Container">
      <div className="Avada-PreviewWrapper">
        <div
          className="Avada_PreviewMobile__Wrapper"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundImage: `url()`,
            backgroundColor: 'rgb(247, 247, 247)',
            backgroundSize: 'cover'
          }}
        >
          <div className="Avada_PreviewMobile__Inline">
            <StickyProductPreview device={'-mobile'} stickyForm={stickyForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

StickyCart.propTypes = {};
