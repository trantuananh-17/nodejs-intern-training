import React, {useCallback, useEffect, useState} from 'react';
import {
  BlockStack,
  Box,
  Button,
  Card,
  InlineGrid,
  InlineStack,
  Layout,
  LegacyCard,
  Page,
  Tabs,
  Text
} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import '@assets/styles/pages/setting.scss';
import TabSettingDisplay from '@assets/components/TabSettingDisplay/TabSettingDisplay';
import TabSettingTriggers from '@assets/components/TabSettingTriggers/TabSettingTriggers';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import {SettingSkeleton} from '../../components/Skeletons/SettingSkeleton/SettingSkeleton';
import {ViewIcon} from '@shopify/polaris-icons';
import PreviewNotificationModal from '@assets/components/PreviewNotificationModal/PreviewNotificationModal';

const tabs = [
  {
    id: 'display-setting-notification-1',
    content: 'Display',
    title: 'APPEARENCE',
    accessibilityLabel: 'APPEARENCE',
    panelID: 'display-setting-notification-1'
  },
  {
    id: 'trigger-notification-1',
    content: 'Triggers',
    title: 'PAGES RESTRICTION',
    accessibilityLabel: 'PAGES RESTRICTION',
    panelID: 'trigger-notification-1'
  }
];
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [active, setActive] = useState(false);

  const {settingForm, setSettingForm} = useSettingFormContext();

  const {loading, data: input, setData: setInput, fetched} = useFetchApi({
    url: '/settings',
    defaultData: null
  });

  // Chuyển tab setting
  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

  // Mở preview
  const handleChange = useCallback(() => setActive(!active), [active]);

  const {handleEdit} = useEditApi({
    url: '/settings'
  });

  const handleSave = async () => {
    setEditLoading(true);
    const newSettingForm = await handleEdit(settingForm);
    console.log(newSettingForm);

    setInput(newSettingForm);
    if (newSettingForm) {
      console.log('Saved!');
    }

    setEditLoading(false);
  };

  useEffect(() => {
    if (input) {
      setSettingForm(prev => ({
        ...prev,
        ...input
      }));
    }
  }, [input]);

  return (
    <Page
      title="Settings"
      subtitle="Decide how your notifications will display"
      primaryAction={
        <Button
          variant="primary"
          size="medium"
          onClick={handleSave}
          disabled={editLoading}
          loading={loading || editLoading}
        >
          <span style={{visibility: editLoading ? 'hidden' : 'visible'}}>Save</span>
        </Button>
      }
    >
      <Box paddingBlockEnd={600}>
        <Layout>
          <Layout.Section variant="oneThird">
            <Card roundedAbove="sm">
              <BlockStack gap="200">
                <InlineGrid columns="1fr auto">
                  <Text as="h2" variant="headingSm">
                    Preview
                  </Text>
                  <Button
                    onClick={handleChange}
                    accessibilityLabel="Open Preview"
                    icon={ViewIcon}
                    loading={loading}
                  />
                </InlineGrid>
                <InlineStack blockAlign="center">
                  {fetched && input && <NotificationPopup settings={settingForm} />}
                </InlineStack>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <LegacyCard>
              <div className="Avada_SP_tabs">
                {!fetched && <SettingSkeleton />}
                {fetched && input && (
                  <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section title={tabs[selected].title}>
                      {selected === 0 && <TabSettingDisplay />}
                      {selected === 1 && <TabSettingTriggers />}
                    </LegacyCard.Section>
                  </Tabs>
                )}
              </div>
            </LegacyCard>
          </Layout.Section>
        </Layout>
      </Box>

      {active && (
        <PreviewNotificationModal
          active={active}
          handleChange={handleChange}
          settings={settingForm}
        />
      )}
    </Page>
  );
}

Settings.propTypes = {};
