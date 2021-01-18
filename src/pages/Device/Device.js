/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getDevices, deleteDevice } from '../../redux/actions/devicesActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Device = ({
  collapsed,
  userAuth,
  isLoading,
  devices,
  getDevices,
  deleteDevice,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.deviceID" />,
      dataIndex: 'DeviceID',
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="device"
          deleteItem={deleteDevice}
          isLoading={isLoading}
          userAuth={userAuth}
          display="none"
        />
      ),
    },
  ];
  useEffect(() => {
    getDevices(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.device" />
      </Typography.Title>
      <PageContent>
        <Link to="/device/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createDevice" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={devices}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ devices }) => ({
  isLoading: devices.isLoading,
  devices: devices.devices,
});

export default connect(mapStateToProps, { getDevices, deleteDevice })(Device);
