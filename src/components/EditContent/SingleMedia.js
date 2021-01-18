import React from 'react';
import { Button, Form, InputNumber, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

const SingleMedia = ({ closeModal, record, updateSingleMedia, currentTab }) => {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Paragraph } = Typography;
  const tailLayout = {
    wrapperCol: { offset: 6, span: 14 },
  };

  const handleSubmit = (vals) => {
    const newSingleMedia = {
      ...record,
      duration: vals.duration,
    };
    updateSingleMedia(currentTab, newSingleMedia, record.ID);
    form.resetFields();
    closeModal(false);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={handleSubmit}
      initialValues={{ duration: record.duration }}
    >
      <Item label="File Name">
        <Paragraph style={{ marginBottom: 0 }}>{record.FileName}</Paragraph>
      </Item>
      <Item label="Duration" style={{ position: 'relative' }}>
        <Item name="duration">
          <InputNumber min={1} />
        </Item>
        <span style={{ position: 'absolute', left: '100px', top: '4px' }}>
          seconds
        </span>
      </Item>
      <Item {...tailLayout}>
        <Button
          htmlType="button"
          onClick={() => closeModal(false)}
          style={{ marginRight: 10 }}
        >
          <FormattedMessage id="app.cancel" />
        </Button>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="app.submit" />
        </Button>
      </Item>
    </Form>
  );
};

export default SingleMedia;
