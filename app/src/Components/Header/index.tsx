import React from 'react';
import { Dropdown, Layout, Menu, Popconfirm, Space, Avatar } from 'antd';
import authStore from '../../Store/authStore';
import TALogo from '../../Assets/Images/talogo.svg';
import VoiceBoxLogo from '../../Assets/Images/vblogo.svg';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const content = (
  <div>
    <p>Are you sure you want to logout?</p>
  </div>
);
const menu = (
  <Menu>
    <Popconfirm
      className="header-popover"
      placement="bottomRight"
      title={content}
      onConfirm={() => authStore.signOut()}
      okText="Yes"
      cancelText="No"
    >
      <Menu.Item>Logout</Menu.Item>
    </Popconfirm>
  </Menu>
);
function VBHeader() {
  return (
    <>
      <Header className="vb-header">
        <div className="logo">
          <Space size={16}>
            <img src={TALogo} height="40px" alt="ta logo" />
            <img src={VoiceBoxLogo} height="28px" alt="ta logo" />
          </Space>
        </div>
        <Dropdown overlay={menu} placement="bottomRight">
          <a>
            <Space>
              <Avatar style={{ backgroundColor: '#BC6DB4' }} icon={<UserOutlined />} />
              {authStore.currentUser?.name}
              <DownOutlined />
            </Space>
          </a>
        </Dropdown>
      </Header>
      {/* <Layout.Header id="header" className="px-4 py-2">
      <Layout.Content className="d-flex header-menu-items align-items-center">
        <div className="flex-fill">
          <p className="welcome-note mb-0">
            Welcome {authStore.currentUser?.name}
          </p>
        </div>
        <div className="flex-auto cursor-pointer logout pl-4">
          <div className="d-flex">
            {authStore.currentUser?.institutionName && (
              <p className="mb-0 institution-name pr-3 mr-3">
                {authStore.currentUser?.institutionName}
              </p>
            )}

            <Popconfirm
              className="header-popover"
              placement="bottomRight"
              title={content}
              onConfirm={() => authStore.signOut()}
              okText="Yes"
              cancelText="No"
            >
              <div style={{ cursor: "pointer" }}>
                <Icon className="icon-16 mr-1" iconRef="#logout" /> Logout
              </div>
            </Popconfirm>
          </div>
        </div>
      </Layout.Content>
    </Layout.Header> */}
    </>
  );
}

export default VBHeader;
