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
import {useSettingFormContext} from '@assets/contexts/settingFormContext';

export default function NotificationList({
  items,
  sortValue,
  setSortValue,
  setCurrentPage,
  creating,
  deleting,
  handleDelete
}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const {settingForm} = useSettingFormContext();

  const resourceName = {
    singular: 'customer',
    plural: 'customers'
  };

  const bulkActions = [
    {
      content: 'Delete sales pops',
      onAction: () => {
        handleDelete(selectedItems);
        setSelectedItems([]);
      }
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
        // totalItemsCount={items.length}
        sortValue={sortValue}
        bulkActions={bulkActions}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
        ]}
        onSortChange={value => {
          setSortValue(value);
          setCurrentPage(1);
        }}
        loading={creating || deleting}
      />
    </LegacyCard>
  );

  function renderItem(item) {
    const {id, firstName, city, country, productName, timestamp, productImage} = item;
    const formattedDate = formatDateOnly(timestamp);
    const [monthDay, year] = formattedDate.split(',');

    return (
      <ResourceItem id={id} persistActions>
        <InlineStack align="space-between" blockAlign="center">
          <NotificationPopup
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={timestamp}
            productImage={productImage}
            settings={settingForm}
          />
          <BlockStack align="end" inlineAlign="end">
            <Text as="p" variant="bodySm">
              From {monthDay},
            </Text>
            <Text as="p" variant="bodySm">
              {year}
            </Text>
          </BlockStack>
        </InlineStack>
      </ResourceItem>
    );
  }
}

NotificationList.propTypes = {
  items: PropTypes.array,
  sortValue: PropTypes.string,
  setSortValue: PropTypes.func,
  setCurrentPage: PropTypes.func,
  creating: PropTypes.bool,
  deleting: PropTypes.bool,
  handleDelete: PropTypes.func
};
