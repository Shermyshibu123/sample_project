import React from 'react';
import { Layout, Result } from 'antd';

function NotAuthorized() {
  return (
    <Layout.Content className="d-flex align-items-center justify-content-center">
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not allowed to view this page. Please contact Administrator."
      />
    </Layout.Content>
  );
}

export default NotAuthorized;
