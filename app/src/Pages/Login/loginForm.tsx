/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Layout, Spin, notification } from "antd";
import Routes from "../../Global/Routes";
import authStore from "../../Store/authStore";
import userRoleService from "../../Services/userRoleService";

function LoginForm() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const autoLoginWithSSO = () => {
    authStore.ssoLogin((err: any) => {
      setLoading(false);
      if (err) {
        setLoading(false)
        notification.error({
          description: err,
          message: 'Error',
        });
        return;
      }
      userRoleService.getUserRoles();
      history.push(Routes.home);
    });
  };
  useEffect(() => {
    setLoading(true)
    autoLoginWithSSO();
  }, []);

  return (
    <Layout.Content id='login-container' className='h-100'>
      <div className="align-items-center position-relative d-flex flex-column justify-content-center h-100">
        <Spin spinning={loading} size="large" ></Spin>
      </div>
    </Layout.Content>
  );
}

export default LoginForm;
