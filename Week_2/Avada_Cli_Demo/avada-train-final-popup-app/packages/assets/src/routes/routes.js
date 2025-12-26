import Loading from '@assets/components/Loading';
import {routePrefix} from '@assets/config/app';
import Home from '@assets/loadables/Home/Home';
import NotFound from '@assets/loadables/NotFound/NotFound';
import Notifications from '@assets/loadables/Notifications';
import Settings from '@assets/loadables/Settings/Settings';
import StickyAddToCart from '@assets/loadables/StickyAddToCart';
import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import {SettingFormProvider} from '@assets/contexts/settingFormContext';
import {StickyFormProvider} from '@assets/contexts/stickyFormContext';

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <SettingFormProvider>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path={prefix + '/'} component={Home} />
        <Route exact path={prefix + '/settings'} component={Settings} />
        <Route exact path={prefix + '/notifications'} component={Notifications} />
        <Route
          exact
          path={prefix + '/sticky-add-to-cart'}
          render={() => (
            <StickyFormProvider>
              <StickyAddToCart />
            </StickyFormProvider>
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  </SettingFormProvider>
);

export default Routes;
