import React from 'react';
import { Radio } from 'antd';

import LandscapeTemplate from './LandscapeTemplate';
import PortraitTemplate from './PortraitTemplate';

const ChooseTemplate = ({
  orientation,
  landScapeResolution,
  portraitResolution,
  landscapeTemplate,
  portraitTemplate,
  orientationOnChange,
  landScapeResolutionOnChange,
  portraitResolutionOnChange,
  landscapeTemplateOnChange,
  portraitTemplateOnChange,
}) => {
  const { Group } = Radio;

  return (
    <>
      <p>Orientation:</p>
      <Group
        value={orientation}
        onChange={orientationOnChange}
        style={{ paddingLeft: '20px', marginBottom: '40px' }}
      >
        <Radio value="landscape">Lacdscape</Radio>
        <Radio value="portrait">Portrait</Radio>
      </Group>
      <p>Resolution:</p>
      {orientation === 'landscape' ? (
        <Group
          value={landScapeResolution}
          onChange={landScapeResolutionOnChange}
          style={{ paddingLeft: '20px', marginBottom: '30px' }}
        >
          <Radio value="1920x1080">1920 x 1080</Radio>
          <Radio value="3840x2160">3840 x 2160</Radio>
        </Group>
      ) : (
        <Group
          value={portraitResolution}
          onChange={portraitResolutionOnChange}
          style={{ paddingLeft: '20px', marginBottom: '30px' }}
        >
          <Radio value="1080x1920">1080 x 1920</Radio>
          <Radio value="2160x3840">2160 x 3840</Radio>
        </Group>
      )}

      <p>Layout:</p>
      {orientation === 'landscape' ? (
        <LandscapeTemplate
          landscapeTemplate={landscapeTemplate}
          landscapeTemplateOnChange={landscapeTemplateOnChange}
        />
      ) : (
        <PortraitTemplate
          portraitTemplate={portraitTemplate}
          portraitTemplateOnChange={portraitTemplateOnChange}
        />
      )}
    </>
  );
};

export default ChooseTemplate;
