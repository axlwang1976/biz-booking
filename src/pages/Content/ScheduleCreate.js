/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Form,
  message,
  DatePicker,
  Select,
  TimePicker,
  Checkbox,
  InputNumber,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import FormButton from '../../components/FormButton/FormButton';
import { createOrUpdateSchedule } from '../../redux/actions/schedulesActions';
import { getContents } from '../../redux/actions/contentsActions';
import { weekOptions } from '../../utils/weekOptions';
import { monthOptions } from '../../utils/monthOptions';
import { gpios } from '../../utils/gpios';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

// const disabledDate = (current) => {
//   return current && current < moment().endOf('day');
// };

const ScheduleCreate = ({
  collapsed,
  userAuth,
  match,
  history,
  isLoading,
  createOrUpdateSchedule,
  getContents,
  contents,
}) => {
  const [selectScheduleType, setSelectScheduleType] = useState(0);
  const [form] = Form.useForm();

  const renderKeys = (type) => {
    if (type === 0 || type === 2) {
      return <Checkbox.Group options={weekOptions} />;
    }
    if (type === 1) {
      return <Checkbox.Group options={monthOptions} />;
    }
    if (type === 3) {
      return (
        <Select>
          {gpios.map((gpio) => (
            <Select.Option key={gpio} value={gpio}>
              {gpio}
            </Select.Option>
          ))}
        </Select>
      );
    }
    if (type === 4) {
      return <InputNumber min={0} />;
    }
  };

  const renderKeysValue = (type, keys) => {
    if (type === 0 || type === 1 || type === 2) {
      return keys.toString();
    }
    if (type === 3 || type === 4) {
      return keys;
    }
  };

  const handleSubmit = (vals) => {
    const newSchedule = {
      ...vals,
      ID: 0,
      ChannelNo: Number(match.params.ID),
      StartDate: moment(vals.StartDate).format('YYYY-MM-DD'),
      StopDate: moment(vals.StopDate).format('YYYY-MM-DD'),
      BeginTime: moment(vals.BeginTime).diff(
        moment().startOf('day'),
        'seconds'
      ),
      EndTime: moment(vals.EndTime).diff(moment().startOf('day'), 'seconds'),
      Keys: renderKeysValue(selectScheduleType, vals.Keys),
    };
    createOrUpdateSchedule(userAuth, newSchedule);
    form.resetFields();
    setTimeout(() => {
      history.push('/content/schedule');
    }, 1000);
  };

  useEffect(() => {
    getContents(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createSchedule" />
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
          form={form}
          initialValues={{ ScheType: selectScheduleType }}
        >
          <Form.Item
            label={<FormattedMessage id="app.selectContent" />}
            name="ContentNo"
          >
            <Select>
              {contents.map((content) => (
                <Select.Option value={content.ID} key={content.ID}>
                  {content.ContentName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.startDate" />}
            name="StartDate"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.stopDate" />}
            name="StopDate"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.beginTime" />}
            name="BeginTime"
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.endTime" />}
            name="EndTime"
          >
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.scheduleType" />}
            name="ScheType"
          >
            <Select onChange={(val) => setSelectScheduleType(val)}>
              <Select.Option value={0}>
                <FormattedMessage id="app.weekCycle" />
              </Select.Option>
              <Select.Option value={1}>
                <FormattedMessage id="app.monthCycle" />
              </Select.Option>
              <Select.Option value={2}>
                <FormattedMessage id="app.scheduleCalendar" />
              </Select.Option>
              <Select.Option value={3}>
                <FormattedMessage id="app.scheduleGpio" />
              </Select.Option>
              {/* <Select.Option value={4}>
                <FormattedMessage id="app.scheduleMsg" />
              </Select.Option> */}
            </Select>
          </Form.Item>
          <Form.Item
            label={<FormattedMessage id="app.scheduleTypeKeys" />}
            name="Keys"
          >
            {renderKeys(selectScheduleType)}
          </Form.Item>
          <Form.Item {...tailLayout}>
            <FormButton path="content/schedule" isLoading={isLoading} />
          </Form.Item>
        </Form>
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ schedules, contents }) => ({
  isLoading: schedules.isLoading,
  contents: contents.contents,
});

export default connect(mapStateToProps, {
  createOrUpdateSchedule,
  getContents,
})(ScheduleCreate);
