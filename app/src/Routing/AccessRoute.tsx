import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Routes from '../Global/Routes';
import authStore from '../Store/authStore';

const AccessRoute = ({Component, exact, access }: any) => {
  const { currentUser } = authStore;
  const isAccessible = currentUser?.userAccess.some((a: number) => access.includes(a));
  
  return (
    <Route
      exact={exact}
      render={() => (
        isAccessible
          ? <Component />
          : <Redirect to={Routes.notFound} />)}
    />
  );
};

export default AccessRoute;
