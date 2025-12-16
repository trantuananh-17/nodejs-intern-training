import {Navigation} from '@shopify/polaris';
import {HomeFilledIcon, NotificationFilledIcon, SettingsFilledIcon} from '@shopify/polaris-icons';
import React from 'react';
import {useLocation} from 'react-router-dom/cjs/react-router-dom.min';

export default function DashboardNavigation() {
  const location = useLocation();

  const isEmbedPath = location.pathname.startsWith('/embed');

  const normalizedPath = isEmbedPath ? location.pathname.replace('/embed', '') : location.pathname;

  return (
    <Navigation location={normalizedPath}>
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: HomeFilledIcon,
            selected: normalizedPath === '/' || normalizedPath === ''
          },
          {
            url: '/notifications',
            label: 'Notifications',
            icon: NotificationFilledIcon
            // badge: '15',
          },
          {
            url: '/settings',
            label: 'Settings',
            icon: SettingsFilledIcon
          }
        ]}
      />
    </Navigation>
  );
}
