/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getAreas, deleteArea } from '../../redux/actions/areasActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Area = ({
  collapsed,
  getAreas,
  isLoading,
  areas,
  userAuth,
  deleteArea,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.areaName" />,
      dataIndex: 'AreaName',
    },
    {
      title: <FormattedMessage id="app.areaNote" />,
      dataIndex: 'Note',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="room/area"
          deleteItem={deleteArea}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getAreas(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.area" />
      </Typography.Title>
      <PageContent>
        <Link to="/room/area/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createArea" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={areas}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ areas }) => ({
  isLoading: areas.isLoading,
  areas: areas.areas,
});

export default connect(mapStateToProps, { getAreas, deleteArea })(Area);
