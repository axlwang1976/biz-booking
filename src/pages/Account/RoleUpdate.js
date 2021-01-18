/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Input, Layout, message, Typography, Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateRole, getRole } from '../../redux/actions/rolesActions';
import Spinner from '../../components/Spinner/Spinner';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const RoleUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateRole,
  getRole,
  history,
  selectRole,
  match,
  userAuth,
}) => {
  const [companyAuth, setCompanyAuth] = useState(true);
  const [companyAuthDetail, setCompanyAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [deviceAuth, setDeviceAuth] = useState(true);
  const [deviceAuthDetail, setDeviceAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [groupAuth, setGroupAuth] = useState(true);
  const [groupAuthDetail, setGroupAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [channelAuth, setChannelAuth] = useState(true);
  const [channelAuthDetail, setChannelAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [mediaAuth, setMediaAuth] = useState(true);
  const [mediaAuthDetail, setMediaAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [roomAuth, setRoomAuth] = useState(true);
  const [roomAuthDetail, setRoomAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [meetingAuth, setMeetingAuth] = useState(true);
  const [meetingAuthDetail, setMeetingAuthDetail] = useState({
    create: true,
    delete: true,
    update: true,
  });
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newCompanyAuth = parseInt(
      [
        companyAuth,
        companyAuthDetail.create,
        companyAuthDetail.delete,
        companyAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newDeviceAuth = parseInt(
      [
        deviceAuth,
        deviceAuthDetail.create,
        deviceAuthDetail.delete,
        deviceAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newGroupAuth = parseInt(
      [
        groupAuth,
        groupAuthDetail.create,
        groupAuthDetail.delete,
        groupAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newChannelAuth = parseInt(
      [
        channelAuth,
        channelAuthDetail.create,
        channelAuthDetail.delete,
        channelAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newMediaAuth = parseInt(
      [
        mediaAuth,
        mediaAuthDetail.create,
        mediaAuthDetail.delete,
        mediaAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newRoomAuth = parseInt(
      [
        roomAuth,
        roomAuthDetail.create,
        roomAuthDetail.delete,
        roomAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const newMeetingAuth = parseInt(
      [
        meetingAuth,
        meetingAuthDetail.create,
        meetingAuthDetail.delete,
        meetingAuthDetail.update,
      ]
        .map((el) => (el ? 1 : 0))
        .reverse()
        .join(''),
      2
    );
    const updatedRole = {
      ...vals,
      ID: selectRole.ID,
      Company: newCompanyAuth,
      Device: newDeviceAuth,
      UserGroup: newGroupAuth,
      Channel: newChannelAuth,
      Media: newMediaAuth,
      Room: newRoomAuth,
      Meeting: newMeetingAuth,
    };
    createOrUpdateRole(userAuth, updatedRole);
    setTimeout(() => {
      history.push('/account/role');
    }, 1000);
  };

  useEffect(() => {
    getRole(userAuth, match.params.ID);
  }, []);

  useEffect(() => {
    if (selectRole) {
      if (selectRole.Company === 1) {
        setCompanyAuth(true);
        setCompanyAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Company === 15) {
        setCompanyAuth(true);
        setCompanyAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.Device === 1) {
        setDeviceAuth(true);
        setDeviceAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Device === 15) {
        setDeviceAuth(true);
        setDeviceAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.UserGroup === 1) {
        setGroupAuth(true);
        setGroupAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.UserGroup === 15) {
        setGroupAuth(true);
        setGroupAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.Channel === 1) {
        setChannelAuth(true);
        setChannelAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Channel === 15) {
        setChannelAuth(true);
        setChannelAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.Media === 1) {
        setMediaAuth(true);
        setMediaAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Media === 15) {
        setMediaAuth(true);
        setMediaAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.Room === 1) {
        setRoomAuth(true);
        setRoomAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Room === 15) {
        setRoomAuth(true);
        setRoomAuthDetail({ create: true, delete: true, update: true });
      }
      if (selectRole.Meeting === 1) {
        setMeetingAuth(true);
        setMeetingAuthDetail({ create: false, delete: false, update: false });
      } else if (selectRole.Meeting === 15) {
        setMeetingAuth(true);
        setMeetingAuthDetail({ create: true, delete: true, update: true });
      }
    }
  }, [selectRole]);

  return selectRole ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.updateRole" />
      </Typography.Title>
      <PageContent>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          form={form}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
          onFinishFailed={(err) =>
            message.error('Form validation failed. Try again.')
          }
          initialValues={{ RoleName: selectRole.RoleName }}
        >
          <Form.Item
            label={<FormattedMessage id="app.roleName" />}
            name="RoleName"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="app.companyAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setCompanyAuth(e);
                  setCompanyAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setCompanyAuth(e);
                }
              }}
              checked={companyAuth}
            />
          </Form.Item>
          {companyAuth && (
            <Form.Item label={<FormattedMessage id="app.companyAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={companyAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={companyAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, update: e })
                }
                checked={companyAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.deviceAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setDeviceAuth(e);
                  setDeviceAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setDeviceAuth(e);
                }
              }}
              checked={deviceAuth}
            />
          </Form.Item>
          {deviceAuth && (
            <Form.Item label={<FormattedMessage id="app.deviceAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={deviceAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={deviceAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, update: e })
                }
                checked={deviceAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.groupAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setGroupAuth(e);
                  setGroupAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setGroupAuth(e);
                }
              }}
              checked={groupAuth}
            />
          </Form.Item>
          {groupAuth && (
            <Form.Item label={<FormattedMessage id="app.groupAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={groupAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={groupAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, update: e })
                }
                checked={groupAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.channelAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setChannelAuth(e);
                  setChannelAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setChannelAuth(e);
                }
              }}
              checked={channelAuth}
            />
          </Form.Item>
          {groupAuth && (
            <Form.Item label={<FormattedMessage id="app.channelAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={channelAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={channelAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, update: e })
                }
                checked={channelAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.mediaAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setMediaAuth(e);
                  setMediaAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setMediaAuth(e);
                }
              }}
              checked={mediaAuth}
            />
          </Form.Item>
          {groupAuth && (
            <Form.Item label={<FormattedMessage id="app.mediaAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={mediaAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={mediaAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, update: e })
                }
                checked={mediaAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.roomAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setRoomAuth(e);
                  setRoomAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setRoomAuth(e);
                }
              }}
              checked={roomAuth}
            />
          </Form.Item>
          {groupAuth && (
            <Form.Item label={<FormattedMessage id="app.roomAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={roomAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={roomAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, update: e })
                }
                checked={roomAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.meetingAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              onChange={(e) => {
                if (e === false) {
                  setMeetingAuth(e);
                  setMeetingAuthDetail({
                    create: false,
                    delete: false,
                    update: false,
                  });
                } else {
                  setMeetingAuth(e);
                }
              }}
              checked={meetingAuth}
            />
          </Form.Item>
          {groupAuth && (
            <Form.Item label={<FormattedMessage id="app.meetingAuthSet" />}>
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.create" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
                checked={meetingAuthDetail.create}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
                checked={meetingAuthDetail.delete}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, update: e })
                }
                checked={meetingAuthDetail.update}
              />
            </Form.Item>
          )}
          <Form.Item {...tailLayout}>
            <FormButton path="account/role" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ roles }) => ({
  isLoading: roles.isLoading,
  selectRole: roles.selectRole,
});

export default connect(mapStateToProps, { createOrUpdateRole, getRole })(
  RoleUpdate
);
