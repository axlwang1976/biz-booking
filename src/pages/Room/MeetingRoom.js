/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import {
  getMeetingRooms,
  deleteMeetingRoom,
} from '../../redux/actions/meetingRoomsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const MeetingRoom = ({
  collapsed,
  getMeetingRooms,
  isLoading,
  meetingRooms,
  userAuth,
  deleteMeetingRoom,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.roomName" />,
      dataIndex: 'RoomName',
    },
    {
      title: <FormattedMessage id="app.areaNote" />,
      dataIndex: 'Note',
    },
    {
      title: <FormattedMessage id="app.inArea" />,
      dataIndex: 'Area',
      render: (text, record) => text && text.AreaName,
    },
    {
      title: <FormattedMessage id="app.maxMen" />,
      dataIndex: 'MaxMen',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="room/meeting-room"
          deleteItem={deleteMeetingRoom}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

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
        <FormattedMessage id="app.room" />
      </Typography.Title>
      <PageContent>
        <Link to="/room/meeting-room/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createRoom" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={meetingRooms}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ meetingRooms }) => ({
  isLoading: meetingRooms.isLoading,
  meetingRooms: meetingRooms.meetingRooms,
});

export default connect(mapStateToProps, { getMeetingRooms, deleteMeetingRoom })(
  MeetingRoom
);
