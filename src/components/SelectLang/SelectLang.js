import React from 'react';
import { Menu, Dropdown } from 'antd';

const SelectLang = ({ locale, setLocale }) => {
  const handleMenuClick = (e) => {
    setLocale(e.key);
  };

  const icon = (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      width="1.2em"
      height="1.2em"
      fill="currentColor"
      aria-hidden="true"
      style={{ marginTop: 3 }}
    >
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "></path>
    </svg>
  );

  const menu = (
    <Menu onClick={handleMenuClick} style={{ marginTop: 8 }}>
      <Menu.Item
        key="en"
        style={{ border: locale === 'en' && '1px solid rgba(0, 0, 0, 0.85)' }}
      >
        English
      </Menu.Item>
      <Menu.Item
        key="zh-TW"
        style={{
          border: locale === 'zh-TW' && '1px solid rgba(0, 0, 0, 0.85)',
        }}
      >
        正體中文
      </Menu.Item>
    </Menu>
  );

  return <Dropdown.Button overlay={menu} placement="bottomRight" icon={icon} />;
};

export default SelectLang;
