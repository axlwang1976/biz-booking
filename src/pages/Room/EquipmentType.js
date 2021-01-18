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
  getEquipmentTypes,
  deleteEquipmentType,
} from '../../redux/actions/equipmentTypesActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const EquipmentType = ({
  collapsed,
  getEquipmentTypes,
  isLoading,
  equipmentTypes,
  userAuth,
  deleteEquipmentType,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.equipmentTypeName" />,
      dataIndex: 'TypeName',
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
          path="room/equipment-type"
          deleteItem={deleteEquipmentType}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getEquipmentTypes(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.equipmentType" />
      </Typography.Title>
      <PageContent>
        <Link to="/room/equipment-type/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createEquipmentType" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={equipmentTypes}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ equipmentTypes }) => ({
  isLoading: equipmentTypes.isLoading,
  equipmentTypes: equipmentTypes.equipmentTypes,
});

export default connect(mapStateToProps, {
  getEquipmentTypes,
  deleteEquipmentType,
})(EquipmentType);
