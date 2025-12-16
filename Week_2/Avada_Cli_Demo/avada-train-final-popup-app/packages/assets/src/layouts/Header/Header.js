import {useStore} from '@assets/reducers/storeReducer';
import '@assets/styles/layout/header.scss';
import {Avatar, Text, TopBar} from '@shopify/polaris';
import {useCallback} from 'react';
import React from 'react';

// eslint-disable-next-line react/prop-types
function Header({handleNavigationToggle}) {
  const {state} = useStore();
  const {shop} = state;

  const handleSearchResultsDismiss = useCallback(() => {
    setIsSearchActive(false);
    setSearchValue('');
  }, []);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={
        <div className="avatar-container">
          <Avatar name={shop?.name} initials={shop?.name?.charAt(0)} size="lg" />
          <Text variant="bodyMd" as="p">
            {shop?.name}
          </Text>
        </div>
      }
      onSearchResultsDismiss={handleSearchResultsDismiss}
      onNavigationToggle={handleNavigationToggle}
    />
  );

  return topBarMarkup;
}
export default Header;
