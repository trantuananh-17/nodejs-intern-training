import Preview from '@assets/components/Preview/Preview';
import PreviewStickyATCModal from '@assets/components/PreviewStickyATCModal/PreviewStickyATCModal';
import CartStickySkeleton from '@assets/components/Skeletons/CartStickySkeleton/CartStickySkeleton';
import StickySettingAdvanced from '@assets/components/StickyAddToCard/StickySettingAdvanced';
import StickySettingContent from '@assets/components/StickyAddToCard/StickySettingContent';
import StickySettingDisplay from '@assets/components/StickyAddToCard/StickySettingDisplay';
import StickySettingStyle from '@assets/components/StickyAddToCard/StickySettingStyle';
import StickyCart from '@assets/components/StickyCart/StickyCart';
import {useStickyFormContext} from '@assets/contexts/stickyFormContext';
import useEditApi from '@assets/hooks/api/useEditApi';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import {Badge, BlockStack, Box, Button, Layout, Page} from '@shopify/polaris';
import React, {useCallback, useEffect, useState} from 'react';

export default function StickyAddToCart() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const {stickyForm, setStickyForm} = useStickyFormContext();
  const [editLoading, setEditLoading] = useState(false);

  const {loading, data: cartSticky, setData: setCartSticky, fetched} = useFetchApi({
    url: '/cart/sticky',
    defaultData: null
  });

  const {handleEdit} = useEditApi({
    url: '/cart/sticky'
  });

  const handleChange = useCallback(() => setActive(!active), [active]);

  const handleToggle = useCallback(() => setOpen(open => !open), []);

  const handleSave = async () => {
    setEditLoading(true);

    const cartStickyForm = await handleEdit(stickyForm);

    setCartSticky(cartStickyForm);
    if (cartStickyForm) {
      console.log('Saved!');
    }

    setEditLoading(false);
  };

  useEffect(() => {
    if (cartSticky) {
      setStickyForm(prev => ({
        ...prev,
        ...cartSticky
      }));
    }
  }, [cartSticky]);
  return fetched && cartSticky ? (
    <Page
      title="Sticky Add To Cart"
      titleMetadata={<Badge tone="success">Active</Badge>}
      subtitle="Increase conversion rate and fast checkout with Sticky Add-To-Cart. Sticky Cart is always visible when customers scroll down or beyond the original Add To Cart button."
      primaryAction={
        <Button
          variant="primary"
          size="medium"
          onClick={handleSave}
          disabled={editLoading}
          loading={loading || editLoading}
        >
          <span>Save</span>
        </Button>
      }
    >
      <Box paddingBlockEnd={600}>
        <Layout>
          <Layout.Section variant="oneThird">
            <Preview
              onChange={handleChange}
              fetched={true}
              data={1}
              preview={<StickyCart />}
              inline={false}
            />
          </Layout.Section>

          <Layout.Section>
            <BlockStack gap="400">
              <StickySettingContent />
              <StickySettingDisplay />
              <StickySettingStyle />
              <StickySettingAdvanced open={open} onToggle={handleToggle} />
            </BlockStack>
          </Layout.Section>
        </Layout>
      </Box>
      {active && <PreviewStickyATCModal active={active} handleChange={handleChange} />}
    </Page>
  ) : (
    <CartStickySkeleton />
  );
}
