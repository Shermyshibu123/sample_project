/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import authStore from './Store/authStore';
import ApplicationRoutes from './Routing/ApplicationRoutes';
import 'antd/dist/antd.css';
import './App.less';

export class App extends React.Component {
  constructor(props: {}) {
    super(props);
    authStore.addAuthListener((user:any) => {
      authStore.currentUser = user;
      this.forceUpdate();
    });
  }

  render() {
    return (
      <Router>
        <Layout.Content className='h-100 main-wrapper'>
          <ApplicationRoutes />
        </Layout.Content>
      </Router>
    );
  }
}

export default App;
