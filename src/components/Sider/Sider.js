import React from 'react';
import { Layout } from 'antd';

import './Sider.css';
import Logo from '../Logo/Logo';
import MainMenu from '../MainMenu/MainMenu';

const Sider = ({ collapsed, setCollapsed, logout, userAuth }) => {
  const { Sider } = Layout;

  const handleCollapse = (isCollapsed) => setCollapsed(isCollapsed);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      breakpoint="md"
      className="sider"
    >
      <Logo />
      <MainMenu logout={logout} userAuth={userAuth} />
    </Sider>
  );
};

export default Sider;
