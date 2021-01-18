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
  getContents,
  deleteContent,
} from '../../redux/actions/contentsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Content = ({
  collapsed,
  getContents,
  isLoading,
  contents,
  userAuth,
  deleteContent,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.contentName" />,
      dataIndex: 'ContentName',
    },
    {
      title: <FormattedMessage id="app.inSchedule" />,
      dataIndex: 'Schedules',
      render: (text, record) => {
        if (text) {
          return (
            <>
              {text.map((schedule) => (
                <p key={schedule.ID}>{schedule.ScheduleName}</p>
              ))}
            </>
          );
        }
      },
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) =>
        !record.Schedules.length && (
          <ActionButton
            record={record}
            path="content/content"
            deleteItem={deleteContent}
            isLoading={isLoading}
            userAuth={userAuth}
          />
        ),
    },
  ];

  useEffect(() => {
    getContents(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.contents" />
      </Typography.Title>
      <PageContent>
        <Link to="/content/content/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createContent" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={contents}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ contents }) => ({
  isLoading: contents.isLoading,
  contents: contents.contents,
});

export default connect(mapStateToProps, { getContents, deleteContent })(
  Content
);
