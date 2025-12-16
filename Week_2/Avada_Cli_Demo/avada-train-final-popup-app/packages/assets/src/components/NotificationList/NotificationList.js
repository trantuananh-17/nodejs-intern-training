import {
  BlockStack,
  InlineStack,
  LegacyCard,
  ResourceItem,
  ResourceList,
  Text
} from '@shopify/polaris';
import React, {useState} from 'react';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import PropTypes from 'prop-types';
import {formatDateOnly} from '../../helpers/utils/formatFullTime';

export default function NotificationList({items}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');

  const resourceName = {
    singular: 'customer',
    plural: 'customers'
  };

  // const items = [
  //   {
  //     id: '1',
  //     firstName: 'John Doe',
  //     city: 'New York',
  //     country: 'United States',
  //     productName: 'Puffer Jacket With Hidden Hood',
  //     timestamp: Timestamp.fromDate(new Date()),
  //     productImage:
  //       'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400'
  //   },
  //   {
  //     id: '2',
  //     firstName: 'Emily Carter',
  //     city: 'Los Angeles',
  //     country: 'United States',
  //     productName: 'Sport Sneaker Pro X',
  //     timestamp: Timestamp.fromDate(new Date('2022-11-15')),
  //     productImage:
  //       'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400'
  //   },
  //   {
  //     id: '3',
  //     firstName: 'Liam Nguyen',
  //     city: 'Toronto',
  //     country: 'Canada',
  //     productName: 'Vintage Leather Backpack',
  //     timestamp: Timestamp.fromDate(new Date('2022-11-15')),
  //     productImage:
  //       'https://cdn.shopify.com/s/files/1/0974/6405/8168/files/Main_b13ad453-477c-4ed1-9b43-81f3345adfd6_800x800.jpg?v=1765174400'
  //   }
  // ];

  // const promotedBulkActions = [
  //   {
  //     content: 'Edit customers',
  //     onAction: () => console.log('Todo: implement bulk edit')
  //   }
  // ];

  const bulkActions = [
    {
      content: 'Delete notifications',
      onAction: () => console.log('Todo: implement bulk delete')
    }
  ];

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        // promotedBulkActions={promotedBulkActions}
        bulkActions={bulkActions}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
        ]}
        onSortChange={selected => {
          setSortValue(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
      />
    </LegacyCard>
  );

  function renderItem(item) {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;
    // const media = <NotificationCard />;
    const formattedDate = formatDateOnly(timestamp);

    const [monthDay, year] = formattedDate.split(',');

    return (
      <ResourceItem
        id={id}
        // media={media}
        accessibilityLabel={`View details for ${name}`}
        persistActions
      >
        <InlineStack align="space-between" blockAlign="center">
          <NotificationPopup
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={timestamp}
            productImage={productImage}
          />
          <BlockStack align="end" inlineAlign="end">
            <Text as="p" fontWeight="regular" variant="bodySm">
              From {monthDay},
            </Text>
            <Text as="p" fontWeight="regular" variant="bodySm">
              {year}
            </Text>
          </BlockStack>
        </InlineStack>
      </ResourceItem>
    );
  }
}

NotificationList.propTypes = {
  items: PropTypes.object
};
