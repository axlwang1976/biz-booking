/*eslint-disable react-hooks/exhaustive-deps*/
import React, { useState, useEffect } from 'react';
import { Button, Tabs, Typography, Modal, Divider } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { FormattedMessage, injectIntl } from 'react-intl';

import AllMedias from './AllMedias';
import SelectedMediasTable from './SelectedMediasTable';
import { createOrUpdateContent } from '../../redux/actions/contentsActions';
import fileIcon from '../../assets/images/file.svg';
import gearIcon from '../../assets/images/gear.svg';
import IconButton from './IconButton';
import Widgets from './Widgets';

const EditZone = ({
  tabsCount,
  tab1OnClick,
  tab2OnClick,
  tab3OnClick,
  tab4OnClick,
  tab5OnClick,
  medias,
  contentName,
  createOrUpdateContent,
  template,
  resolution,
  history,
  selectContent,
  match,
  userAuth,
  intl,
  regionInfo,
}) => {
  const [mediasInContent, setMediasInContent] = useState(null);
  const [showMediasModal, setShowMediasModal] = useState(false);
  const [showWidgetsModal, setShowWidgetsModal] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [reOrderedMedias, setReOrderedMedias] = useState(null);
  const { Title } = Typography;
  const { TabPane } = Tabs;
  const tabs = [];
  const regionMedias = [];

  const getPreview = async (id) => {
    try {
      const res = await axios.get(`/ContentApi/DownloadMedia/SN/${id}`, {
        headers: {
          Accesstoken: userAuth.Accesstoken,
          Client: userAuth.Client,
          Uid: userAuth.Uid,
        },
        responseType: 'blob',
      });
      return URL.createObjectURL(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  for (let i = 1; i <= tabsCount; i++) {
    tabs.push(i);
    regionMedias.push({ region: i, position: regionInfo[i - 1], medias: [] });
  }

  const handleRegionActive = (key) => {
    if (key === '1') {
      tab1OnClick();
    } else if (key === '2') {
      tab2OnClick();
    } else if (key === '3') {
      tab3OnClick();
    } else if (key === '4') {
      tab4OnClick();
    } else if (key === '5') {
      tab5OnClick();
    }
    setCurrentTab(Number(key));
  };

  const addNewScrollingText = (tab, scrollingText) => {
    const selectRegion = mediasInContent.find((el) => el.region === tab);
    const newSelectRegion = {
      ...selectRegion,
      medias: [...selectRegion.medias, scrollingText],
    };
    const newMediasInContent = mediasInContent.map((el) => {
      if (el.region === tab) {
        return newSelectRegion;
      }
      return el;
    });
    setMediasInContent(newMediasInContent);
  };

  const addNewMedias = (tab, medias) => {
    const selectRegion = mediasInContent.find((el) => el.region === tab);
    const newSelectRegion = {
      ...selectRegion,
      medias: selectRegion.medias.concat(medias),
    };
    const newMediasInContent = mediasInContent.map((el) => {
      if (el.region === tab) {
        return newSelectRegion;
      }
      return el;
    });
    setMediasInContent(newMediasInContent);
  };

  const updateMedia = (tab, media, id) => {
    const selectRegion = mediasInContent.find((el) => el.region === tab);
    const newSelectRegion = {
      ...selectRegion,
      medias: selectRegion.medias.map((el) => {
        if (el.ID === id) {
          return media;
        }
        return el;
      }),
    };
    const newMediasInContent = mediasInContent.map((el) => {
      if (el.region === tab) {
        return newSelectRegion;
      }
      return el;
    });
    setMediasInContent(newMediasInContent);
  };

  const deleteMedia = (tab, id) => {
    const selectRegion = mediasInContent.find((el) => el.region === tab);
    const newSelectRegion = {
      ...selectRegion,
      medias: selectRegion.medias.filter((el) => el.ID !== id),
    };
    const newMediasInContent = mediasInContent.map((el) => {
      if (el.region === tab) {
        return newSelectRegion;
      }
      return el;
    });
    setMediasInContent(newMediasInContent);
  };

  const handleCreateContent = () => {
    const newContent = {
      contentName,
      template,
      inSchedule: '',
      resolution,
      updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      allMedias: mediasInContent,
    };
    createOrUpdateContent(newContent);
    history.push('/contents');
  };

  const handleUpdateContent = () => {
    const updatedContent = {
      ...selectContent,
      contentName,
      updateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
      allMedias: mediasInContent,
    };
    createOrUpdateContent(match.params.id, updatedContent);
    history.push('/contents');
  };

  useEffect(() => {
    if (selectContent) {
      setMediasInContent(selectContent.allMedias);
    } else {
      setMediasInContent(regionMedias);
    }
  }, []);

  useEffect(() => {
    if (mediasInContent) {
      const selectRegion = mediasInContent.find(
        (el) => el.region === currentTab
      );
      const newSelectRegion = {
        ...selectRegion,
        medias: reOrderedMedias,
      };
      const newMediasInContent = mediasInContent.map((el) => {
        if (el.region === currentTab) {
          return newSelectRegion;
        }
        return el;
      });
      setMediasInContent(newMediasInContent);
    }
  }, [reOrderedMedias]);

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={handleRegionActive}>
        {tabs.map((tab) => {
          return (
            mediasInContent && (
              <TabPane key={tab} tab={`Region ${tab}`}>
                <div style={{ display: 'flex' }}>
                  <IconButton
                    imgSrc={fileIcon}
                    showModal={setShowMediasModal}
                    text="Medias"
                  />
                  <IconButton
                    imgSrc={gearIcon}
                    showModal={setShowWidgetsModal}
                    text="Widget"
                  />
                </div>
                <Divider />
                {mediasInContent[tab - 1].medias.length ? (
                  <>
                    <SelectedMediasTable
                      medias={mediasInContent[tab - 1].medias}
                      deleteMedia={deleteMedia}
                      currentTab={currentTab}
                      updateMedia={updateMedia}
                      setReOrderedMedias={setReOrderedMedias}
                      getPreview={getPreview}
                    />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {selectContent && (
                        <Button
                          onClick={() => history.push('/contents')}
                          style={{ marginRight: 10 }}
                        >
                          Cancel
                        </Button>
                      )}
                      <Button
                        type="primary"
                        onClick={
                          selectContent
                            ? handleUpdateContent
                            : handleCreateContent
                        }
                      >
                        <FormattedMessage id="app.submit" />
                      </Button>
                    </div>
                  </>
                ) : (
                  <Title level={2}>{`No media in region${tab}`}</Title>
                )}
              </TabPane>
            )
          );
        })}
      </Tabs>
      <Modal
        title={`${intl.formatMessage({
          id: 'app.selectMedias',
        })} region ${currentTab}`}
        centered
        visible={showMediasModal}
        onOk={() => {}}
        onCancel={() => setShowMediasModal(false)}
        width="80%"
        className="medias-modal"
        footer={null}
      >
        <AllMedias
          currentTab={currentTab}
          medias={medias}
          addNewMedias={addNewMedias}
          closeModal={setShowMediasModal}
          getPreview={getPreview}
        />
      </Modal>
      <Modal
        title={`Add new widget to region ${currentTab}`}
        centered
        visible={showWidgetsModal}
        onOk={() => {}}
        onCancel={() => setShowWidgetsModal(false)}
        footer={null}
      >
        <Widgets
          closeModal={setShowWidgetsModal}
          addNewScrollingText={addNewScrollingText}
          currentTab={currentTab}
        />
      </Modal>
    </>
  );
};

export default connect(null, { createOrUpdateContent })(
  withRouter(injectIntl(EditZone))
);
