import React from 'react';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';

import ActionButton from '../ActionButton/ActionButton';
import { deleteSchedule } from '../../redux/actions/schedulesActions';

const ScheduleInChannel = ({
  schedules,
  channelNo,
  deleteSchedule,
  isLoading,
  userAuth,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.contentName" />,
      dataIndex: 'Content',
      render: (text, record) => text && text.ContentName,
    },
    {
      title: <FormattedMessage id="app.startDate" />,
      dataIndex: 'StartDate',
    },
    {
      title: <FormattedMessage id="app.stopDate" />,
      dataIndex: 'StopDate',
    },
    {
      title: <FormattedMessage id="app.beginTime" />,
      dataIndex: 'BeginTime',
    },
    {
      title: <FormattedMessage id="app.endTime" />,
      dataIndex: 'EndTime',
    },
    {
      title: <FormattedMessage id="app.scheduleType" />,
      dataIndex: 'ScheType',
      render: (text, record) => {
        if (text === 0) return <FormattedMessage id="app.weekCycle" />;
        if (text === 1) return <FormattedMessage id="app.monthCycle" />;
        if (text === 2) return <FormattedMessage id="app.scheduleCalendar" />;
        if (text === 3) return <FormattedMessage id="app.scheduleGpio" />;
        if (text === 4) return <FormattedMessage id="app.scheduleMsg" />;
      },
    },
    {
      title: <FormattedMessage id="app.scheduleTypeKeys" />,
      dataIndex: 'Keys',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'action',
      render: (text, record) => (
        <ActionButton
          record={record}
          path={`content/channel/${channelNo}/schedule`}
          deleteItem={deleteSchedule}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={schedules}
      pagination={{ hideOnSinglePage: true, pageSize: 10 }}
      rowKey={(record) => String(record.ID)}
    />
  );
};

const mapStateToProps = ({ schedules }) => ({ isLoading: schedules.isLoading });

export default connect(mapStateToProps, { deleteSchedule })(ScheduleInChannel);
