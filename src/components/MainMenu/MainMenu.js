import React, { useState } from 'react';
import { Menu, Modal } from 'antd';
import {
  DashboardOutlined,
  LogoutOutlined,
  UserOutlined,
  FundProjectionScreenOutlined,
  PlaySquareOutlined,
  CalendarOutlined,
  ApartmentOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { FormattedMessage } from 'react-intl';
import { NavLink, withRouter } from 'react-router-dom';

import './MainMenu.css';

const MainMenu = ({ history, logout, userAuth }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);

  const handleOk = () => {
    logout();
    history.push('/');
    // window.location.reload();
  };

  const handleCancel = () => setVisible(false);

  return (
    <>
      <Menu theme="dark" mode="inline" className="menu">
        <Menu.Item key="1">
          <NavLink to="/">
            <DashboardOutlined />
            <FormattedMessage id="app.dashboard" />
          </NavLink>
        </Menu.Item>
        {userAuth.Uid !== '00000000' && (
          <>
            <Menu.SubMenu
              key="sub3"
              icon={<PlaySquareOutlined />}
              title={<FormattedMessage id="app.contents" />}
            >
              <Menu.Item key="10">
                <NavLink to="/content/media">
                  <FormattedMessage id="app.media" />
                </NavLink>
              </Menu.Item>
              {/* <Menu.Item key="11">
                <NavLink to="/content/content">
                  <FormattedMessage id="app.contents" />
                </NavLink>
              </Menu.Item> */}
              <Menu.Item key="14">
                <NavLink to="/content/schedule">
                  <FormattedMessage id="app.schedules" />
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub4"
              icon={<CalendarOutlined />}
              title={<FormattedMessage id="app.meetingManage" />}
            >
              <Menu.Item key="12">
                <NavLink to="/meeting/meeting">
                  <FormattedMessage id="app.meetings" />
                </NavLink>
              </Menu.Item>
              <Menu.Item key="13">
                <NavLink to="/meeting/booking">
                  <FormattedMessage id="app.bookingRoom" />
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="15">
              <NavLink to="/device">
                <VideoCameraOutlined />
                <FormattedMessage id="app.device" />
              </NavLink>
            </Menu.Item>
          </>
        )}
        <Menu.SubMenu
          key="sub5"
          icon={<ApartmentOutlined />}
          title={<FormattedMessage id="app.company" />}
        >
          <Menu.Item key="2">
            <NavLink to="/company">
              <FormattedMessage id="app.company" />
            </NavLink>
          </Menu.Item>
          {userAuth.Uid !== '00000000' && (
            <>
              <Menu.Item key="6">
                <NavLink to="/room/area">
                  <FormattedMessage id="app.area" />
                </NavLink>
              </Menu.Item>
              <Menu.Item key="7">
                <NavLink to="/room/meeting-room">
                  <FormattedMessage id="app.meeting" />
                </NavLink>
              </Menu.Item>
            </>
          )}
        </Menu.SubMenu>
        {userAuth.Uid !== '00000000' && (
          <>
            <Menu.SubMenu
              key="sub1"
              icon={<UserOutlined />}
              title={<FormattedMessage id="app.accounts" />}
            >
              <Menu.Item key="4">
                <NavLink to="/account/user-group">
                  <FormattedMessage id="app.userGroup" />
                </NavLink>
              </Menu.Item>
              <Menu.Item key="5">
                <NavLink to="/account/user">
                  <FormattedMessage id="app.user" />
                </NavLink>
              </Menu.Item>
              <Menu.Item key="3">
                <NavLink to="/account/role">
                  <FormattedMessage id="app.role" />
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="sub2"
              icon={<FundProjectionScreenOutlined />}
              title={<FormattedMessage id="app.equipment" />}
            >
              <Menu.Item key="8">
                <NavLink to="/room/equipment-type">
                  <FormattedMessage id="app.equipmentType" />
                </NavLink>
              </Menu.Item>
              <Menu.Item key="9">
                <NavLink to="/room/equipment">
                  <FormattedMessage id="app.equipment" />
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </>
        )}
        <Menu.Item key="99" onClick={showModal}>
          <LogoutOutlined />
          <FormattedMessage id="app.logout" />
        </Menu.Item>
      </Menu>
      <Modal
        title={<FormattedMessage id="app.logout" />}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={<FormattedMessage id="app.submit" />}
        cancelText={<FormattedMessage id="app.cancel" />}
      >
        <p>
          <FormattedMessage id="app.logoutDescription" />
        </p>
      </Modal>
    </>
  );
};

export default withRouter(MainMenu);
