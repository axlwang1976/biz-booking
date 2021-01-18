import React from 'react';
import { Radio } from 'antd';

import { findTemplate } from '../../utils/findTemplate';

const landscapeTemplates = [
  'layout1',
  'layout3',
  'layout4',
  'layout5',
  'layout6',
];

const LandscapeTemplate = ({
  landscapeTemplate,
  landscapeTemplateOnChange,
}) => {
  const { Group } = Radio;

  return (
    <Group
      value={landscapeTemplate}
      onChange={landscapeTemplateOnChange}
      style={{ paddingLeft: '20px' }}
    >
      {landscapeTemplates.map((el) => (
        <Radio value={el} key={el}>
          <img
            src={findTemplate(el)}
            alt="template"
            style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
          />
        </Radio>
      ))}
    </Group>
  );
};

export default LandscapeTemplate;
