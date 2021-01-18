/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateGroup } from '../../redux/actions/groupsActions';
import { getRoles } from '../../redux/actions/rolesActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const GroupCreate = ({
  collapsed,
  isLoading,
  createOrUpdateGroup,
  history,
  getRoles,
  roles,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newGroup = {
      ...vals,
      ID: 0,
    };
    createOrUpdateGroup(userAuth, newGroup);
    form.resetFields();
    setTimeout(() => {
      history.push('/account/user-group');
    }, 1000);
  };

  useEffect(() => {
    getRoles(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createGroup" />
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
        >
          <Form.Item
            label={<FormattedMessage id="app.groupName" />}
            name="GroupName"
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
            label={<FormattedMessage id="app.groupRole" />}
            name="RoleNo"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select>
              {roles &&
                roles.map((role) => (
                  <Select.Option key={role.ID} value={role.ID}>
                    {role.RoleName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="account/user-group" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ groups, roles }) => ({
  isLoading: groups.isLoading,
  roles: roles.roles,
});

export default connect(mapStateToProps, {
  createOrUpdateGroup,
  getRoles,
})(GroupCreate);
