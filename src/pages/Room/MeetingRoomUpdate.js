/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Select,
  Typography,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import {
  createOrUpdateMeetingRoom,
  getMeetingRoom,
} from '../../redux/actions/meetingRoomsActions';
import { getAreas } from '../../redux/actions/areasActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const MeetingRoomUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateMeetingRoom,
  history,
  match,
  getMeetingRoom,
  selectMeetingRoom,
  getAreas,
  userAuth,
  areas,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const updatedMeetingRoom = { ID: Number(match.params.ID), ...vals };
    createOrUpdateMeetingRoom(userAuth, updatedMeetingRoom);
    setTimeout(() => {
      history.push('/room/meeting-room');
    }, 1000);
  };

  useEffect(() => {
    getMeetingRoom(userAuth, match.params.ID);
    getAreas(userAuth);
  }, []);

  return selectMeetingRoom ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.editRoom" />
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
          initialValues={{
            RoomName: selectMeetingRoom.RoomName,
            Note: selectMeetingRoom.Note,
            MaxMen: selectMeetingRoom.MaxMen,
            AreaNo: selectMeetingRoom.AreaNo,
          }}
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
          <Form.Item {...tailLayout}>
            <FormButton path="room/meeting-room" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ areas, meetingRooms }) => ({
  isLoading: meetingRooms.isLoading,
  selectMeetingRoom: meetingRooms.selectMeetingRoom,
  areas: areas.areas,
});

export default connect(mapStateToProps, {
  getAreas,
  getMeetingRoom,
  createOrUpdateMeetingRoom,
})(MeetingRoomUpdate);
