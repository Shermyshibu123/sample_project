import React from 'react';
import { Layout } from 'antd';
import error_icon from '../../Assets/Images/error_icon.png';

function NotFound() {

  return (
    <Layout.Content id="" className="h-100">
      <div className="h-100 d-flex flex-column">
        <div className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="text-center">
            <img style={{ "maxWidth": "200px" }} src={error_icon} alt={error_icon}></img>
          </div>
          <h1 style={{ margin: '8px 0', fontSize: '25px', fontWeight: 500, color: '#1e1b4a' }}
          >We are sorry...</h1>
          <div style={{ textAlign: 'center' }}>
            <p style={{ margin: '0px auto', color: 'rgba(0,0,0,.45)', fontSize: '16px', fontWeight: 300, maxWidth: '65%' }}
            >The page you requested was not found, please try the feedback URL again, and if the error still persists kindly connect us.</p>
          </div>
        </div>
      </div>
    </Layout.Content >
  );
}

export default NotFound;
