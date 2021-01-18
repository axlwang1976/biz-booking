/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { Button, Layout, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';
import { getChannels } from '../../redux/actions/channelsActions';
import Channel from '../../components/Channel/Channel';

const Schedule = ({
  collapsed,
  userAuth,
  isLoading,
  channels,
  getChannels,
  history,
}) => {
  useEffect(() => {
    getChannels(userAuth);
  }, []);

  return !isLoading ? (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title level={3}>
          <FormattedMessage id="app.schedules" />
        </Typography.Title>
        <Button
          type="primary"
          onClick={() => history.push('/content/channel/create')}
        >
          <FormattedMessage id="app.createChannel" />
        </Button>
      </div>
      {channels &&
        channels.map((channel) => (
          <div style={{ marginBottom: 30 }} key={channel.ID}>
            <Channel channel={channel} userAuth={userAuth} />
          </div>
        ))}
      <Footer />
    </Layout.Content>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ channels }) => ({
  isLoading: channels.isLoading,
  channels: channels.channels,
});

export default connect(mapStateToProps, { getChannels })(Schedule);
