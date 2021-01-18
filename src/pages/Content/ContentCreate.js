import React, { useState, useEffect } from 'react';
import { Layout, Typography, Steps, Button, Input } from 'antd';

import './steps.css';
import PageContent from '../../components/PageContent/PageContent';
import ChooseTemplate from '../../components/ChooseTemplate/ChooseTemplate';
import EditContent from '../../components/EditContent/EditContent';
import { getRegionCounts } from '../../utils/getRegionCounts';
import { FormattedMessage, injectIntl } from 'react-intl';

const ContentCreate = ({ collapsed, userAuth, history, intl }) => {
  const [current, setCurrent] = useState(0);
  const [orientation, setOrientation] = useState('landscape');
  const [landScapeResolution, setLandScapeResolution] = useState('1920x1080');
  const [portraitResolution, setPortraitResolution] = useState('1080x1920');
  const [landscapeTemplate, setLandscapeTemplate] = useState('layout1');
  const [portraitTemplate, setPortraitTemplate] = useState('layout8');
  const [regionInfo, setRegionInfo] = useState(null);
  const [contentName, setContentName] = useState('');

  const orientationOnChange = (e) => setOrientation(e.target.value);
  const landScapeResolutionOnChange = (e) =>
    setLandScapeResolution(e.target.value);
  const portraitResolutionOnChange = (e) =>
    setPortraitResolution(e.target.value);
  const landscapeTemplateOnChange = (e) => setLandscapeTemplate(e.target.value);
  const portraitTemplateOnChange = (e) => setPortraitTemplate(e.target.value);

  useEffect(() => {
    if (orientation === 'landscape') {
      setRegionInfo(getRegionCounts(landscapeTemplate));
    } else {
      setRegionInfo(getRegionCounts(portraitTemplate));
    }
  }, [landscapeTemplate, orientation, portraitTemplate]);

  const steps = [
    {
      title: `Step 1 - ${intl.formatMessage({ id: 'app.chooseTemplate' })}`,
      content: (
        <ChooseTemplate
          orientation={orientation}
          landScapeResolution={landScapeResolution}
          portraitResolution={portraitResolution}
          landscapeTemplate={landscapeTemplate}
          portraitTemplate={portraitTemplate}
          orientationOnChange={orientationOnChange}
          landScapeResolutionOnChange={landScapeResolutionOnChange}
          portraitResolutionOnChange={portraitResolutionOnChange}
          landscapeTemplateOnChange={landscapeTemplateOnChange}
          portraitTemplateOnChange={portraitTemplateOnChange}
        />
      ),
    },
    {
      title: `Step 2 - ${intl.formatMessage({ id: 'app.editContentAndSave' })}`,
      content: (
        <>
          <Typography.Paragraph style={{ marginBottom: 20 }}>
            {<FormattedMessage id="app.contentName" />}:{' '}
            <Input
              value={contentName}
              style={{ width: 300 }}
              onChange={(e) => setContentName(e.target.value)}
            />
          </Typography.Paragraph>
          <EditContent
            regionInfo={regionInfo}
            orientation={orientation}
            contentName={contentName}
            template={
              orientation === 'landscape' ? landscapeTemplate : portraitTemplate
            }
            resolution={
              orientation === 'landscape'
                ? landScapeResolution
                : portraitResolution
            }
            userAuth={userAuth}
          />
        </>
      ),
    },
  ];

  const next = () => setCurrent(current + 1);
  const prev = () => setCurrent(current - 1);

  return (
    <Layout.Content
      style={{
        padding: collapsed ? '68px 20px 20px 100px' : '68px 20px 20px 220px',
      }}
    >
      <Typography.Title level={3}>
        <FormattedMessage id="app.createContent" />
      </Typography.Title>
      <PageContent>
        <Steps current={current}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          <Button
            style={{ margin: '0 8px' }}
            onClick={() => history.push('/contents')}
          >
            <FormattedMessage id="app.cancel" />
          </Button>
          {current > 0 && (
            <Button
              type="primary"
              style={{ margin: '0 8px' }}
              onClick={() => prev()}
            >
              <FormattedMessage id="app.prev" />
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              <FormattedMessage id="app.next" />
            </Button>
          )}
        </div>
      </PageContent>
    </Layout.Content>
  );
};

export default injectIntl(ContentCreate);
