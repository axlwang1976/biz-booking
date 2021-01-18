import React from 'react';
import { Radio } from 'antd';

import { findTemplate } from '../../utils/findTemplate';

const portraitTemplates = [
  'layout8',
  'layout9',
  'layout10',
  'layout11',
  'layout12',
];

const PortraitTemplate = ({ portraitTemplate, portraitTemplateOnChange }) => {
  const { Group } = Radio;

  return (
    <Group
      value={portraitTemplate}
      onChange={portraitTemplateOnChange}
      style={{ paddingLeft: '20px' }}
    >
      {portraitTemplates.map((el) => (
        <Radio value={el} key={el}>
          <img
            src={findTemplate(el)}
            alt="template"
            style={{ height: '100px', width: 'auto', marginBottom: '10px' }}
          />
        </Radio>
      ))}
    </Group>
  );
};

export default PortraitTemplate;
