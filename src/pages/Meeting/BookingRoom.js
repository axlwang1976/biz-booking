/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Layout, Radio, Select, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import {
  getBookingRoomByRoom,
  getBookingRoomByMeeting,
  deleteBookingRoom,
} from '../../redux/actions/bookingRoomActions';
import { getMeetingRooms } from '../../redux/actions/meetingRoomsActions';
import { getMeetings } from '../../redux/actions/meetingsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const BookingRoom = ({
  collapsed,
  getBookingRoomByRoom,
  getBookingRoomByMeeting,
  isLoading,
  bookingRoomInfoByRoom,
  bookingRoomInfoByMeeting,
  userAuth,
  deleteBookingRoom,
  meetingRooms,
  getMeetingRooms,
  getMeetings,
  meetings,
}) => {
  const [roomNo, setRoomNo] = useState(null);
  const [displayBy, setDisplayBy] = useState('room');
  const [meetingNo, setMeetingNo] = useState(null);
  const columns = [
    {
      title: <FormattedMessage id="app.bookingRoomNo" />,
      dataIndex: 'ID',
      width: 200,
    },
    {
      title: <FormattedMessage id="app.inRoom" />,
      dataIndex: 'Room',
      render: (text, record) => text && text.RoomName,
    },
    {
      title: <FormattedMessage id="app.meetingName" />,
      dataIndex: 'Meeting',
      render: (text, record) => text && text.MeetingName,
    },
    {
      title: <FormattedMessage id="app.startTime" />,
      dataIndex: 'StartTime',
    },
    {
      title: <FormattedMessage id="app.endTime" />,
      dataIndex: 'StopTime',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="meeting/booking"
          deleteItem={deleteBookingRoom}
          isLoading={isLoading}
          userAuth={userAuth}
          reload={true}
        />
      ),
    },
  ];

  useEffect(() => {
    getMeetingRooms(userAuth);
    getMeetings(userAuth);
  }, []);

  useEffect(() => {
    if (roomNo) {
      getBookingRoomByRoom(userAuth, roomNo);
    }
  }, [roomNo]);

  useEffect(() => {
    if (meetingNo) {
      getBookingRoomByMeeting(userAuth, meetingNo);
    }
  }, [meetingNo]);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.bookingRoom" />
      </Typography.Title>
      <PageContent>
        <Link to="/meeting/booking/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createBookingRoom" />
          </Button>
        </Link>
        <div style={{ marginBottom: 20 }}>
          <label style={{ marginRight: 20 }}>
            <FormattedMessage id="app.resultBy" />:
          </label>
          <Radio.Group
            defaultValue={displayBy}
            onChange={(e) => setDisplayBy(e.target.value)}
          >
            <Radio value="room">
              <FormattedMessage id="app.byRoom" />
            </Radio>
            <Radio value="meeting">
              <FormattedMessage id="app.byMeeting" />
            </Radio>
          </Radio.Group>
        </div>
        {displayBy === 'room' ? (
          <div style={{ marginBottom: 20 }}>
            <label style={{ marginRight: 20 }}>
              <FormattedMessage id="app.roomName" />:
            </label>
            <Select style={{ width: 200 }} onChange={(val) => setRoomNo(val)}>
              {meetingRooms &&
                meetingRooms.map((room) => (
                  <Select.Option key={room.ID} value={room.ID}>
                    {room.RoomName}
                  </Select.Option>
                ))}
            </Select>
          </div>
        ) : (
          <div style={{ marginBottom: 20 }}>
            <label style={{ marginRight: 20 }}>
              <FormattedMessage id="app.meetingName" />:
            </label>
            <Select
              style={{ width: 200 }}
              onChange={(val) => setMeetingNo(val)}
            >
              {meetings &&
                meetings.map((meeting) => (
                  <Select.Option key={meeting.ID} value={meeting.ID}>
                    {meeting.MeetingName}
                  </Select.Option>
                ))}
            </Select>
          </div>
        )}
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={
              displayBy === 'room'
                ? bookingRoomInfoByRoom
                : bookingRoomInfoByMeeting
            }
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ bookingRoom, meetingRooms, meetings }) => ({
  isLoading: bookingRoom.isLoading,
  bookingRoomInfoByRoom: bookingRoom.bookingRoomInfoByRoom,
  bookingRoomInfoByMeeting: bookingRoom.bookingRoomInfoByMeeting,
  meetingRooms: meetingRooms.meetingRooms,
  meetings: meetings.meetings,
});

export default connect(mapStateToProps, {
  getBookingRoomByRoom,
  getBookingRoomByMeeting,
  deleteBookingRoom,
  getMeetingRooms,
  getMeetings,
})(BookingRoom);
