import React from 'react';
import { Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateCompany } from '../../redux/actions/companiesActions';
import { logout } from '../../redux/actions/authActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const CompanyCreate = ({
  collapsed,
  isLoading,
  createOrUpdateCompany,
  history,
  userAuth,
  logout,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    const newCompany = { ...vals, ID: 0 };
    createOrUpdateCompany(userAuth, newCompany);
    form.resetFields();
    setTimeout(() => {
      if (userAuth.Uid === '00000000') {
        history.push('/');
        logout();
      } else {
        history.push('/company');
      }
    }, 1000);
  };

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createCompany" />
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
            label={<FormattedMessage id="app.companyNameTC" />}
            name="NameZH"
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
            label={<FormattedMessage id="app.companyNameEN" />}
            name="NameEN"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.companyID" />}
            name="CompanyID"
            rules={[
              {
                required: true,
                message: <FormattedMessage id="app.taxIDError" />,
                pattern: /^[0-9]{8}$/,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.webURL" />}
            name="WebURL"
            rules={[
              {
                message: <FormattedMessage id="app.urlRule" />,
                pattern: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_+.~#?&//=]*)/,
              },
            ]}
          >
            <Input placeholder="https://example.com" />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="app.phone" />} name="Phone">
            <Input />
          </Form.Item>
          <Form.Item label={<FormattedMessage id="app.fax" />} name="Fax">
            <Input />
          </Form.Item>
          <Form.Item label="E-Mail" name="Email">
            <Input type="email" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.addressTC" />}
            name="AddrZH"
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.addressEN" />}
            name="AddrEN"
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="company" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ companies }) => ({ isLoading: companies.isLoading });

export default connect(mapStateToProps, { createOrUpdateCompany, logout })(
  CompanyCreate
);
