import React from 'react';

const MiniRegion = ({
  region,
  index,
  region1IsActive,
  region2IsActive,
  region3IsActive,
  region4IsActive,
  region5IsActive,
}) => {
  const renderBgColor = (index) => {
    switch (index) {
      case 0:
        return '#c2e9ed';
      case 1:
        return '#66e6d4';
      case 2:
        return '#25ad9a';
      case 3:
        return '#0d7465';
      case 4:
        return '#035146';
      default:
        break;
    }
  };

  const renderBoxShadow = (index) => {
    switch (index) {
      case 0:
        if (region1IsActive) return 'inset 0px 0px 0px 3px rgba(0, 0, 0, 0.6)';
        break;
      case 1:
        if (region2IsActive) return 'inset 0px 0px 0px 3px rgba(0, 0, 0, 0.6)';
        break;
      case 2:
        if (region3IsActive) return 'inset 0px 0px 0px 3px rgba(0, 0, 0, 0.6)';
        break;
      case 3:
        if (region4IsActive) return 'inset 0px 0px 0px 3px rgba(0, 0, 0, 0.6)';
        break;
      case 4:
        if (region5IsActive) return 'inset 0px 0px 0px 3px rgba(0, 0, 0, 0.6)';
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{
        width: region.width,
        height: region.height,
        position: 'absolute',
        left: region.left,
        top: region.top,
        backgroundColor: renderBgColor(index),
        boxShadow: renderBoxShadow(index),
      }}
    ></div>
  );
};

export default MiniRegion;
