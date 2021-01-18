/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import { createOrUpdateArea, getArea } from '../../redux/actions/areasActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const AreaUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateArea,
  history,
  match,
  getArea,
  selectArea,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const updatedArea = { ID: Number(match.params.ID), ...vals };
    createOrUpdateArea(userAuth, updatedArea);
    setTimeout(() => {
      history.push('/room/area');
    }, 1000);
  };

  useEffect(() => {
    getArea(userAuth, match.params.ID);
  }, []);

  return selectArea ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.editArea" />
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
            AreaName: selectArea.AreaName,
            Note: selectArea.Note,
          }}
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
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ areas }) => ({
  isLoading: areas.isLoading,
  selectArea: areas.selectArea,
});

export default connect(mapStateToProps, { getArea, createOrUpdateArea })(
  AreaUpdate
);
