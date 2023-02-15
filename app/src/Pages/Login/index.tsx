/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React from 'react';
import {
  Button,
  Layout, Space,
} from 'antd';
import TALogo from '../../Assets/Images/talogo.svg';
import VoiceBoxLogo from '../../Assets/Images/vblogo.svg';
import {useHistory} from "react-router-dom"


function Login() {

  const history = useHistory();

  const navigateToAnonymous = () => {
    history.push("/anonymousVoice");
  }

  const onSSOLogin = () => {
    if (
      process.env.REACT_APP_SSO_APP_ID !== undefined &&
      process.env.REACT_APP_SSO_SERVER !== undefined
    ) {
      window.location.href =
        process.env.REACT_APP_SSO_SERVER +
        '/sso/auth/login?appId=' +
        process.env.REACT_APP_SSO_APP_ID;
    }
  }


  return (
    <>
    {/* <RaiseYourVoice />
    <AnonymousVoice /> */}
       <Layout.Content id="login-container" className="h-100">
        <div className='vb-login-container'>
          <Space direction="vertical" size={48}>
            <div className='vb-logo'>
              <Space size={16}>
                <img src={TALogo} alt="ta logo" />
                <img src={VoiceBoxLogo} alt="ta logo" />
              </Space>
            </div>
            <Space direction="vertical" size={16} align="center" className='w-100'>
              <Button type="primary" className='px-5' onClick={() => {onSSOLogin()}}>Login with Kite</Button>
              <Button type="link" onClick={() => {navigateToAnonymous()}} >Login as Anonymous</Button>
            </Space>
          </Space>
        </div>
      </Layout.Content>
    </> 
  );
}

export default Login;
