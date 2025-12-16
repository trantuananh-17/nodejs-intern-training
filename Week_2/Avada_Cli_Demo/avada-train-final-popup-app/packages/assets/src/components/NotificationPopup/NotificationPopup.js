import React from 'react';
import PropTypes from 'prop-types';
import './NoticationPopup.scss';
import {Timestamp} from 'firebase/firestore';
import {Icon} from '@shopify/polaris';
import {XIcon} from '@shopify/polaris-icons';
import {formatTimeAgo} from '../../helpers/utils/formatFullTime';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Puffer Jacket With Hidden Hood',
  timestamp = Timestamp.fromDate(new Date()),
  productImage = 'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400',
  settings = {hideTimeAgo: false, truncateProductName: false}
}) => {
  const timeAgo = formatTimeAgo(timestamp);

  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>Purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                {timeAgo}{' '}
                <span className="uni-blue">
                  <i className="fa fa-check" aria-hidden="true" /> by Avada
                </span>
              </div>
            </div>
            <button className="Avada-SP__Btn">
              <Icon source={XIcon} tone="base" />
            </button>
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
