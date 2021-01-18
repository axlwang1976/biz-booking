/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Radio,
  Select,
  Typography,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateMeetingRoom } from '../../redux/actions/meetingRoomsActions';
import { getAreas } from '../../redux/actions/areasActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const MeetingRoomCreate = ({
  collapsed,
  isLoading,
  createOrUpdateMeetingRoom,
  history,
  getAreas,
  areas,
  userAuth,
}) => {
  const [isMeetingRoom, setIsMeetingRoom] = useState(true);
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newMeetingRoom = {
      ...vals,
      ID: 0,
    };
    // console.log(newMeetingRoom);
    createOrUpdateMeetingRoom(userAuth, newMeetingRoom);
    form.resetFields();
    setTimeout(() => {
      history.push('/room/meeting-room');
    }, 1000);
  };

  useEffect(() => {
    getAreas(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createRoom" />
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
          initialValues={{ NotReady: false, Meeting: true, Virtual: false }}
        >
          <Form.Item
            label={<FormattedMessage id="app.roomName" />}
            name="RoomName"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="app.areaNote" />} name="Note">
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.maxMen" />}
            name="MaxMen"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.inArea" />}
            name="AreaNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select>
              {areas &&
                areas.map((area) => (
                  <Select.Option key={area.ID} value={area.ID}>
                    {area.AreaName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.isRoomMeeting" />}
            name="Meeting"
          >
            <Radio.Group onChange={(e) => setIsMeetingRoom(e.target.value)}>
              <Radio value={true}>
                <FormattedMessage id="app.yes" />
              </Radio>
              <Radio value={false}>
                <FormattedMessage id="app.no" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          {isMeetingRoom && (
            <>
              <Form.Item
                label={<FormattedMessage id="app.isVirtual" />}
                name="Virtual"
              >
                <Radio.Group>
                  <Radio value={true}>
                    <FormattedMessage id="app.yes" />
                  </Radio>
                  <Radio value={false}>
                    <FormattedMessage id="app.no" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<FormattedMessage id="app.isRoomNotReady" />}
                name="NotReady"
              >
                <Radio.Group>
                  <Radio value={false}>
                    <FormattedMessage id="app.yes" />
                  </Radio>
                  <Radio value={true}>
                    <FormattedMessage id="app.no" />
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </>
          )}
          <Form.Item {...tailLayout}>
            <FormButton path="room/meeting-room" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ meetingRooms, areas }) => ({
  isLoading: meetingRooms.isLoading,
  areas: areas.areas,
});

export default connect(mapStateToProps, {
  createOrUpdateMeetingRoom,
  getAreas,
})(MeetingRoomCreate);
