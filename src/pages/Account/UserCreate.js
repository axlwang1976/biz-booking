/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateUser } from '../../redux/actions/usersActions';
import { getGroups } from '../../redux/actions/groupsActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const UserCreate = ({
  collapsed,
  isLoading,
  createOrUpdateUser,
  history,
  getGroups,
  groups,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = ({
    UserName,
    UserPwd,
    UserEmail,
    UserPhone,
    UserMobile,
    UserGroups,
  }) => {
    const newUser = {
      UserName,
      UserPwd,
      UserEmail,
      UserPhone,
      UserMobile,
      UserGroupNos: UserGroups,
      ID: 0,
    };
    createOrUpdateUser(userAuth, newUser);
    form.resetFields();
    setTimeout(() => {
      history.push('/account/user');
    }, 1000);
  };

  useEffect(() => {
    getGroups(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createUser" />
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
            label={<FormattedMessage id="app.userName" />}
            name="UserName"
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
            name="UserPwd"
            label={<FormattedMessage id="app.userPwd" />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirm"
            label={<FormattedMessage id="app.confirmPwd" />}
            dependencies={['UserPwd']}
            hasFeedback
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('UserPwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(<FormattedMessage id="app.pwdRule" />);
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="E-Mail"
            name="UserEmail"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.phone" />}
            name="UserPhone"
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.mobile" />}
            name="UserMobile"
          >
            <Input type="tel" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.group" />}
            name="UserGroups"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.filedRequired" />,
              },
            ]}
          >
            <Select mode="multiple" allowClear>
              {groups &&
                groups.map((group) => (
                  <Select.Option key={group.ID} value={group.ID}>
                    {group.GroupName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="account/user" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ groups, users }) => ({
  isLoading: users.isLoading,
  groups: groups.groups,
});

export default connect(mapStateToProps, {
  createOrUpdateUser,
  getGroups,
})(UserCreate);
