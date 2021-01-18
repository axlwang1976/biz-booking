/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getGroups, deleteGroup } from '../../redux/actions/groupsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Group = ({
  collapsed,
  getGroups,
  groups,
  isLoading,
  userAuth,
  deleteGroup,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.groupName" />,
      dataIndex: 'GroupName',
    },
    {
      title: <FormattedMessage id="app.groupRole" />,
      dataIndex: 'Role',
      render: (text, record) => {
        if (text) return text.RoleName;
      },
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="account/user-group"
          deleteItem={deleteGroup}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getGroups(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.userGroup" />
      </Typography.Title>
      <PageContent>
        <Link to="/account/user-group/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createGroup" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={groups}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ groups }) => ({
  isLoading: groups.isLoading,
  groups: groups.groups,
});

export default connect(mapStateToProps, { getGroups, deleteGroup })(Group);
