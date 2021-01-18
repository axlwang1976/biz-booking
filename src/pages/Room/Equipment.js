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
  getEquipments,
  deleteEquipment,
} from '../../redux/actions/equipmentsActions';
import ActionButton from '../../components/ActionButton/ActionButton';

const Equipment = ({
  collapsed,
  getEquipments,
  isLoading,
  equipments,
  userAuth,
  deleteEquipment,
}) => {
  const columns = [
    {
      title: <FormattedMessage id="app.equipmentName" />,
      dataIndex: 'EquipName',
    },
    {
      title: <FormattedMessage id="app.equipmentID" />,
      dataIndex: 'EquipID',
    },
    {
      title: <FormattedMessage id="app.areaNote" />,
      dataIndex: 'Note',
    },
    {
      title: <FormattedMessage id="app.brand" />,
      dataIndex: 'Brand',
    },
    {
      title: <FormattedMessage id="app.equipmentModel" />,
      dataIndex: 'ModelName',
    },
    {
      title: <FormattedMessage id="app.inType" />,
      dataIndex: 'EquipType',
      render: (text, record) => text && text.TypeName,
    },
    {
      title: <FormattedMessage id="app.inRoom" />,
      dataIndex: 'RoomNo',
      render: (text, record) => {
        if (record.FixBinded) {
          return text;
        } else {
          return '';
        }
      },
    },
    {
      title: <FormattedMessage id="app.custodian" />,
      dataIndex: 'Custodian',
      render: (text, record) => text && text.UserName,
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) => (
        <ActionButton
          record={record}
          path="room/equipment"
          deleteItem={deleteEquipment}
          isLoading={isLoading}
          userAuth={userAuth}
        />
      ),
    },
  ];

  useEffect(() => {
    getEquipments(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.equipment" />
      </Typography.Title>
      <PageContent>
        <Link to="/room/equipment/create">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.createEquipment" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={equipments}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ equipments }) => ({
  isLoading: equipments.isLoading,
  equipments: equipments.equipments,
});

export default connect(mapStateToProps, { getEquipments, deleteEquipment })(
  Equipment
);
