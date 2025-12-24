import Loading from '@assets/components/Loading';
import {routePrefix} from '@assets/config/app';
import Home from '@assets/loadables/Home/Home';
import NotFound from '@assets/loadables/NotFound/NotFound';
import Notifications from '@assets/loadables/Notifications';
import OptionalScopes from '@assets/loadables/OptionalScopes/OptionalScopes';
import Samples from '@assets/loadables/Samples/Samples';
import Settings from '@assets/loadables/Settings/Settings';
import Tables from '@assets/loadables/Tables/Tables';
import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import {SettingFormProvider} from '../contexts/settingFormContext';

const FullscreenPageA = React.lazy(() => import('../pages/FullscreenPageA'));

// eslint-disable-next-line react/prop-types
const Routes = ({prefix = routePrefix}) => (
  <Suspense fallback={<Loading />}>
    <Switch>
      <SettingFormProvider>
        <Route exact path={prefix + '/'} render={props => <Home {...props} />} />
        <Route exact path={prefix + '/settings'} render={props => <Settings {...props} />} />
        <Route
          exact
          path={prefix + '/notifications'}
          render={props => <Notifications {...props} />}
        />
      </SettingFormProvider>
      <Route exact path={prefix + '/samples'} component={Samples} />
      <Route exact path={prefix + '/fullscreen-page-a'} component={FullscreenPageA} />
      <Route exact path={prefix + '/optional-scopes'} component={OptionalScopes} />
      <Route exact path={prefix + '/tables'} component={Tables} />
      <Route exact path={prefix + '/tables/:tab(simple|action)'} component={Tables} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
