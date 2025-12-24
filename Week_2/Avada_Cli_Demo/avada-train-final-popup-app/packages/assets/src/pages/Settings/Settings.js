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
import TabSettingTheme from '@assets/components/TabSettingTheme/TabSettingTheme';

const tabs = [
  {
    id: 'display-setting-notification-1',
    content: 'Display',
    panelID: 'display-setting-notification-1'
  },
  {
    id: 'trigger-notification-1',
    content: 'Triggers',
    panelID: 'trigger-notification-1'
  },
  {
    id: 'theme-notification-1',
    content: 'Theme',
    panelID: 'thme-notification-1'
  }
];
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [selected, setSelected] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});

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

    const validationErrors = validateSettings(settingForm);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setEditLoading(false);

      return;
    }

    const newSettingForm = await handleEdit(settingForm);

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
          <div className="preview-sticky">
            <Layout.Section variant="oneThird">
              <Card roundedAbove="sm">
                <Box minHeight="150px">
                  <BlockStack gap="500">
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
                </Box>
              </Card>
            </Layout.Section>
          </div>

          <Layout.Section>
            <LegacyCard>
              <div className="Avada_SP_tabs">
                {!fetched && <SettingSkeleton />}
                {fetched && input && (
                  <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
                    <LegacyCard.Section title={tabs[selected].title}>
                      {selected === 0 && <TabSettingDisplay errors={errors} />}
                      {selected === 1 && <TabSettingTriggers />}
                      {selected === 2 && <TabSettingTheme />}
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

const validateSettings = settings => {
  const errors = {};

  if (settings.firstDelay < 0 || settings.firstDelay > 80) {
    errors.firstDelay = 'The value is invalid';
  }

  if (settings.displayDuration < 0 || settings.displayDuration > 80) {
    errors.displayDuration = 'The value is invalid';
  }

  if (settings.maxPopsDisplay < 0 || settings.maxPopsDisplay > 80) {
    errors.maxPopsDisplay = 'The value is invalid';
  }

  if (settings.popsInterval < 0 || settings.popsInterval > 80) {
    errors.popsInterval = 'The value is invalid';
  }

  return errors;
};

Settings.propTypes = {};
