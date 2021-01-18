/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import {
  createOrUpdateBookingRoom,
  getBookingRoom,
} from '../../redux/actions/bookingRoomActions';
import { getMeetings, getMeeting } from '../../redux/actions/meetingsActions';
import Spinner from '../../components/Spinner/Spinner';
import { checkConflict } from '../../redux/actions/meetingsActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const BookingRoomUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateBookingRoom,
  history,
  getMeetings,
  getMeeting,
  meetings,
  selectMeeting,
  userAuth,
  getBookingRoom,
  selectBookingRoomInfo,
  match,
  checkConflict,
  roomsConflictInfo,
}) => {
  const [selectMeetingNo, setSelectMeetingNo] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = ({ rooms }) => {
    rooms.forEach((room) => {
      const updatedBooking = {
        ID: Number(match.params.ID),
        StartTime: selectMeeting.StartTime,
        StopTime: selectMeeting.StopTime,
        RoomNo: room,
        MeetingNo: selectMeetingNo,
      };
      createOrUpdateBookingRoom(userAuth, updatedBooking);
    });
    setTimeout(() => {
      history.push('/meeting/booking');
    }, 1000);
  };

  useEffect(() => {
    getBookingRoom(userAuth, match.params.ID);
    getMeetings(userAuth);
  }, []);

  useEffect(() => {
    if (selectBookingRoomInfo) {
      setSelectMeetingNo(selectBookingRoomInfo.MeetingNo);
    }
  }, [selectBookingRoomInfo]);

  useEffect(() => {
    if (selectMeetingNo) {
      getMeeting(userAuth, selectMeetingNo);
    }
  }, [selectMeetingNo]);

  useEffect(() => {
    if (selectMeeting) {
      checkConflict(userAuth, selectMeeting.StartTime, selectMeeting.StopTime);
    }
  }, [selectMeeting]);

  return meetings && selectBookingRoomInfo ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.updateBookingRoom" />
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
            MeetingNo: selectBookingRoomInfo.MeetingNo,
            rooms: [selectBookingRoomInfo.Room.ID],
          }}
        >
          <Form.Item
            label={<FormattedMessage id="app.selectMeeting" />}
            name="MeetingNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select onChange={(val) => setSelectMeetingNo(val)}>
              {meetings.map((meeting) => (
                <Select.Option key={meeting.ID} value={meeting.ID}>
                  {meeting.MeetingName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selectMeeting && (
            <>
              <Form.Item label={<FormattedMessage id="app.startTime" />}>
                {selectMeeting.StartTime}
              </Form.Item>
              <Form.Item label={<FormattedMessage id="app.endTime" />}>
                {selectMeeting.StopTime}
              </Form.Item>
            </>
          )}
          <Form.Item
            label={<FormattedMessage id="app.selectRoom" />}
            name="rooms"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select mode="multiple" allowClear>
              {roomsConflictInfo &&
                roomsConflictInfo.map((room) => (
                  <Select.Option
                    key={room.RoomNo}
                    value={room.RoomNo}
                    style={{ color: room.Conflict ? 'red' : 'inherit' }}
                    disabled={room.Conflict}
                  >
                    {`${room.RoomName} (${
                      room.Conflict ? '不可預約' : '可預約'
                    })`}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="meeting/booking" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ meetings, bookingRoom }) => ({
  isLoading: bookingRoom.isLoading,
  selectBookingRoomInfo: bookingRoom.selectBookingRoomInfo,
  meetings: meetings.meetings,
  selectMeeting: meetings.selectMeeting,
  roomsConflictInfo: meetings.roomsConflictInfo,
});

export default connect(mapStateToProps, {
  createOrUpdateBookingRoom,
  getMeetings,
  getMeeting,
  checkConflict,
  getBookingRoom,
})(BookingRoomUpdate);
