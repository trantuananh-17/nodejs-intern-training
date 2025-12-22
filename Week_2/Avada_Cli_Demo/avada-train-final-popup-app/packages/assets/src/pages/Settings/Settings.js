import React, {useCallback, useEffect, useState} from 'react';
import {Button, Layout, LegacyCard, Page, Spinner, Tabs} from '@shopify/polaris';
import NotificationPopup from '@assets/components/NotificationPopup/NotificationPopup';
import '@assets/styles/pages/setting.scss';
import TabSettingDisplay from '@assets/components/TabSettingDisplay/TabSettingDisplay';
import TabSettingTriggers from '@assets/components/TabSettingTriggers/TabSettingTriggers';
import {useSettingFormContext} from '@assets/contexts/settingFormContext';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
import {SettingSkeleton} from '../../components/Skeletons/SettingSkeleton/SettingSkeleton';

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

  const {settingForm, setSettingForm} = useSettingFormContext();

  const {loading, data: input, setData: setInput, setLoading, fetched} = useFetchApi({
    url: '/settings',
    defaultData: null
  });

  const handleTabChange = useCallback(selectedTabIndex => setSelected(selectedTabIndex), []);

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
        <Button variant="primary" size="medium" onClick={handleSave} disabled={editLoading}>
          <span style={{visibility: editLoading ? 'hidden' : 'visible'}}>Save</span>

          {editLoading && (
            <span
              style={{
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                inset: 0
              }}
            >
              <Spinner accessibilityLabel="Saving" size="small" />
            </span>
          )}
        </Button>
      }
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup settings={settingForm} />
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
    </Page>
  );
}

Settings.propTypes = {};
