/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../Global/Routes';
import authStore from '../Store/authStore';

const PrivateRoute = ({Component, path, exact }: any) => {
 return(
  <Route
    exact={exact}
    path= {path}
  render={() => (authStore.currentUser !== null ?  <Component/>: <Redirect to={Routes.login} />)}
  />
 )
}
;

export default PrivateRoute;
