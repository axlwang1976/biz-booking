import React, { useState } from 'react';
import { Layout, Divider, Badge, notification, Typography } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { IntlProvider, FormattedMessage } from 'react-intl';

import './Header.css';
import SelectLang from '../SelectLang/SelectLang';

// Temporary
const notificationList = ['notification 1', 'notification 2'];

const Header = ({ setLocale, locale, messages, userAuth }) => {
  const [count, setCount] = useState(2);
  const { Header } = Layout;
  const { Paragraph } = Typography;

  const handleNotificationClick = () => {
    notification.info({
      message: (
        <IntlProvider
          locale={locale}
          key={locale}
          defaultLocale="en"
          messages={messages}
        >
          <FormattedMessage id="app.notificationTitle" />
        </IntlProvider>
      ),
      description: (
        <IntlProvider
          locale={locale}
          key={locale}
          defaultLocale="en"
          messages={messages}
        >
          <ul>
            {notificationList.length ? (
              notificationList.map((el) => <li key={el}>{el}</li>)
            ) : (
              <Paragraph>
                <FormattedMessage id="app.noNotification" />
              </Paragraph>
            )}
          </ul>
        </IntlProvider>
      ),
      placement: 'topRight',
      duration: 0,
      top: 8,
    });
    setCount(0);
  };

  return (
    <Header className="header">
      <Paragraph style={{ margin: 0 }}>
        <FormattedMessage
          id="app.logedInUser"
          values={{
            userName:
              userAuth.Uid === '00000000' ? (
                <FormattedMessage id="app.defaultUser" />
              ) : (
                userAuth.Uid
              ),
          }}
        />
      </Paragraph>
      <Divider
        type="vertical"
        style={{
          borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
          height: 20,
          marginLeft: 20,
        }}
      />
      <div className="badge-wrapper" onClick={handleNotificationClick}>
        <Badge count={count} offset={[5, 3]}>
          <NotificationOutlined style={{ fontSize: '18px' }} />
        </Badge>
      </div>
      <Divider
        type="vertical"
        style={{
          borderLeft: '1px solid rgba(0, 0, 0, 0.3)',
          height: 20,
          marginRight: 12,
        }}
      />
      <SelectLang setLocale={setLocale} locale={locale} />
    </Header>
  );
};

export default Header;
