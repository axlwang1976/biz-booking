/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import {
  createOrUpdateEquipmentType,
  getEquipmentType,
} from '../../redux/actions/equipmentTypesActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const EquipmentTypeUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateEquipmentType,
  history,
  match,
  getEquipmentType,
  selectEquipmentType,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const updatedType = { ID: Number(match.params.ID), ...vals };
    createOrUpdateEquipmentType(userAuth, updatedType);
    setTimeout(() => {
      history.push('/room/equipment-type');
    }, 1000);
  };

  useEffect(() => {
    getEquipmentType(userAuth, match.params.ID);
  }, []);

  return selectEquipmentType ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.editEquipmentType" />
      </Typography.Title>
      <PageContent>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          form={form}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
          onFinishFailed={(err) =>
            message.error('Form validation failed. Try again.')
          }
          initialValues={{
            TypeName: selectEquipmentType.TypeName,
            Note: selectEquipmentType.Note,
          }}
        >
          <Form.Item
            label={<FormattedMessage id="app.equipmentTypeName" />}
            name="TypeName"
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
          <Form.Item {...tailLayout}>
            <FormButton path="room/equipment-type" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ equipmentTypes }) => ({
  isLoading: equipmentTypes.isLoading,
  selectEquipmentType: equipmentTypes.selectEquipmentType,
});

export default connect(mapStateToProps, {
  getEquipmentType,
  createOrUpdateEquipmentType,
})(EquipmentTypeUpdate);
