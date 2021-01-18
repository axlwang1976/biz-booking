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
  getMeetings,
  deleteMeeting,
} from '../../redux/actions/meetingsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Meeting = ({
  collapsed,
  getMeetings,
  isLoading,
  meetings,
  userAuth,
  deleteMeeting,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.meetingName" />,
      dataIndex: 'MeetingName',
    },
    {
      title: <FormattedMessage id="app.subject" />,
      dataIndex: 'Subject',
    },
    {
      title: <FormattedMessage id="app.roomName" />,
      dataIndex: 'Rooms',
      render: (text, record) => {
        if (text)
          return (
            <>
              {text.map((room) => (
                <p key={room.ID}>{room.Room.RoomName}</p>
              ))}
            </>
          );
      },
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
      title: <FormattedMessage id="app.registerMan" />,
      dataIndex: 'RegisterMan',
      render: (text, record) => text && text.UserName,
    },
    {
      title: <FormattedMessage id="app.hosted" />,
      dataIndex: 'Convener',
      render: (text, record) => text && text.UserName,
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) =>
        !record.Rooms.length && (
          <ActionButton
            record={record}
            path="meeting/meeting"
            deleteItem={deleteMeeting}
            isLoading={isLoading}
            userAuth={userAuth}
          />
        ),
    },
  ];

  useEffect(() => {
    getMeetings(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.meetings" />
      </Typography.Title>
      <PageContent>
        <Link to="/meeting/meeting/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createMeeting" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={meetings}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ meetings }) => ({
  isLoading: meetings.isLoading,
  meetings: meetings.meetings,
});

export default connect(mapStateToProps, { getMeetings, deleteMeeting })(
  Meeting
);
