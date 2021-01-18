/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import './EditContent.css';
import { getMedias } from '../../redux/actions/mediasActions';
import Spinner from '../Spinner/Spinner';
import MiniRegion from './MiniRegion';
import EditZone from './EditZone';
import { getRegionInfo } from '../../utils/getRegionCounts';

const EditContent = ({
  isLoading,
  medias,
  getMedias,
  regionInfo,
  orientation,
  contentName,
  template,
  resolution,
  selectContent,
  userAuth,
}) => {
  const [region1IsActive, setRegion1IsActive] = useState(true);
  const [region2IsActive, setRegion2IsActive] = useState(false);
  const [region3IsActive, setRegion3IsActive] = useState(false);
  const [region4IsActive, setRegion4IsActive] = useState(false);
  const [region5IsActive, setRegion5IsActive] = useState(false);

  const tab1OnClick = () => {
    setRegion1IsActive(true);
    setRegion2IsActive(false);
    setRegion3IsActive(false);
    setRegion4IsActive(false);
    setRegion5IsActive(false);
  };
  const tab2OnClick = () => {
    setRegion1IsActive(false);
    setRegion2IsActive(true);
    setRegion3IsActive(false);
    setRegion4IsActive(false);
    setRegion5IsActive(false);
  };
  const tab3OnClick = () => {
    setRegion1IsActive(false);
    setRegion2IsActive(false);
    setRegion3IsActive(true);
    setRegion4IsActive(false);
    setRegion5IsActive(false);
  };
  const tab4OnClick = () => {
    setRegion1IsActive(false);
    setRegion2IsActive(false);
    setRegion3IsActive(false);
    setRegion4IsActive(true);
    setRegion5IsActive(false);
  };
  const tab5OnClick = () => {
    setRegion1IsActive(false);
    setRegion2IsActive(false);
    setRegion3IsActive(false);
    setRegion4IsActive(false);
    setRegion5IsActive(true);
  };

  useEffect(() => {
    getMedias(userAuth);
  }, []);

  return !isLoading ? (
    <div className="container">
      <div
        className={
          orientation === 'landscape' ? 'layout-wrapper-l' : 'layout-wrapper-p'
        }
      >
        {regionInfo &&
          regionInfo.map((region, i) => (
            <MiniRegion
              key={i}
              region={region}
              index={i}
              region1IsActive={region1IsActive}
              region2IsActive={region2IsActive}
              region3IsActive={region3IsActive}
              region4IsActive={region4IsActive}
              region5IsActive={region5IsActive}
            />
          ))}
      </div>
      <div className="edit-zone">
        <EditZone
          tabsCount={regionInfo && regionInfo.length}
          tab1OnClick={tab1OnClick}
          tab2OnClick={tab2OnClick}
          tab3OnClick={tab3OnClick}
          tab4OnClick={tab4OnClick}
          tab5OnClick={tab5OnClick}
          medias={medias}
          contentName={contentName}
          template={template}
          resolution={resolution}
          selectContent={selectContent}
          userAuth={userAuth}
          regionInfo={getRegionInfo(template)}
        />
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = ({ medias }) => ({
  isLoading: medias.isLoading,
  medias: medias.medias,
});

export default connect(mapStateToProps, { getMedias })(EditContent);
