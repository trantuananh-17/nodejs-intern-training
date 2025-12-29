import {useStickyFormContext} from '@assets/contexts/stickyFormContext';
import {Box, Button, InlineStack, Modal, Text, Thumbnail} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';
import StickyATCProducts from './StickyATCProducts';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import ProductSkeleton from '../Skeletons/ProductSekeleton/ProductSekeleton';

export default function StickyATCSelectProductModal() {
  const {stickyForm, updateSticky} = useStickyFormContext();
  const [active, setActive] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const selectedProductId = stickyForm.specificProducts?.[0]?.id;

  const {loading, data: product, fetched, fetchApi} = useFetchApi({
    url: `/product/${selectedProductId}`,
    initLoad: false
  });

  useEffect(() => {
    if (!stickyForm.showOnHomePage) return;
    fetchApi(`/product/${selectedProductId}`);
  }, [stickyForm.showOnHomePage]);

  useEffect(() => {
    if (!product) return;

    updateSticky('specificProducts', [product]);
    console.log('sync');
  }, [product]);

  return (
    <>
      <Box paddingBlock={'400'} paddingInline={'600'}>
        {loading && !fetched ? (
          <ProductSkeleton />
        ) : (
          <InlineStack align="space-between" blockAlign="center">
            <div className="Avada-Block_Flex1">
              {stickyForm.specificProducts.map(product => (
                <InlineStack gap={'300'} blockAlign="center" key={product.id}>
                  <Thumbnail size="small" source={product.image} />
                  <div className="Avada-Block_Flex1">
                    <Box>
                      <InlineStack>
                        <Box>
                          <Text as="h3" fontWeight="medium">
                            {product.title}
                          </Text>
                        </Box>
                      </InlineStack>
                    </Box>
                  </div>
                </InlineStack>
              ))}
            </div>
            <Button onClick={handleChange}>Edit product</Button>
          </InlineStack>
        )}
      </Box>
      <Modal
        open={active}
        onClose={handleChange}
        title="Select product"
        primaryAction={{
          content: 'Select',
          onAction: () => {
            if (!selectedProduct) return;

            updateSticky('specificProducts', [selectedProduct]);

            handleChange();
          },
          disabled: !selectedProduct
        }}
        secondaryActions={[
          {
            content: 'Cancel',
            onAction: handleChange
          }
        ]}
      >
        <Modal.Section>
          <StickyATCProducts selectedProduct={selectedProduct} onSelect={setSelectedProduct} />
        </Modal.Section>
      </Modal>
    </>
  );
}

StickyATCSelectProductModal.propTypes = {};
