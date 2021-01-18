/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getRoles, deleteRole } from '../../redux/actions/rolesActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Role = ({
  collapsed,
  getRoles,
  isLoading,
  roles,
  userAuth,
  deleteRole,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.roleName" />,
      dataIndex: 'RoleName',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="account/role"
          deleteItem={deleteRole}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getRoles(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.role" />
      </Typography.Title>
      <PageContent>
        <Link to="/account/role/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createRole" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={roles}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ roles }) => ({
  isLoading: roles.isLoading,
  roles: roles.roles,
});

export default connect(mapStateToProps, { getRoles, deleteRole })(Role);
