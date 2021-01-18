/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Button, Typography, Modal, Divider } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import PageContent from '../PageContent/PageContent';
import {
  deleteChannel,
  publishChannel,
} from '../../redux/actions/channelsActions';
import { getSchedules } from '../../redux/actions/schedulesActions';
import Spinner from '../Spinner/Spinner';
import ScheduleInChannel from '../ScheduleInChannel/ScheduleInChannel';

const Channel = ({
  channel,
  userAuth,
  deleteChannel,
  history,
  intl,
  getSchedules,
  isLoading,
  schedules,
  publishChannel,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const handleDelete = () => deleteChannel(userAuth, channel.ID);

  const handlePublish = () => {
    publishChannel(userAuth, channel.ID);
    setShowPublishModal(false);
  };

  useEffect(() => {
    getSchedules(userAuth);
  }, []);

  return !isLoading ? (
    <>
      <PageContent>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex' }}>
            <Typography.Title level={5} style={{ marginRight: 20 }}>
              {`${intl.formatMessage({ id: 'app.channelName' })}: ${
                channel.ChannelName
              }`}
            </Typography.Title>
            <Button
              type="primary"
              size="middle"
              style={{ marginRight: 10 }}
              shape="round"
              onClick={() => history.push(`/content/channel/${channel.ID}`)}
            >
              <EditOutlined />
            </Button>
            <Button
              type="danger"
              size="middle"
              shape="round"
              onClick={() => setShowDeleteModal(true)}
            >
              <DeleteOutlined />
            </Button>
          </div>
          {schedules.length !== 0 && (
            <Button
              type="primary"
              size="middle"
              shape="round"
              onClick={() => setShowPublishModal(true)}
            >
              <FormattedMessage id="app.publish" />
            </Button>
          )}
        </div>
        <Divider />
        <Button
          type="primary"
          size="middle"
          onClick={() =>
            history.push(`/content/channel/${channel.ID}/schedule/create`)
          }
          style={{ marginBottom: 20 }}
        >
          <FormattedMessage id="app.createSchedule" />
        </Button>
        <ScheduleInChannel
          schedules={schedules.filter(
            (schedule) => schedule.ChannelNo === channel.ID
          )}
          channelNo={channel.ID}
          userAuth={userAuth}
        />
      </PageContent>
      <Modal
        title={<FormattedMessage id="app.deleteItem" />}
        visible={showDeleteModal}
        onOk={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        okText={<FormattedMessage id="app.delete" />}
        cancelText={<FormattedMessage id="app.cancel" />}
      >
        <p>
          <FormattedMessage id="app.sureDelete" />
        </p>
      </Modal>
      <Modal
        title={<FormattedMessage id="app.publishSchedules" />}
        visible={showPublishModal}
        onOk={handlePublish}
        onCancel={() => setShowPublishModal(false)}
        okText={<FormattedMessage id="app.publish" />}
        cancelText={<FormattedMessage id="app.cancel" />}
      >
        <p>
          <FormattedMessage id="app.surePublish" />
        </p>
      </Modal>
    </>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ schedules }) => ({
  isLoading: schedules.isLoading,
  schedules: schedules.schedules,
});

export default connect(mapStateToProps, {
  deleteChannel,
  getSchedules,
  publishChannel,
})(withRouter(injectIntl(Channel)));
