import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Sider from './components/Sider/Sider';
import Header from './components/Header/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import Company from './pages/Company/Company';
import CompanyCreate from './pages/Company/CompanyCreate';
import CompanyUpdate from './pages/Company/CompanyUpdate';
import Role from './pages/Account/Role';
import RoleCreate from './pages/Account/RoleCreate';
import RoleUpdate from './pages/Account/RoleUpdate';
import Group from './pages/Account/Group';
import GroupCreate from './pages/Account/GroupCreate';
import GroupUpdate from './pages/Account/GroupUpdate';
import User from './pages/Account/User';
import UserCreate from './pages/Account/UserCreate';
import UserUpdate from './pages/Account/UserUpdate';
import LogIn from './pages/LogIn/LogIn';
import { login, authLogin, logout } from './redux/actions/authActions';
import MeetingRoom from './pages/Room/MeetingRoom';
import Area from './pages/Room/Area';
import AreaCreate from './pages/Room/AreaCreate';
import AreaUpdate from './pages/Room/AreaUpdate';
import MeetingRoomCreate from './pages/Room/MeetingRoomCreate';
import MeetingRoomUpdate from './pages/Room/MeetingRoomUpdate';
import EquipmentType from './pages/Room/EquipmentType';
import EquipmentTypeCreate from './pages/Room/EquipmentTypeCreate';
import EquipmentTypeUpdate from './pages/Room/EquipmentTypeUpdate';
import Equipment from './pages/Room/Equipment';
import EquipmentCreate from './pages/Room/EquipmentCreate';
import EquipmentUpdate from './pages/Room/EquipmentUpdate';
import Media from './pages/Content/Media';
import MediaUpload from './pages/Content/MediaUpload';
import Content from './pages/Content/Content';
import ContentCreate from './pages/Content/ContentCreate';
import Meeting from './pages/Meeting/Meeting';
import MeetingCreate from './pages/Meeting/MeetingCreate';
import MeetingUpdate from './pages/Meeting/MeetingUpdate';
import BookingRoom from './pages/Meeting/BookingRoom';
import BookingRoomCreate from './pages/Meeting/BookingRoomCreate';
import BookingRoomUpdate from './pages/Meeting/BookingRoomUpdate';
import Schedule from './pages/Content/Schedule';
import ChannelCreate from './pages/Content/ChannelCreate';
import ChannelUpdate from './pages/Content/ChannelUpdate';
import ScheduleCreate from './pages/Content/ScheduleCreate';
import ScheduleUpdate from './pages/Content/ScheduleUpdate';
import DeviceCreate from './pages/Device/DeviceCreate';
import Device from './pages/Device/Device';

const savedAuth = JSON.parse(localStorage.getItem('loginInfo'));
let logoutTimer;

const App = ({
  setLocale,
  locale,
  messages,
  login,
  authLogin,
  logout,
  isLoading,
  userAuth,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (savedAuth) {
      authLogin(savedAuth.Accesstoken, savedAuth.Client, savedAuth.Uid);
    }
  }, [authLogin]);

  useEffect(() => {
    if (userAuth.Accesstoken) {
      logoutTimer = setTimeout(logout, 600000);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [logout, userAuth.Accesstoken]);

  return userAuth.Accesstoken ? (
    <Layout>
      <Sider
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        logout={logout}
        userAuth={userAuth}
      />
      <Layout style={{ minHeight: '100vh' }}>
        <Header
          setLocale={setLocale}
          locale={locale}
          messages={messages}
          userAuth={userAuth}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Dashboard collapsed={collapsed} />}
          />
          <Route
            exact
            path="/company"
            render={(routeProps) => (
              <Company
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/company/create"
            render={(routeProps) => (
              <CompanyCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/company/:taxID"
            render={(routeProps) => (
              <CompanyUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/account/role"
            render={(routeProps) => (
              <Role {...routeProps} collapsed={collapsed} userAuth={userAuth} />
            )}
          />
          <Route
            path="/account/role/create"
            render={(routeProps) => (
              <RoleCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/account/role/:ID"
            render={(routeProps) => (
              <RoleUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/account/user-group"
            render={(routeProps) => (
              <Group
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/account/user-group/create"
            render={(routeProps) => (
              <GroupCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/account/user-group/:ID"
            render={(routeProps) => (
              <GroupUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/account/user"
            render={(routeProps) => (
              <User {...routeProps} collapsed={collapsed} userAuth={userAuth} />
            )}
          />
          <Route
            path="/account/user/create"
            render={(routeProps) => (
              <UserCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/account/user/:ID"
            render={(routeProps) => (
              <UserUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/area"
            render={(routeProps) => (
              <Area {...routeProps} collapsed={collapsed} userAuth={userAuth} />
            )}
          />
          <Route
            path="/room/area/create"
            render={(routeProps) => (
              <AreaCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            path="/room/area/:ID"
            render={(routeProps) => (
              <AreaUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/meeting-room"
            render={(routeProps) => (
              <MeetingRoom
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/meeting-room/create"
            render={(routeProps) => (
              <MeetingRoomCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/meeting-room/:ID"
            render={(routeProps) => (
              <MeetingRoomUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment-type"
            render={(routeProps) => (
              <EquipmentType
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment-type/create"
            render={(routeProps) => (
              <EquipmentTypeCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment-type/:ID"
            render={(routeProps) => (
              <EquipmentTypeUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment"
            render={(routeProps) => (
              <Equipment
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment/create"
            render={(routeProps) => (
              <EquipmentCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/room/equipment/:ID"
            render={(routeProps) => (
              <EquipmentUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/media"
            render={(routeProps) => (
              <Media
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/media/upload"
            render={(routeProps) => (
              <MediaUpload
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/content"
            render={(routeProps) => (
              <Content
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/content/create"
            render={(routeProps) => (
              <ContentCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/schedule"
            render={(routeProps) => (
              <Schedule
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/channel/create"
            render={(routeProps) => (
              <ChannelCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/channel/:ID"
            render={(routeProps) => (
              <ChannelUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/channel/:ID/schedule/create"
            render={(routeProps) => (
              <ScheduleCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/content/channel/:channelID/schedule/:scheduleID"
            render={(routeProps) => (
              <ScheduleUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/meeting"
            render={(routeProps) => (
              <Meeting
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/meeting/create"
            render={(routeProps) => (
              <MeetingCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/meeting/:ID"
            render={(routeProps) => (
              <MeetingUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/booking"
            render={(routeProps) => (
              <BookingRoom
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/booking/create"
            render={(routeProps) => (
              <BookingRoomCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/meeting/booking/:ID"
            render={(routeProps) => (
              <BookingRoomUpdate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/device"
            render={(routeProps) => (
              <Device
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Route
            exact
            path="/device/create"
            render={(routeProps) => (
              <DeviceCreate
                {...routeProps}
                collapsed={collapsed}
                userAuth={userAuth}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </Layout>
    </Layout>
  ) : (
    <LogIn isLoading={isLoading} login={login} />
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  userAuth: {
    Accesstoken: auth.Accesstoken,
    Client: auth.Client,
    Uid: auth.Uid,
  },
});

export default connect(mapStateToProps, { login, authLogin, logout })(App);
