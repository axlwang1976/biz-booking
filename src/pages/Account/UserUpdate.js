/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import { createOrUpdateUser, getUser } from '../../redux/actions/usersActions';
import { getGroups } from '../../redux/actions/groupsActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const UserUpdate = ({
  collapsed,
  history,
  match,
  getUser,
  selectUser,
  isLoading,
  groups,
  getGroups,
  createOrUpdateUser,
  userAuth,
}) => {
  const handleSubmit = ({
    UserName,
    UserPwd,
    UserEmail,
    UserPhone,
    UserMobile,
    UserGroups,
  }) => {
    const updatedUser = {
      UserName,
      UserPwd,
      UserEmail,
      UserPhone,
      UserMobile,
      UserGroupNos: UserGroups,
      ID: Number(match.params.ID),
    };
    createOrUpdateUser(userAuth, updatedUser);
    setTimeout(() => {
      history.push('/account/user');
    }, 1000);
  };

  useEffect(() => {
    getGroups(userAuth);
  }, []);

  useEffect(() => {
    getUser(userAuth, match.params.ID);
  }, []);

  return selectUser ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.updateUser" />
      </Typography.Title>
      <PageContent>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          size="large"
          onFinish={handleSubmit}
          onFinishFailed={(err) =>
            message.error('Form validation failed. Try again.')
          }
          initialValues={{
            UserName: selectUser.UserName,
            UserPwd: selectUser.UserPwd,
            confirm: selectUser.UserPwd,
            UserEmail: selectUser.UserEmail,
            UserPhone: selectUser.UserPhone,
            UserMobile: selectUser.UserMobile,
            UserGroups: selectUser.UserGroups.map((group) => group.ID),
          }}
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
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ groups, users }) => ({
  isLoading: users.isLoading,
  groups: groups.groups,
  selectUser: users.selectUser,
});

export default connect(mapStateToProps, {
  createOrUpdateUser,
  getGroups,
  getUser,
})(UserUpdate);
