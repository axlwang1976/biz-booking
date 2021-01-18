/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Table, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Footer from '../../components/Footer/Footer';
import PageContent from '../../components/PageContent/PageContent';
import Spinner from '../../components/Spinner/Spinner';
import { getMedias, deleteMedia } from '../../redux/actions/mediasActions';
import ActionButton from '../../components/ActionButton/ActionButton';
import Preview from './Preview';

const Media = ({
  collapsed,
  getMedias,
  isLoading,
  medias,
  userAuth,
  deleteMedia,
}) => {
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

  const columns = [
    {
      title: <FormattedMessage id="app.preview" />,
      render: (text, record) => {
        return (
          <Preview record={record} getPreview={getPreview} id={record.ID} />
        );
      },
    },
    {
      title: <FormattedMessage id="app.fileName" />,
      dataIndex: 'FileName',
    },
    {
      title: <FormattedMessage id="app.mediaType" />,
      dataIndex: 'MediaType',
      filters: [
        { text: 'Image', value: 'image' },
        { text: 'Video', value: 'video' },
      ],
      onFilter: (value, record) => record.MediaType.indexOf(value) === 0,
    },
    {
      title: <FormattedMessage id="app.fileSize" />,
      dataIndex: 'FileSize',
    },
    {
      title: <FormattedMessage id="app.inContent" />,
      dataIndex: 'Contents',
      render: (text, record) => {
        if (text)
          return (
            <>
              {text.map((content) => (
                <p key={content.ID}>{content.ContentName}</p>
              ))}
            </>
          );
      },
    },
    {
      title: <FormattedMessage id="app.actions" />,
      key: 'actions',
      width: 200,
      render: (text, record) =>
        !record.Contents.length && (
          <ActionButton
            record={record}
            path="content/media"
            deleteItem={deleteMedia}
            isLoading={isLoading}
            userAuth={userAuth}
            display="none"
          />
        ),
    },
  ];

  useEffect(() => {
    getMedias(userAuth);
  }, []);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.media" />
      </Typography.Title>
      <PageContent>
        <Link to="/content/media/upload">
          <Button
            type="primary"
            shape="round"
            size="large"
            style={{ marginBottom: 20 }}
          >
            <FormattedMessage id="app.uploadMedia" />
          </Button>
        </Link>
        {isLoading ? (
          <Spinner />
        ) : (
          <Table
            columns={columns}
            dataSource={medias}
            pagination={{ hideOnSinglePage: true, pageSize: 10 }}
            rowKey={(record) => String(record.ID)}
          />
        )}
      </PageContent>
      <Footer />
    </Layout.Content>
  );
};

const mapStateToProps = ({ medias }) => ({
  isLoading: medias.isLoading,
  medias: medias.medias,
});

export default connect(mapStateToProps, { getMedias, deleteMedia })(Media);
