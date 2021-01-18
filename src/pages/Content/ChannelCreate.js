/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Checkbox, Form, Input, Layout, message, Typography } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateChannel } from '../../redux/actions/channelsActions';
import { getAreas } from '../../redux/actions/areasActions';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const ChannelCreate = ({
  collapsed,
  userAuth,
  isLoading,
  createOrUpdateChannel,
  history,
  getAreas,
  areas,
  intl,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = (vals) => {
    let RoomNos = [];
    for (const key in vals) {
      if (vals.hasOwnProperty.call(vals, key)) {
        if (key.includes('Room')) {
          const values = vals[key];
          values && values.forEach((val) => RoomNos.push(val));
        }
      }
    }
    const newChannel = {
      ID: 0,
      ChannelName: vals.ChannelName,
      Note: vals.Note,
      RoomNos,
    };
    createOrUpdateChannel(userAuth, newChannel);
    form.resetFields();
    setTimeout(() => {
      history.push('/content/schedule');
    }, 1000);
  };

  useEffect(() => {
    getAreas(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createChannel" />
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
            label={<FormattedMessage id="app.channelName" />}
            name="ChannelName"
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
          {areas.map((area, i) => (
            <Form.Item
              label={`${intl.formatMessage({ id: 'app.binding' })} ${
                area.AreaName
              } ${intl.formatMessage({ id: 'app.space' })}`}
              name={`RoomNos${i}`}
              key={area.ID}
            >
              <Checkbox.Group
                options={area.Rooms.map((room) => ({
                  label: room.RoomName,
                  value: room.ID,
                }))}
              />
            </Form.Item>
          ))}
          <Form.Item {...tailLayout}>
            <FormButton path="content/schedule" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
    </Layout.Content>
  );
};

const mapStateToProps = ({ channels, areas }) => ({
  isLoading: channels.isLoading,
  areas: areas.areas,
});

export default connect(mapStateToProps, { createOrUpdateChannel, getAreas })(
  injectIntl(ChannelCreate)
);
