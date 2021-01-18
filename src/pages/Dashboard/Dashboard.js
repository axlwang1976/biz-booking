import React from 'react';
import { Layout, Typography } from 'antd';
import { FormattedMessage } from 'react-intl';

import PageContent from '../../components/PageContent/PageContent';
import Footer from '../../components/Footer/Footer';

const Dashboard = ({ collapsed }) => {
  const { Content } = Layout;
  const { Title } = Typography;

  return (
    <Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Title level={3}>
        <FormattedMessage id="app.dashboard" />
      </Title>
      <PageContent>
        <Title level={2} style={{ textAlign: 'center' }}>
          <FormattedMessage
            id="app.welcome"
            values={{ productName: 'Bizlution FMS' }}
          />
        </Title>
      </PageContent>
      <Footer />
    </Content>
  );
};

export default Dashboard;
