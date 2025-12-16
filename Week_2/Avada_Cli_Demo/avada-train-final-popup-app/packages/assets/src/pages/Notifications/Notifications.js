import {Box, InlineStack, Page, Pagination} from '@shopify/polaris';
import React from 'react';
import NotificationList from '@assets/components/NotificationList/NotificationList';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationListSkeleton from '../../components/Skeletons/NotificationSkeleton/NotificationSkeleton';

export default function Notifications() {
  const {loading, data: notifications, setData: setNotifications, fetched} = useFetchApi({
    url: '/notifications'
  });

  console.log(notifications);

  return (
    <Page title="Notifications" subtitle="List of sales notifcation from Shopify">
      {loading && <NotificationListSkeleton />}

      {/* List Notification */}
      {!loading && notifications && (
        <>
          <NotificationList items={notifications} />

          {/* Pagination */}
          <Box padding={'800'}>
            <InlineStack align="center" blockAlign="center">
              <Pagination
                hasPrevious
                onPrevious={() => {
                  console.log('Previous');
                }}
                hasNext
                onNext={() => {
                  console.log('Next');
                }}
              />
            </InlineStack>
          </Box>
        </>
      )}
    </Page>
  );
}
