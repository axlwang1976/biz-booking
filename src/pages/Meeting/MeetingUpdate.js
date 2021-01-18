/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Radio,
  Layout,
  message,
  Select,
  Typography,
  DatePicker,
  InputNumber,
  Checkbox,
} from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import moment from 'moment';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';

import PageContent from '../../components/PageContent/PageContent';
import FormButton from '../../components/FormButton/FormButton';
import {
  createOrUpdateMeeting,
  getMeeting,
} from '../../redux/actions/meetingsActions';
import { getUsers } from '../../redux/actions/usersActions';
import Preview from '../Content/Preview';
import template from '../../assets/images/template.png';
import template2 from '../../assets/images/template2.png';
import Uploading from '../../components/Spinner/Uploading';
import Spinner from '../../components/Spinner/Spinner';

const tailLayout = {
  wrapperCol: { offset: 4, span: 14 },
};

const MeetingUpdate = ({
  collapsed,
  isLoading,
  createOrUpdateMeeting,
  history,
  match,
  userAuth,
  getUsers,
  users,
  selectMeeting,
  getMeeting,
}) => {
  const [bgImageNo, setBgImageNo] = useState(null);
  const [imageNo, setImageNo] = useState(null);
  const [selectTemplate, setSelectTemplate] = useState(1);
  const [showBgImg, setShowBgImg] = useState(false);
  const [showImg, setShowImg] = useState(false);
  const [showSubject, setSubject] = useState(false);
  const [showSubject2, setSubject2] = useState(false);
  const [uploadIsLoading, setUploadIsLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showError, setShowError] = useState(false);
  const [showText2, setShowText2] = useState(false);
  const [fileName2, setFileName2] = useState('');
  const [showError2, setShowError2] = useState(false);
  const [form] = Form.useForm();

  const getPreview = async (id) => {
    try {
      const res = await axios.get(`/ContentApi/DownloadMedia/SN/${id}`, {
        headers: {
          Accesstoken: userAuth.Accesstoken,
          Client: userAuth.Client,
          Uid: userAuth.Uid,
        },
        responseType: 'blob',
      });
      return URL.createObjectURL(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = async (e) => {
    setUploadIsLoading(true);
    let mediaForm = new FormData();
    mediaForm.append('media', e.target.files[0]);
    try {
      const url = `/ContentApi/UploadMedia/${
        e.target.files[0].type.split('/')[0]
      }`;
      const res = await axios.post(url, mediaForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accesstoken: userAuth.Accesstoken,
          Client: userAuth.Client,
          Uid: userAuth.Uid,
        },
      });
      if (res.status === 200) {
        setFileName(res.data.filename);
        setUploadIsLoading(false);
        setShowText(true);
        setBgImageNo(res.data.mediaid);
      } else {
        setUploadIsLoading(false);
        setShowError2(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange2 = async (e) => {
    setUploadIsLoading(true);
    let mediaForm = new FormData();
    mediaForm.append('media', e.target.files[0]);
    try {
      const url = `/ContentApi/UploadMedia/${
        e.target.files[0].type.split('/')[0]
      }`;
      const res = await axios.post(url, mediaForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Accesstoken: userAuth.Accesstoken,
          Client: userAuth.Client,
          Uid: userAuth.Uid,
        },
      });
      if (res.status === 200) {
        setFileName2(res.data.filename);
        setUploadIsLoading(false);
        setShowText2(true);
        setImageNo(res.data.mediaid);
      } else {
        setUploadIsLoading(false);
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (vals) => {
    const updatedMeeting = {
      ...vals,
      ID: Number(match.params.ID),
      StartTime:
        `${moment(vals.StartTime).format('YYYY-MM-DD HH:mm')}:00` ||
        selectMeeting.StartTime,
      StopTime:
        `${moment(vals.StopTime).format('YYYY-MM-DD HH:mm')}:00` ||
        selectMeeting.StopTime,
      BackgroundImageNo: bgImageNo,
      ImageNo: imageNo,
      RegisterManNo: users.find((user) => user.UserEmail === userAuth.Uid).ID,
      ShowBackgroundImage: showBgImg,
      ShowImage: showImg,
      ShowSubject: showSubject,
      ShowSubject2: showSubject2,
    };
    createOrUpdateMeeting(userAuth, updatedMeeting);
    setTimeout(() => {
      history.push('/meeting/meeting');
    }, 1000);
  };

  useEffect(() => {
    getMeeting(userAuth, match.params.ID);
    getUsers(userAuth);
  }, []);

  useEffect(() => {
    if (selectMeeting) {
      setImageNo(selectMeeting.ImageNo);
      setBgImageNo(selectMeeting.BackgroundImageNo);
      setSelectTemplate(selectMeeting.TemplateNo);
      setShowBgImg(selectMeeting.ShowBackgroundImage);
      setShowImg(selectMeeting.ShowImage);
      setSubject(selectMeeting.ShowSubject);
      setSubject2(selectMeeting.ShowSubject2);
    }
  }, [selectMeeting]);

  return selectMeeting ? (
    <>
      <Layout.Content
        style={{
          padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
        }}
      >
        <Typography.Title level={3}>
          <FormattedMessage id="app.updateMeeting" />
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
              MeetingName: selectMeeting.MeetingName,
              Subject: selectMeeting.Subject,
              Subject2: selectMeeting.Subject2,
              ConvenerNo: selectMeeting.ConvenerNo,
              StartTime: moment(selectMeeting.StartTime),
              StopTime: moment(selectMeeting.StopTime),
              MaxMen: selectMeeting.MaxMen,
              SignNeed: selectMeeting.SignNeed,
              NotifyNeed: selectMeeting.NotifyNeed,
              TemplateNo: selectMeeting.TemplateNo,
            }}
          >
            <Form.Item
              label={<FormattedMessage id="app.startTime" />}
              name="StartTime"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="app.filedRequired" />,
                },
              ]}
            >
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.endTime" />}
              name="StopTime"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="app.filedRequired" />,
                },
              ]}
            >
              <DatePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                placeholder=""
              />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.meetingName" />}
              name="MeetingName"
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
              label={<FormattedMessage id="app.subject" />}
              name="Subject"
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
              label={<FormattedMessage id="app.subject2" />}
              name="Subject2"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.hosted" />}
              name="ConvenerNo"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="app.filedRequired" />,
                },
              ]}
            >
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {users.map((user) => (
                  <Select.Option key={user.ID} value={user.ID}>
                    {user.UserName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.maxAttendee" />}
              name="MaxMen"
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="app.filedRequired" />,
                },
              ]}
            >
              <InputNumber min={2} />
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.isSignNeed" />}
              name="SignNeed"
            >
              <Radio.Group>
                <Radio value={true}>
                  <FormattedMessage id="app.yes" />
                </Radio>
                <Radio value={false}>
                  <FormattedMessage id="app.no" />
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.isNotifyNeed" />}
              name="NotifyNeed"
            >
              <Radio.Group>
                <Radio value={true}>
                  <FormattedMessage id="app.yes" />
                </Radio>
                <Radio value={false}>
                  <FormattedMessage id="app.no" />
                </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={<FormattedMessage id="app.selectTemplate" />}
              name="TemplateNo"
            >
              <Radio.Group onChange={(e) => setSelectTemplate(e.target.value)}>
                <Radio value={1}>
                  <img src={template2} alt="template" />
                </Radio>
                <Radio value={2}>
                  <img src={template} alt="template" />
                </Radio>
              </Radio.Group>
            </Form.Item>
            {/* TODO: 顯示選項 */}
            {selectTemplate === 2 && (
              <>
                <Form.Item label={<FormattedMessage id="app.templateOption" />}>
                  <Checkbox
                    onChange={(e) => {
                      setShowBgImg(e.target.checked);
                      if (e.target.checked && showImg) {
                        setSubject(true);
                        setSubject2(true);
                      } else {
                        setSubject(false);
                        setSubject2(false);
                      }
                    }}
                    defaultChecked={selectMeeting.ShowBackgroundImage}
                  >
                    <FormattedMessage id="app.showBgImg" />
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => {
                      setShowImg(e.target.checked);
                      if (e.target.checked && showBgImg) {
                        setSubject(true);
                        setSubject2(true);
                      } else {
                        setSubject(false);
                        setSubject2(false);
                      }
                    }}
                    defaultChecked={selectMeeting.ShowImage}
                  >
                    <FormattedMessage id="app.showImg" />
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => setSubject(e.target.checked)}
                    checked={showSubject}
                    disabled={showImg && showBgImg}
                    defaultChecked={selectMeeting.ShowSubject}
                  >
                    <FormattedMessage id="app.showSubject" />
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => setSubject2(e.target.checked)}
                    checked={showSubject2}
                    disabled={showImg && showBgImg}
                    defaultChecked={selectMeeting.ShowSubject2}
                  >
                    <FormattedMessage id="app.showSubject2" />
                  </Checkbox>
                </Form.Item>
              </>
            )}
            {(selectTemplate === 1 || showBgImg) && (
              <>
                <Form.Item label={<FormattedMessage id="app.selectBgImage" />}>
                  <form
                    id="form"
                    action="upload"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <label
                      style={{
                        padding: 10,
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      <UploadOutlined />{' '}
                      {isLoading ? (
                        <FormattedMessage id="app.uploading" />
                      ) : (
                        <FormattedMessage id="app.selectFile" />
                      )}
                      <input
                        type="file"
                        name="media"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                    </label>{' '}
                    {showText && (
                      <p style={{ lineHeight: 3, fontSize: 16, margin: 0 }}>
                        {fileName} <FormattedMessage id="app.uploadSuccess" />
                      </p>
                    )}
                    {showError && (
                      <p style={{ lineHeight: 4, fontSize: 16, color: 'red' }}>
                        <FormattedMessage id="app.uploadError" />
                      </p>
                    )}
                    <br />
                    <span></span>
                  </form>
                </Form.Item>
                <Form.Item label={<FormattedMessage id="app.preview" />}>
                  {bgImageNo && (
                    <Preview
                      record={{ MediaType: 'image', FileName: fileName }}
                      getPreview={getPreview}
                      id={bgImageNo}
                    />
                  )}
                </Form.Item>
              </>
            )}
            {selectTemplate === 2 && showImg && (
              <>
                <Form.Item
                  label={<FormattedMessage id="app.selectMeetingImage" />}
                >
                  <form
                    id="form"
                    action="upload"
                    method="post"
                    encType="multipart/form-data"
                  >
                    <label
                      style={{
                        padding: 10,
                        backgroundColor: '#1890ff',
                        color: '#fff',
                        borderRadius: '3px',
                        cursor: 'pointer',
                      }}
                    >
                      <UploadOutlined />{' '}
                      {isLoading ? (
                        <FormattedMessage id="app.uploading" />
                      ) : (
                        <FormattedMessage id="app.selectFile" />
                      )}
                      <input
                        type="file"
                        name="media"
                        onChange={handleChange2}
                        style={{ display: 'none' }}
                      />
                    </label>{' '}
                    {showText2 && (
                      <p style={{ lineHeight: 3, fontSize: 16, margin: 0 }}>
                        {fileName2} <FormattedMessage id="app.uploadSuccess" />
                      </p>
                    )}
                    {showError2 && (
                      <p style={{ lineHeight: 4, fontSize: 16, color: 'red' }}>
                        <FormattedMessage id="app.uploadError" />
                      </p>
                    )}
                    <br />
                    <span></span>
                  </form>
                </Form.Item>
                <Form.Item label={<FormattedMessage id="app.preview" />}>
                  {imageNo && (
                    <Preview
                      record={{ MediaType: 'image', FileName: fileName2 }}
                      getPreview={getPreview}
                      id={imageNo}
                    />
                  )}
                </Form.Item>
              </>
            )}
            <Form.Item {...tailLayout}>
              <FormButton path="meeting/meeting" isLoading={isLoading} />
            </Form.Item>
          </Form>
        </PageContent>
      </Layout.Content>
      {uploadIsLoading && <Uploading />}
    </>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ meetings, users }) => ({
  isLoading: meetings.isLoading,
  selectMeeting: meetings.selectMeeting,
  users: users.users,
});

export default connect(mapStateToProps, {
  getMeeting,
  getUsers,
  createOrUpdateMeeting,
})(MeetingUpdate);
