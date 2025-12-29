import useFetchApi from '@assets/hooks/api/useFetchApi';
import {
  BlockStack,
  Box,
  Checkbox,
  Divider,
  InlineStack,
  ResourceItem,
  ResourceList,
  Text,
  TextField,
  Thumbnail
} from '@shopify/polaris';
import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

export default function StickyATCProducts({selectedProduct, onSelect}) {
  const [variables, setVariables] = useState({
    hasNext: false,
    endCursor: null
  });

  const selectedId = selectedProduct?.id ?? null;

  const {loading, data: products} = useFetchApi({
    url: '/products',
    initQueries: {limit: 10, cursor: variables.endCursor}
  });

  useEffect(() => {
    if (!products) return;

    setVariables(prev => ({
      ...prev,
      hasNext: products.pagination?.hasNext ?? false,
      endCursor: products.endCursor ?? null
    }));
  }, [products]);

  return (
    <BlockStack>
      <TextField
        label="Search product"
        labelHidden
        placeholder="Search products"
        autoComplete="on"
        clearButton
      />

      <Box paddingBlockStart={'300'}>
        <Divider />
      </Box>

      {products && (
        <ResourceList
          loading={loading}
          resourceName={{singular: 'product', plural: 'products'}}
          items={products}
          renderItem={item => {
            const {id, title, image} = item;

            const isSelected = selectedId === id;
            const isDisabled = selectedId !== null && !isSelected;

            return (
              <ResourceItem
                id={id}
                accessibilityLabel={title}
                onClick={() => {
                  if (isDisabled) return;

                  onSelect(isSelected ? null : item);
                }}
              >
                <InlineStack gap="300" align="start" blockAlign="center">
                  <Checkbox label="" labelHidden checked={isSelected} disabled={isDisabled} />

                  <Thumbnail source={image} alt={title} size="small" />

                  <InlineStack align="space-between" blockAlign="center" width="100%">
                    <Text as="span" variant="bodyMd">
                      {title}
                    </Text>
                  </InlineStack>
                </InlineStack>
              </ResourceItem>
            );
          }}
        />
      )}
    </BlockStack>
  );
}

StickyATCProducts.propTypes = {
  selectedProduct: PropTypes.object,
  onSelect: PropTypes.func
};
