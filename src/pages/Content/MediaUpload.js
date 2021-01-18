import React, { useState } from 'react';
import { Layout, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';
import Uploading from '../../components/Spinner/Uploading';

const MediaUpload = ({ collapsed, history, userAuth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showText, setShowText] = useState(false);
  const [fileName, setFileName] = useState('');
  const [showError, setShowError] = useState(false);

  const handleChange = async (e) => {
    setIsLoading(true);
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
        setIsLoading(false);
        setShowText(true);
        setTimeout(() => {
          history.push('/content/media');
        }, 1000);
      } else {
        setIsLoading(false);
        setShowError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Layout.Content
        style={{
          padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
        }}
      >
        <Typography.Title level={3}>
          <FormattedMessage id="app.uploadMedia" />
        </Typography.Title>
        <PageContent>
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
              <p style={{ lineHeight: 4, fontSize: 16 }}>
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
          <span id="message"></span>
        </PageContent>
        <Footer />
      </Layout.Content>
      {isLoading && <Uploading />}
    </>
  );
};

export default MediaUpload;
