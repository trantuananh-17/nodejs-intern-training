import PropTypes from 'prop-types';
import {createContext, useContext, useState} from 'react';
import React from 'react';

const defaultStickyForm = {
  status: false,
  showProductImage: true,
  showProductPrice: true,
  showQtyInput: true,
  showVariantMobile: false,
  qtyText: 'Quantity',
  successResponse: '👏 Item added to cart!',

  enableDesktop: false,
  enableMobile: true,
  position: 'avada-position-top',

  bgColor: '#ffffff',
  buttonBackgroundColor: '#000000',
  priceColor: '#000000',
  productNameColor: '#000000',
  specialPriceColor: '#FF0000',
  buttonTextColor: '#ffffff',
  buttonBorderRadius: 'none',

  hideOutStock: true,
  cartRedirectCheckout: false,
  showOnHomePage: true,
  specificProducts: [
    {
      status: 'ACTIVE',
      tags: ['Accessory', 'Sport', 'Winter'],
      title: 'Selling Plans Ski Wax'
    }
  ],
  customBtn: true,

  btnAddCartText: 'Add to cart'
};

const StickyFormContext = createContext({
  stickyForm: defaultStickyForm,
  updateSticky: () => {},
  updateStickies: () => {}
});

export const StickyFormProvider = ({children}) => {
  const [stickyForm, setStickyForm] = useState(defaultStickyForm);

  const updateSticky = (key, value) => {
    setStickyForm(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const updateStickies = payload => {
    setStickyForm(prev => ({
      ...prev,
      ...payload
    }));
  };

  return (
    <StickyFormContext.Provider
      value={{
        stickyForm,
        setStickyForm,
        updateSticky,
        updateStickies
      }}
    >
      {children}
    </StickyFormContext.Provider>
  );
};

export const useStickyFormContext = () => useContext(StickyFormContext);

StickyFormProvider.propTypes = {
  children: PropTypes.node
};
