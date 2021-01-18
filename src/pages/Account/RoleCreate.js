import React, { useState } from 'react';
import { Form, Input, Layout, message, Typography, Switch } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateRole } from '../../redux/actions/rolesActions';

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const RoleCreate = ({
  collapsed,
  isLoading,
  createOrUpdateRole,
  history,
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
    const newRole = {
      ...vals,
      ID: 0,
      Company: newCompanyAuth,
      Device: newDeviceAuth,
      UserGroup: newGroupAuth,
      Channel: newChannelAuth,
      Media: newMediaAuth,
      Room: newRoomAuth,
      Meeting: newMeetingAuth,
    };
    createOrUpdateRole(userAuth, newRole);
    form.resetFields();
    setTimeout(() => {
      history.push('/account/role');
    }, 1000);
  };

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createRole" />
      </Typography.Title>
      <PageContent>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
          onFinishFailed={(err) =>
            message.error('Form validation failed. Try again.')
          }
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
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setCompanyAuthDetail({ ...companyAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.deviceAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setDeviceAuthDetail({ ...deviceAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.groupAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setGroupAuthDetail({ ...groupAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.channelAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setChannelAuthDetail({ ...channelAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.mediaAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setMediaAuthDetail({ ...mediaAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.roomAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setRoomAuthDetail({ ...roomAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item label={<FormattedMessage id="app.meetingAuth" />}>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
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
                defaultChecked
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, create: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.delete" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, delete: e })
                }
                style={{ marginRight: 20 }}
              />
              <span style={{ marginRight: 5 }}>
                <FormattedMessage id="app.update" />
              </span>
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                defaultChecked
                onChange={(e) =>
                  setMeetingAuthDetail({ ...meetingAuthDetail, update: e })
                }
              />
            </Form.Item>
          )}
          <Form.Item {...tailLayout}>
            <FormButton path="account/role" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ roles }) => ({
  isLoading: roles.isLoading,
});

export default connect(mapStateToProps, { createOrUpdateRole })(RoleCreate);
