/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getUsers, deleteUser } from '../../redux/actions/usersActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const User = ({
  collapsed,
  getUsers,
  users,
  isLoading,
  userAuth,
  deleteUser,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.userName" />,
      dataIndex: 'UserName',
    },
    {
      title: 'E-Mail',
      dataIndex: 'UserEmail',
    },
    {
      title: <FormattedMessage id="app.group" />,
      dataIndex: 'UserGroups',
      render: (text, record) => {
        if (text)
          return (
            <>
              {text.map((group) => (
                <p key={group.ID}>{group.GroupName}</p>
              ))}
            </>
          );
      },
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="account/user"
          deleteItem={deleteUser}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getUsers(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.user" />
      </Typography.Title>
      <PageContent>
        <Link to="/account/user/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createUser" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={users}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ users }) => ({
  isLoading: users.isLoading,
  users: users.users,
});

export default connect(mapStateToProps, { getUsers, deleteUser })(User);
