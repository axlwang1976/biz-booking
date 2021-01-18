/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Typography, Select } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createDevice } from '../../redux/actions/devicesActions';
import { getMeetingRooms } from '../../redux/actions/meetingRoomsActions';

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const DeviceCreate = ({
  collapsed,
  isLoading,
  createDevice,
  getMeetingRooms,
  meetingRooms,
  history,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newDevice = { DeviceID: vals.DeviceID, RoomNo: vals.RoomNo };
    createDevice(userAuth, newDevice);
    form.resetFields();
    setTimeout(() => {
      history.push('/device');
    }, 1000);
  };

  useEffect(() => {
    getMeetingRooms(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createDevice" />
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
            label={<FormattedMessage id="app.deviceID" />}
            name="DeviceID"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.inRoom" />}
            name="RoomNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select>
              {meetingRooms.map((room) => (
                <Select.Option key={room.ID} value={room.ID}>
                  {room.RoomName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="device" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ areas, meetingRooms }) => ({
  isLoading: areas.isLoading,
  meetingRooms: meetingRooms.meetingRooms,
});

export default connect(mapStateToProps, { createDevice, getMeetingRooms })(
  DeviceCreate
);
