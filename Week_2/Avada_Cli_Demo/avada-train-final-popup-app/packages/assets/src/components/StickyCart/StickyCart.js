import React from 'react';
import './StickyCart.scss';

export default function StickyCart() {
  return (
    <div className="Avada-PreviewWrapper__Container">
      <div className="Avada-PreviewWrapper">
        <div
          className="Avada_PreviewMobile__Wrapper"
          style={{
            backgroundRepeat: 'no-repeat',
            backgroundImage:
              'url("https://cdnapps.avada.io/upsell/preview/preview-sticky-add-to-cart-mobile.png")',
            backgroundColor: 'rgb(247, 247, 247)',
            backgroundSize: 'cover'
          }}
        >
          <div className="Avada_PreviewMobile__Inline">
            <div
              className="Avada-StickyATC-ProductInfo avada-position-bottom -preview -mobile -visible"
              style={{
                background: 'rgb(255, 255, 255)',
                '--border-radius-atc': '4px'
              }}
            >
              <div className="Avada-StickyATC-ProductInfo__Top">
                <div
                  className="Avada-ThumbnailImage__Wrapper"
                  style={{border: '1px solid rgb(227, 227, 227)'}}
                >
                  <div className="Avada-ThumbnailImage__Image">
                    <img
                      alt=""
                      src="https://cdnapps.avada.io/boost-sales/offerProducts/avada-short-sleeve-t-shirt.jpg"
                    />
                  </div>
                </div>

                <div className="Avada-StickyATC-Heading">
                  <span className="Avada-StickyATC-Title" style={{color: 'rgb(0, 0, 0)'}}>
                    Avada Short Sleeve T-shirt
                  </span>

                  <div className="Avada-StickyATC-Price">
                    <span className="Avada-StickyATC-DiscountPrice" style={{color: 'rgb(0, 0, 0)'}}>
                      $70.00
                    </span>
                    <span className="Avada-StickyATC-ActualPrice" style={{color: 'rgb(255, 0, 0)'}}>
                      $90.00
                    </span>
                  </div>
                </div>
              </div>

              <div className="Avada-StickyATC-Quantity">
                <span>Quantity</span>
                <input value="1" readOnly />
              </div>

              <button
                className="Avada-Offer__ButtonAddToCart"
                style={{
                  backgroundColor: 'rgb(0, 0, 0)',
                  color: 'rgb(255, 255, 255)'
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
