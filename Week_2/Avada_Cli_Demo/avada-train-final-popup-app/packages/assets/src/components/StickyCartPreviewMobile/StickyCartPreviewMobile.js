import {useStickyFormContext} from '@assets/contexts/stickyFormContext';
import PropTypes from 'prop-types';
import React, {useCallback, useState} from 'react';
import StickyProductVariant from '../StickyProductPreview/StickyProductVariant';

export default function StickyCartPreviewMobile({options, onSubmit}) {
  const {stickyForm} = useStickyFormContext();

  const [formValue, setFormValue] = useState({
    size: 'S',
    color: 'Black',
    material: 'Rubber',
    quantity: 1
  });

  const handleUpdateForm = (key, value) => {
    setFormValue(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const [popoverActive, setPopoverActive] = useState(false);

  const togglePopoverActive = useCallback(
    () => setPopoverActive(popoverActive => !popoverActive),
    []
  );

  return (
    <>
      <div
        className={`Avada-StickyATC-ProductInfo__Top ${
          stickyForm.showQtyInput ? 'not-full' : 'is-full'
        }`}
      >
        {stickyForm.showProductImage && (
          <div
            className="Avada-ThumbnailImage__Wrapper"
            style={{border: '1px solid rgb(227, 227, 227)'}}
          >
            <div className="Avada-ThumbnailImage__Image">
              <img alt="product image" src={options.backgroundImg} />
            </div>
          </div>
        )}

        <div className="Avada-StickyATC-Heading">
          <span className="Avada-StickyATC-Title" style={{color: `${stickyForm.productNameColor}`}}>
            {options.productName}
          </span>

          {stickyForm.showProductPrice && (
            <div className="Avada-StickyATC-Price">
              <span
                className="Avada-StickyATC-DiscountPrice"
                style={{color: `${stickyForm.priceColor}`}}
              >
                ${(options.discountPrice * formValue.quantity).toFixed(2)}
              </span>
              <span
                className="Avada-StickyATC-ActualPrice"
                style={{color: `${stickyForm.specialPriceColor}`}}
              >
                ${(options.actualPrice * formValue.quantity).toFixed(2)}
              </span>
            </div>
          )}
        </div>
      </div>

      {stickyForm.showQtyInput && (
        <div className="Avada-StickyATC-Quantity">
          <span>{stickyForm.qtyText}</span>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={formValue.quantity}
            onChange={e => {
              const value = e.target.value;

              if (/^\d*$/.test(value)) {
                handleUpdateForm('quantity', value);
              }
            }}
            onBlur={() => {
              const qty = Number(formValue.quantity);

              if (!qty || qty < 1) {
                handleUpdateForm('quantity', 1);
              }
            }}
          />
        </div>
      )}

      <div className="Avada-Offer__VariantSection">
        <div className="Avada-Selection__Section">
          <div className="Avada-VariantSelectionDesktop" onClick={togglePopoverActive}>
            <div className="Avada-Offer__VariantPopupTrigger">
              <div className="Avada-VariantTitle">
                {formValue.size} / {formValue.color} /{formValue.material}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.39742 6.17574C2.63173 5.94142 3.01163 5.94142 3.24594 6.17574L6.02168 8.95147L8.79741 6.17574C9.03173 5.94142 9.41163 5.94142 9.64594 6.17574C9.88026 6.41005 9.88026 6.78995 9.64594 7.02426L6.44594 10.2243C6.21163 10.4586 5.83173 10.4586 5.59742 10.2243L2.39742 7.02426C2.1631 6.78995 2.1631 6.41005 2.39742 6.17574Z"
                  fill="#616161"
                ></path>
              </svg>
            </div>
          </div>

          {popoverActive && (
            <div className="Avada-VariantSelection__Container" style={{background: '#fff'}}>
              <div className="Avada-VariantPopup--Close" onClick={togglePopoverActive}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 41 40"
                  fill="none"
                >
                  <path
                    d="M14.1716 28.0056C13.7467 28.0056 13.3218 27.8491 12.9864 27.5136C12.3379 26.8651 12.3379 25.7918 12.9864 25.1433L25.6433 12.4864C26.2918 11.8379 27.3651 11.8379 28.0136 12.4864C28.6621 13.1349 28.6621 14.2082 28.0136 14.8567L15.3567 27.5136C15.0437 27.8491 14.5964 28.0056 14.1716 28.0056Z"
                    fill="#444444"
                  ></path>
                  <path
                    d="M26.8284 28.0056C26.4036 28.0056 25.9787 27.8491 25.6433 27.5136L12.9864 14.8567C12.3379 14.2082 12.3379 13.1349 12.9864 12.4864C13.6349 11.8379 14.7082 11.8379 15.3567 12.4864L28.0136 25.1433C28.6621 25.7918 28.6621 26.8651 28.0136 27.5136C27.6782 27.8491 27.2533 28.0056 26.8284 28.0056Z"
                    fill="#444444"
                  ></path>
                </svg>
              </div>
              <div className="Avada-Variant__Container">
                <StickyProductVariant
                  label={'Size'}
                  options={options.sizes}
                  value={formValue.size}
                  onChange={value => handleUpdateForm('size', value)}
                />
                <StickyProductVariant
                  label={'Color'}
                  options={options.colors}
                  value={formValue.color}
                  onChange={value => handleUpdateForm('color', value)}
                />
                <StickyProductVariant
                  label={'Material'}
                  options={options.materials}
                  value={formValue.material}
                  onChange={value => handleUpdateForm('material', value)}
                />
              </div>
              <div className="Avada-ConfirmButton" onClick={togglePopoverActive}>
                Confirm
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        className="Avada-Offer__ButtonAddToCart"
        style={{
          backgroundColor: `${stickyForm.buttonBackgroundColor}`,
          color: `${stickyForm.buttonTextColor}`
        }}
        onClick={onSubmit}
      >
        {stickyForm.btnAddCartText}
      </button>
    </>
  );
}

StickyCartPreviewMobile.propTypes = {
  options: PropTypes.object,
  onSubmit: PropTypes.func
};
