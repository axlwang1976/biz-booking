import React, { useState } from 'react';
import { Form, Input, Button, message, Typography } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import Captcha from 'react-numeric-captcha';

import './captcha.css';
import logo from '../../assets/images/logo.png';

const LogIn = ({ isLoading, login, intl }) => {
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { Title } = Typography;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 14 },
  };

  const onFinish = ({ Email, Password }) => {
    form.resetFields();
    login({ Email, Password });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        backgroundColor: '#bdd5d9',
        flexDirection: 'column',
      }}
    >
      <Title level={2} style={{ textAlign: 'center' }}>
        <img src={logo} alt="logo" style={{ width: 400, marginBottom: 10 }} />
      </Title>
      <Form
        {...layout}
        name="basic"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={(err) =>
          message.error('Form validation failed. Try again.')
        }
        style={{
          padding: '20px 20px 0 20px',
          border: '1px solid rgba(0, 0, 0, 0.85)',
          borderRadius: 5,
          backgroundColor: '#fff',
          marginBottom: 10,
          width: 480,
        }}
      >
        <Form.Item
          label={<FormattedMessage id="app.userName" />}
          name="Email"
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
          label={<FormattedMessage id="app.userPwd" />}
          name="Password"
          rules={[
            {
              required: true,
              message: <FormattedMessage id="app.filedRequired" />,
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label={<FormattedMessage id="app.capcha" />}>
          <Captcha
            onChange={(status) => setBtnDisabled(!status)}
            placeholder={intl.formatMessage({
              id: 'app.capchaPlaceholder',
            })}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" disabled={btnDisabled}>
            {isLoading ? (
              <FormattedMessage id="app.loggingIn" />
            ) : (
              <FormattedMessage id="app.logIn" />
            )}
          </Button>
        </Form.Item>
      </Form>
      <p>&copy;2021 Bizlution Inc.</p>
    </div>
  );
};

export default injectIntl(LogIn);
