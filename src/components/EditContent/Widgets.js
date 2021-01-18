import React, { useState } from 'react';
import { Divider, Typography, Radio } from 'antd';

import ScrollingText from './ScrollingText';

const Widgets = ({ closeModal, addNewScrollingText, currentTab }) => {
  const [selectWidget, setSelectWidget] = useState('scrollingText');
  const { Title } = Typography;
  const { Group, Button } = Radio;

  const renderWidget = (widgetName) => {
    if (widgetName === 'scrollingText') {
      return (
        <ScrollingText
          closeModal={closeModal}
          addNewScrollingText={addNewScrollingText}
          currentTab={currentTab}
        />
      );
    }
    return <p>test</p>;
  };

  return (
    <>
      <Title level={5}>Select widget</Title>
      <Group
        defaultValue="scrollingText"
        onChange={(e) => setSelectWidget(e.target.value)}
        buttonStyle="solid"
      >
        <Button value="scrollingText">
          <i className="fas fa-scroll" style={{ marginRight: 5 }}></i>Scrolling
          Text
        </Button>
        <Button value="test">test</Button>
      </Group>
      <Divider />
      {renderWidget(selectWidget)}
    </>
  );
};

export default Widgets;
