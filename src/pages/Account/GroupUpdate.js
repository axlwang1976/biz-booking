/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Form, Input, Layout, message, Select, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import Spinner from '../../components/Spinner/Spinner';
import {
  createOrUpdateGroup,
  getGroup,
} from '../../redux/actions/groupsActions';
import { getRoles } from '../../redux/actions/rolesActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const GroupUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateGroup,
  history,
  match,
  getRoles,
  getGroup,
  roles,
  selectGroup,
  userAuth,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const updatedGroup = {
      ...vals,
      ID: Number(match.params.ID),
    };
    createOrUpdateGroup(userAuth, updatedGroup);
    setTimeout(() => {
      history.push('/account/user-group');
    }, 1000);
  };

  useEffect(() => {
    getRoles(userAuth);
  }, []);

  useEffect(() => {
    getGroup(userAuth, match.params.ID);
  }, []);

  return selectGroup ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.updateGroup" />
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
            GroupName: selectGroup.GroupName,
            RoleNo: selectGroup.RoleNo,
          }}
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
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ groups, roles }) => ({
  isLoading: groups.isLoading,
  roles: roles.roles,
  selectGroup: groups.selectGroup,
});

export default connect(mapStateToProps, {
  createOrUpdateGroup,
  getRoles,
  getGroup,
})(GroupUpdate);
