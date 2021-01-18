import React from 'react';
import { Button, Form, Input, Select, InputNumber } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const ScrollingText = ({
  closeModal,
  updateScrollingText,
  addNewScrollingText,
  currentTab,
  record,
}) => {
  const [form] = Form.useForm();
  const { Item } = Form;
  const { Option } = Select;
  const tailLayout = {
    wrapperCol: { offset: 6, span: 14 },
  };

  const handleSubmit = (vals) => {
    const newScrollingText = {
      ...vals,
      id: record ? record.id : uuidv4(),
      type: 'scrollingText',
    };
    record
      ? updateScrollingText(currentTab, newScrollingText, record.id)
      : addNewScrollingText(currentTab, newScrollingText);
    form.resetFields();
    closeModal(false);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 14 }}
      onFinish={handleSubmit}
      initialValues={{
        text: record ? record.text : '',
        textColor: record ? record.textColor : '#000000',
        backgroundColor: record ? record.backgroundColor : '#ffffff',
        direction: record ? record.direction : 'toLeft',
        animation: record ? record.animation : 'slide',
        speed: record ? record.speed : 'normal',
        duration: record ? record.duration : 7,
      }}
    >
      <Item
        label="Text"
        name="text"
        rules={[{ required: true, message: 'Please input text' }]}
      >
        <Input />
      </Item>
      <Item label="Text color" name="textColor">
        <Input type="color" style={{ width: 60, cursor: 'pointer' }} />
      </Item>
      <Item label="Direction" name="direction">
        <Select>
          <Option value="toLeft">To Left</Option>
          <Option value="toRight">To Right</Option>
          <Option value="toTop">To Top</Option>
          <Option value="toBottom">To Bottom</Option>
        </Select>
      </Item>
      <Item label="Animation" name="animation">
        <Select>
          <Option value="slide">Slide</Option>
          <Option value="bullet">Bullet</Option>
          <Option value="fade">Fade</Option>
        </Select>
      </Item>
      <Item label="Speed" name="speed">
        <Select>
          <Option value="normal">Normal</Option>
          <Option value="fast">Fast</Option>
        </Select>
      </Item>
      <Item label="Background color" name="backgroundColor">
        <Input type="color" style={{ width: 60, cursor: 'pointer' }} />
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
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          OK
        </Button>
      </Item>
    </Form>
  );
};

export default ScrollingText;
