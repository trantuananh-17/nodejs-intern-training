import React, {useCallback, useState} from 'react';
import {Frame} from '@shopify/polaris';
import Header from '@assets/layouts/Header';
import DashboardNavigation from '@assets/layouts/DashboardNavigation';
import logoImg from '@assets/resources/icons/logo_img.png';

// const logo = {
//   topBarSource: 'https://cdn.shopify.com/s/files/1/2376/3301/files/Shopify_Secondary_Inverted.png',
//   width: 86,
//   url: '#',
//   accessibilityLabel: 'Shopify'
// };

const logo = {
  topBarSource: logoImg,
  width: 86,
  url: '/',
  accessibilityLabel: 'avada'
};

// eslint-disable-next-line react/prop-types
export default function DashboardLayout({children}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavOpen(open => !open);
  }, []);

  return (
    <Frame
      showMobileNavigation={mobileNavOpen}
      onNavigationDismiss={toggleMobileNavigation}
      topBar={<Header handleNavigationToggle={toggleMobileNavigation} />}
      navigation={<DashboardNavigation />}
      logo={logo}
    >
      <div style={{background: '#fff', minHeight: '100vh'}}>{children}</div>
    </Frame>
  );
}
