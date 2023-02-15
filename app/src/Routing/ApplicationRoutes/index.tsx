import React, { Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import PublicRoute from "../PublicRoute";
import PrivateRoute from "../PrivateRoute";
import AccessRoute from "../AccessRoute";
import Constant from "../../Global/Constant";
import Routes from "../../Global/Routes";
import "./style.css";
import authStore from "../../Store/authStore";
import LoadingTemplate from "../../Components/LoadingTemplate/LoadingTemplate";
import VBHeader from "../../Components/Header";
import VBSidebar from "../../Components/Sidebar";
import AnonymousVoice from "../../Pages/AnonymousVoice";

const SSOLogin = React.lazy(() => import("../../Pages/Login/loginForm"));
const Login = React.lazy(() => import("../../Pages/Login"));
const NotFound = React.lazy(() => import("../../Pages/NotFound"));
const NotEXIST = React.lazy(() => import("../../Pages/NotExist"));
const Users = React.lazy(() => import("../../Pages/Users"));
const UserRole = React.lazy(() => import("../../Pages/UserRole"));
const VoicePage = React.lazy(() => import("../../Pages/Voice"))
const RaiseVoice = React.lazy(() => import("../../Pages/PSG/psgVoice"))


const { users, userRoles, dashboard } =
  Constant.userAccess;

const getaccessRoute = () => {
  const { currentUser } = authStore;
  let redictTo = Routes.users;
  console.log(currentUser)
  if (currentUser) {
    if (currentUser.userAccess.includes(dashboard)) {
      redictTo = Routes.voice;
    } else if (currentUser.userAccess.includes(users)) {
      redictTo = Routes.users;
    } else if (currentUser.userAccess.includes(userRoles)) {
      redictTo = Routes.userRole;
    }
  }
  return redictTo;
};
const MainComponent = () => (

<Layout className="h-100">
    <VBHeader />
    <Layout>
      <VBSidebar />
      <Layout.Content className='vb-content'>
        <Suspense fallback={getLoader()}>
          <Switch>            
            <Route path={Routes.home} exact >
              <Redirect to={getaccessRoute()} />
             </Route>
             <AccessRoute
              path={Routes.voice}
              Component={VoicePage}
              access={[dashboard]}
              exact
            />
            <AccessRoute
              path={Routes.users}
              component={Users}
              access={[users]}
              exact
            />
            <AccessRoute
              path={Routes.userRole}
              component={UserRole}
              access={[userRoles]}
              exact
            />
            <Redirect to={Routes.notFound}/>
          </Switch>
        </Suspense>
      </Layout.Content>
    </Layout>
  </Layout>
);

const Router = () => (
  <Suspense fallback={getLoader()}>
    <Switch>
      <PublicRoute exact path={Routes.preLogin} component={Login}/>
      <PublicRoute restricted={true}
        path={Routes.login + "/:sessionId"}
        component={SSOLogin}
        exact
      />
      <PublicRoute restricted={true}
        path={Routes.login}
        component={Login}
        exact
      />
      <Route path={Routes.anonymous} component={AnonymousVoice}/>
      <PublicRoute restricted={false}
        path={Routes.raiseVoice}
        component={RaiseVoice}
        exact
      />
      <PrivateRoute path={Routes.home} component={MainComponent} />        
      <Route path={Routes.notFound} component={NotFound} exact />
      <Route path={Routes.notExist} component={NotEXIST} exact />
    </Switch>
  </Suspense>
);

const getLoader = () => {
  const pathName = window.location.pathname.split("/")[1];
  if (Routes.platform.includes(pathName)) {
    return <LoadingTemplate id="ShowroomLoadingScreen" />;
  }
  return null;
};

export default Router;
