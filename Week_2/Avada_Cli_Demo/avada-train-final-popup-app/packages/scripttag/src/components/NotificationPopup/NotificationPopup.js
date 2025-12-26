import React from 'react';
import './NoticationPopup.scss';
import {formatTimeAgo} from '../../helpers/formatTime';
import PropTypes from 'prop-types';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = 'a day ago',
  productImage = 'http://paris.mageplaza.com/images/shop/single/big-1.jpg',
  hideBackgroundSelect,
  actionColorStart,
  backgroundImage,
  backgroundColor,
  actionColorEnd,
  headingColor,
  isGradient,
  textColor,
  timeColor
}) => {
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
            />
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'} style={{color: `${headingColor}`}}>
                {firstName} in {city}, {country}
              </div>
              <div className={`Avada-SP__Subtitle`} style={{color: `${textColor}`}}>
                Purchased {productName}
              </div>
              <div className={'Avada-SP__Footer'}>
                <span
                  className={`Avada-SP__TimeAgo`}
                  style={{
                    color: `${timeColor}`
                  }}
                >
                  {formatTimeAgo(timestamp)}{' '}
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {
  city: PropTypes.string,
  country: PropTypes.string,
  isGradient: PropTypes.bool,
  timeColor: PropTypes.string,
  hideTimeAgo: PropTypes.bool,
  timestamp: PropTypes.string,
  firstName: PropTypes.string,
  textColor: PropTypes.string,
  productName: PropTypes.string,
  productImage: PropTypes.string,
  headingColor: PropTypes.string,
  actionColorEnd: PropTypes.string,
  backgroundImage: PropTypes.string,
  backgroundColor: PropTypes.string,
  actionColorStart: PropTypes.string,
  truncateProductName: PropTypes.bool,
  hideBackgroundSelect: PropTypes.bool
};

export default NotificationPopup;
