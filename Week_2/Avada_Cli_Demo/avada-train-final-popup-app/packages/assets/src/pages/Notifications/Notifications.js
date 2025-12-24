import {BlockStack, Box, InlineStack, Page, Pagination} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationList from '@assets/components/NotificationList/NotificationList';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationListSkeleton from '../../components/Skeletons/NotificationSkeleton/NotificationSkeleton';
import NotificationBanner from '@assets/components/NotificationBanner/NotificationBanner';
import useCreateApi from '@assets/hooks/api/useCreateApi';
import useDeleteApi from '@assets/hooks/api/useDeleteApi';

const PAGE_SIZE = 5;

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [bannerActive, setBannerActive] = useState(true);

  const {loading, data: notifications = [], setData: setNotifications} = useFetchApi({
    url: '/notifications'
  });

  const {handleCreate, creating} = useCreateApi({
    url: '/notifications',
    fullResp: true,
    successCallback: resp => {
      setNotifications(resp.data);
      setCurrentPage(1);
    }
  });

  const {handleDelete, deleting} = useDeleteApi({
    url: '/notifications',
    fullResp: true,
    successCallback: resp => {
      setNotifications(resp.data);
      setCurrentPage(1);
    }
  });

  // SORT
  const sortedItems = [...notifications].sort((a, b) => {
    if (sortValue === 'DATE_MODIFIED_DESC') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    }
    return new Date(a.timestamp) - new Date(b.timestamp);
  });

  // PAGINATION
  const totalItems = sortedItems.length;
  const totalPages = Math.ceil(totalItems / PAGE_SIZE);

  const paginatedItems = sortedItems.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleHideBanner = () => {
    setBannerActive(false);
  };

  const handleSyncNotifications = async () => {
    const data = {};
    await handleCreate(data);
  };

  const handleDeleteNotifications = async ids => {
    await handleDelete({data: {ids}});
  };

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      <BlockStack gap={400}>
        {bannerActive && (
          <NotificationBanner
            handleHideBanner={handleHideBanner}
            loading={creating}
            handleSync={handleSyncNotifications}
          />
        )}

        {!loading ? (
          <>
            <NotificationList
              items={paginatedItems}
              sortValue={sortValue}
              setSortValue={setSortValue}
              setCurrentPage={setCurrentPage}
              creating={creating}
              deleting={deleting}
              handleDelete={handleDeleteNotifications}
            />

            {totalPages >= 1 && (
              <Box paddingBlockEnd="800">
                <InlineStack align="center">
                  <Pagination
                    hasPrevious={currentPage > 1}
                    hasNext={currentPage < totalPages}
                    onPrevious={() => setCurrentPage(p => p - 1)}
                    onNext={() => setCurrentPage(p => p + 1)}
                  />
                </InlineStack>
              </Box>
            )}
          </>
        ) : (
          <NotificationListSkeleton />
        )}
      </BlockStack>
    </Page>
  );
}
