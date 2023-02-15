/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../Global/Routes';
import authStore from '../Store/authStore';

const PublicRoute = ({
  component: Component, restricted, path, exact,
}: any) => (
  <Route
    exact={exact}
    path={path}
    render={() => (
      authStore.currentUser != null && restricted
        ? <Redirect to={Routes.home} />
        : <Component />)}
  />
);            
export default PublicRoute;