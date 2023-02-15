import React from "react";
import { Layout, Space } from 'antd';
import TALogo from '../../Assets/Images/talogo.svg';
import VoiceBoxLogo from '../../Assets/Images/vblogo.svg';

const { Header } = Layout;

function PSGHeader() {
  return ( 
  <>
      <Header className="vb-header">
        <div className="logo">
          <Space size={16}>
            <img src={TALogo} height="40px" alt="ta logo" />
            <img src={VoiceBoxLogo} height="28px" alt="ta logo" />
          </Space>
        </div>
        </Header>
    </>
  );
}
export default PSGHeader;