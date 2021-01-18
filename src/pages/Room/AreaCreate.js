import React from 'react';
import { Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateArea } from '../../redux/actions/areasActions';

const tailLayout = {
  wrapperCol: { offset: 6, span: 14 },
};

const AreaCreate = ({
  collapsed,
  isLoading,
  createOrUpdateArea,
  history,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newArea = { ID: 0, ...vals };
    createOrUpdateArea(userAuth, newArea);
    form.resetFields();
    setTimeout(() => {
      history.push('/room/area');
    }, 1000);
  };

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createArea" />
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
            label={<FormattedMessage id="app.areaName" />}
            name="AreaName"
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
            <FormButton path="room/area" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ areas }) => ({
  isLoading: areas.isLoading,
});

export default connect(mapStateToProps, { createOrUpdateArea })(AreaCreate);
