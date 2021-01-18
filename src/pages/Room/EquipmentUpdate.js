/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Form, Input, Radio, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import {
  createOrUpdateEquipment,
  getEquipment,
} from '../../redux/actions/equipmentsActions';
import { getMeetingRooms } from '../../redux/actions/meetingRoomsActions';
import { getEquipmentTypes } from '../../redux/actions/equipmentTypesActions';
import { getUsers } from '../../redux/actions/usersActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const EquipmentUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateEquipment,
  history,
  match,
  getMeetingRooms,
  meetingRooms,
  getEquipment,
  selectEquipment,
  getUsers,
  users,
  userAuth,
  getEquipmentTypes,
  equipmentTypes,
}) => {
  const [fixBinded, setFixBinded] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const updatedEquipment = { ID: Number(match.params.ID), ...vals };
    createOrUpdateEquipment(userAuth, updatedEquipment);
    setTimeout(() => {
      history.push('/room/equipment');
    }, 1000);
  };

  useEffect(() => {
    getEquipment(userAuth, match.params.ID);
    getMeetingRooms(userAuth, match.params.ID);
    getEquipmentTypes(userAuth);
    getUsers(userAuth);
  }, []);

  useEffect(() => {
    if (selectEquipment) {
      setFixBinded(selectEquipment.FixBinded);
    }
  }, [selectEquipment]);

  return selectEquipment ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createEquipment" />
      </Typography.Title>
      <PageContent>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          form={form}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
          onFinishFailed={(err) =>
            message.error('Form validation failed. Try again.')
          }
          initialValues={{
            EquipName: selectEquipment.EquipName,
            EquipID: selectEquipment.EquipID,
            Note: selectEquipment.Note,
            Brand: selectEquipment.Brand,
            ModelName: selectEquipment.ModelName,
            EquipTypeNo: selectEquipment.EquipTypeNo,
            FixBinded: selectEquipment.FixBinded,
            RoomNo: selectEquipment.RoomNo,
            CustodianNo: selectEquipment.CustodianNo,
          }}
        >
          <Form.Item
            label={<FormattedMessage id="app.equipmentName" />}
            name="EquipName"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.equipmentID" />}
            name="EquipID"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="app.areaNote" />} name="Note">
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.brand" />}
            name="Brand"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.equipmentModel" />}
            name="ModelName"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.inType" />}
            name="EquipTypeNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select>
              {equipmentTypes &&
                equipmentTypes.map((type) => (
                  <Select.Option key={type.ID} value={type.ID}>
                    {type.TypeName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.fixBinded" />}
            name="FixBinded"
          >
            <Radio.Group onChange={(e) => setFixBinded(e.target.value)}>
              <Radio value={true}>
                <FormattedMessage id="app.yes" />
              </Radio>
              <Radio value={false}>
                <FormattedMessage id="app.no" />
              </Radio>
            </Radio.Group>
          </Form.Item>
          {fixBinded && (
            <Form.Item
              label={<FormattedMessage id="app.inRoom" />}
              name="RoomNo"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="app.filedRequired" />,
                },
              ]}
            >
              <Select>
                {meetingRooms &&
                  meetingRooms.map((room) => (
                    <Select.Option key={room.ID} value={room.ID}>
                      {room.RoomName}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          )}
          <Form.Item
            label={<FormattedMessage id="app.custodian" />}
            name="CustodianNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select>
              {users &&
                users.map((user) => (
                  <Select.Option key={user.ID} value={user.ID}>
                    {user.UserName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="room/equipment" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({
  equipments,
  meetingRooms,
  equipmentTypes,
  users,
}) => ({
  isLoading: equipments.isLoading,
  selectEquipment: equipments.selectEquipment,
  meetingRooms: meetingRooms.meetingRooms,
  equipmentTypes: equipmentTypes.equipmentTypes,
  users: users.users,
});

export default connect(mapStateToProps, {
  createOrUpdateEquipment,
  getEquipment,
  getEquipmentTypes,
  getUsers,
  getMeetingRooms,
})(EquipmentUpdate);
