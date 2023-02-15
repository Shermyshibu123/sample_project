/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { useState } from "react";
import { observer } from "mobx-react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import Routes from "../../Global/Routes";
import authStore from "../../Store/authStore";
import Constant from "../../Global/Constant";
import Icon from "../Icon/index";
import {
  CommentOutlined,
  UsergroupAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;
function VBSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const user = authStore.currentUser;
  return (
    <>
      {!user?.userAccess.length ? (
        ""
      ) : (
        <Sider
          id="sidebar"
          className="vb-aside"
          collapsible
          collapsed={collapsed}
          onCollapse={(value: any) => setCollapsed(value)}
        >
          <Menu className="border-0 pb-4" mode="inline" selectedKeys={[""]}>
            <Menu.Item key="3" icon={<CommentOutlined />}>
              <NavLink to={Routes.voice}> Dashboard</NavLink>
            </Menu.Item>

            {user?.userAccess.includes(Constant.userAccess.users) && (
              <Menu.Item icon={<UsergroupAddOutlined />}>Users</Menu.Item>
            )}
            {user?.userAccess.includes(Constant.userAccess.userRoles) && (
              <Menu.Item icon={<UserAddOutlined />}>User Role</Menu.Item>
            )}
            {user && user.userAccess.includes(Constant.userAccess.users) && (
              <Menu.Item key="4">
                <NavLink to={Routes.users}>
                  {" "}
                  <Icon className="icon-20 mr-2" iconRef="#user" />
                  Users
                </NavLink>
              </Menu.Item>
            )}
            {user && user.userAccess.includes(Constant.userAccess.userRoles) && (
              <Menu.Item key="5">
                <NavLink to={Routes.userRole}>
                  {" "}
                  <Icon className="icon-18 mr-2" iconRef="#userrole" />
                  User Role
                </NavLink>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
      )}
    </>
  );
}

export default observer(VBSidebar);
