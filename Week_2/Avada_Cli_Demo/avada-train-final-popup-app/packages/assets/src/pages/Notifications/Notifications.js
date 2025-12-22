import {Box, InlineStack, Page, Pagination} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationList from '@assets/components/NotificationList/NotificationList';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationListSkeleton from '../../components/Skeletons/NotificationSkeleton/NotificationSkeleton';

const PAGE_SIZE = 5;

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const {loading, data: notifications = []} = useFetchApi({
    url: '/notifications'
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

  return (
    <Page title="Notifications" subtitle="List of sales notification from Shopify">
      {loading && <NotificationListSkeleton />}

      {!loading && (
        <>
          <NotificationList
            items={paginatedItems}
            sortValue={sortValue}
            setSortValue={setSortValue}
            setCurrentPage={setCurrentPage}
          />

          {totalPages > 1 && (
            <Box padding="800">
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
      )}
    </Page>
  );
}
