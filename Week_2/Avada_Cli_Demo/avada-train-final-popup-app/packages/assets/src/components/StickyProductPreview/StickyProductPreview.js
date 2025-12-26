import PropTypes from 'prop-types';
import React, {useState} from 'react';
import '@assets/components/StickyCart/StickyCart.scss';
import StickyCartPreviewMobile from '../StickyCartPreviewMobile/StickyCartPreviewMobile';
import StickyCartPreviewDesktop from '../StickyCartPreviewDesktop/StickyCartPreviewDesktop';
import {useStickyFormContext} from '@assets/contexts/stickyFormContext';

const productOptions = {
  backgroundImg:
    'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400',
  productName: 'Puffer Jacket With Hidden Hood',
  discountPrice: 70.0,
  actualPrice: 90.0,
  sizes: [{value: 'S'}, {value: 'M'}, {value: 'L'}, {value: 'Xl'}],
  colors: [{value: 'Black'}, {value: 'Blue'}, {value: 'Cyan'}],
  materials: [{value: 'Rubber'}, {value: 'Leather'}]
};

export default function StickyProductPreview({options = productOptions, device}) {
  const {stickyForm} = useStickyFormContext();

  const [submitMobile, setSubmitMobile] = useState(false);
  const [submitDesktop, setSubmitDesktop] = useState(false);

  const isMobile = device === '-mobile';
  const isDesktop = device === '-desktop';

  const isSubmitted = isMobile ? submitMobile : submitDesktop;

  const handleSubmitPreview = () => {
    if (isMobile) {
      setSubmitMobile(true);
      setTimeout(() => {
        setSubmitMobile(false);
      }, 3000);
    }

    if (isDesktop) {
      setSubmitDesktop(true);
      setTimeout(() => {
        setSubmitDesktop(false);
      }, 3000);
    }
  };

  return (
    <div
      className={`Avada-StickyATC-ProductInfo ${stickyForm.position} -preview ${device} -visible`}
      style={{
        background: `${stickyForm.bgColor}`,
        '--border-radius-atc': `var(--${stickyForm.buttonBorderRadius})`
      }}
    >
      {isSubmitted ? (
        <div className="Avada-StickyATC-SuccessBanner">{stickyForm.successResponse}</div>
      ) : (
        <>
          {isMobile && <StickyCartPreviewMobile options={options} onSubmit={handleSubmitPreview} />}

          {isDesktop && (
            <StickyCartPreviewDesktop options={options} onSubmit={handleSubmitPreview} />
          )}
        </>
      )}
    </div>
  );
}

StickyProductPreview.propTypes = {
  options: PropTypes.object,
  device: PropTypes.string
};
