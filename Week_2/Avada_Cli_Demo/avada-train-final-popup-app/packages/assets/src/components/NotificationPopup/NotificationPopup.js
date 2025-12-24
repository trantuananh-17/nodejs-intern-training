import React from 'react';
import PropTypes from 'prop-types';
import './NoticationPopup.scss';
import {formatTimeAgo} from '@assets/helpers/utils/formatFullTime';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = '2025-12-17T07:10:49.000Z',
  productImage = 'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400',
  settings
}) => {
  const {
    hideTimeAgo,
    truncateProductName,
    backgroundColor,
    backgroundImage,
    actionColorStart,
    actionColorEnd,
    isGradient,
    hideBackgroundSelect,
    headingColor,
    textColor,
    timeColor
  } = settings;

  const timeAgo = formatTimeAgo(timestamp);

  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div
          className="Avava-SP__Container"
          style={
            hideBackgroundSelect
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: '100% 100%',
                  backgroundRepeat: 'no-repeat'
                }
              : isGradient
              ? {
                  backgroundImage: `linear-gradient(to right,
                  ${actionColorStart},
                  ${actionColorEnd})`
                }
              : {backgroundColor: `${backgroundColor}`}
          }
        >
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'} style={{color: `${headingColor}`}}>
                {firstName} in {city}, {country}
              </div>
              <div
                className={`Avada-SP__Subtitle ${truncateProductName ? 'subtitle-truncate' : ''}`}
                style={{color: `${textColor}`}}
              >
                Purchased {productName}
              </div>
              <div
                className="Avada-SP__Footer"
                style={{
                  visibility: hideTimeAgo ? 'hidden' : 'visible',
                  color: `${timeColor}`
                }}
              >
                {timeAgo}
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  firstName: PropTypes.string,
  city: PropTypes.string,
  country: PropTypes.string,
  productName: PropTypes.string,
  timestamp: PropTypes.string,
  productImage: PropTypes.string,
  settings: PropTypes.object
};

export default NotificationPopup;
