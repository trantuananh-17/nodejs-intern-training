import PropTypes from 'prop-types';
import React from 'preact/compat';
import './StickyCart.scss';

export default function StickyCartPreviewDesktop({
  product,
  stickyForm,
  options,
  formValue,
  onChangeQty,
  onSelectOption,
  isMobile
}) {
  const {selectedOptions, price, comparePrice, quantity, stockQty, title} = formValue;

  const InfoProduct = (
    <>
      {stickyForm.showProductImage && (
        <div
          className="Avada-ThumbnailImage__Wrapper"
          style={{border: '1px solid rgb(227, 227, 227)'}}
        >
          <div className="Avada-ThumbnailImage__Image">
            <img alt="product image" src={product.image} />
          </div>
        </div>
      )}

      <div className="Avada-StickyATC-Heading">
        <span className="Avada-StickyATC-Title" style={{color: stickyForm.productNameColor}}>
          {product.title}
        </span>

        {stickyForm.showProductPrice && (
          <div className="Avada-StickyATC-Price">
            <span className="Avada-StickyATC-DiscountPrice" style={{color: stickyForm.priceColor}}>
              ${(price * quantity).toFixed(2)}
            </span>

            {comparePrice && (
              <span
                className="Avada-StickyATC-ActualPrice"
                style={{color: stickyForm.specialPriceColor}}
              >
                ${(comparePrice * quantity).toFixed(2)}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  return (
    <>
      <div
        className={`Avada-StickyATC-ProductInfo ${stickyForm.position} ${
          isMobile ? '-mobile' : '-desktop'
        }`}
        style={{
          background: `${stickyForm.bgColor}`,
          '--border-radius-atc': `var(--${stickyForm.buttonBorderRadius})`
        }}
      >
        <>
          <div className="Avada-StickyATC-ProductInfo__Left">{InfoProduct}</div>{' '}
          <>
            <div className="Avada-Offer">
              {/* Variant */}
              {product.variants.length > 1 && (
                <div className="Avada-Offer__VariantSection">
                  <div className="Avada-Selection__Section">
                    <div className="Avada-VariantSelectionDesktop">
                      <div className="Avada-Offer__VariantPopupTrigger">
                        <div className="Avada-VariantTitle">{title}</div>
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
                    <div
                      className="Avada-VariantSelection__Container hidden"
                      style={{background: '#fff'}}
                    >
                      <div className="Avada-VariantPopup--Close">
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
                      <div className="Avada-Variant__Container ">
                        {options.map(option => (
                          <div key={option.name} className="Avada-OptionGroup">
                            <div className="Avada-VariantLabel">{option.name}:</div>

                            <div className="Avada-VariantOptionValues">
                              {option.values.map(value => {
                                const isSelected = selectedOptions?.[option.name] === value;

                                return (
                                  <button
                                    key={value}
                                    className={`Avada-VariantOptionValue ${
                                      isSelected ? '-selected' : ''
                                    }`}
                                    onClick={() => onSelectOption(option.name, value)}
                                  >
                                    {value}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="Avada-ConfirmButton">
                        {stockQty > 0 ? 'Confirm' : 'Out of stock'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quantity */}
              {stickyForm.showQtyInput && (
                <div className="Avada-Offer__CountQuantity">
                  {stickyForm.showQtyInput && (
                    <div className="Avada-Offer__CountQuantity">
                      <div className="Avada-Label">{stickyForm.qtyText}</div>
                      <div className="Avada-Quantity">
                        <div className="Avada-Quantity__QuantityInput">
                          <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={quantity}
                            onInput={e => {
                              const value = e.target.value;

                              onChangeQty(value.replace(/\D/g, ''));
                            }}
                            onBlur={() => {
                              if (!quantity || quantity < 1) {
                                onChangeQty(1);
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Button */}
            <button
              className="Avada-Offer__ButtonAddToCart"
              style={{
                backgroundColor: stickyForm.buttonBackgroundColor,
                color: stickyForm.buttonTextColor
              }}
            >
              <span className="btn-text">Add to cart</span>
              <span className="spinner"></span>
            </button>
          </>
        </>
      </div>
    </>
  );
}

StickyCartPreviewDesktop.propTypes = {
  options: PropTypes.object,
  stickyForm: PropTypes.object,
  product: PropTypes.object,
  formValue: PropTypes.object,
  onChangeQty: PropTypes.func,
  onSelectOption: PropTypes.func,
  isMobile: PropTypes.bool
};
