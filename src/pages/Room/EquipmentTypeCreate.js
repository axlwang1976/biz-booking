import React from 'react';
import { Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateEquipmentType } from '../../redux/actions/equipmentTypesActions';

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const EquipmentTypeCreate = ({
  collapsed,
  isLoading,
  createOrUpdateEquipmentType,
  history,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newType = { ID: 0, ...vals };
    createOrUpdateEquipmentType(userAuth, newType);
    form.resetFields();
    setTimeout(() => {
      history.push('/room/equipment-type');
    }, 1000);
  };

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createEquipmentType" />
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
  );
};

const mapStateToProps = ({ equipmentTypes }) => ({
  isLoading: equipmentTypes.isLoading,
});

export default connect(mapStateToProps, { createOrUpdateEquipmentType })(
  EquipmentTypeCreate
);
