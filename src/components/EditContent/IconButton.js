import React from 'react';
import { Button } from 'antd';

import './IconButton.css';
import addIcon from '../../assets/images/plus-border.png';

const IconButton = ({ imgSrc, showModal, text }) => {
  return (
    <Button className="button-wrapper" onClick={() => showModal(true)}>
      <div>
        <img src={imgSrc} alt="icon" style={{ width: '80%', opacity: 0.65 }} />
        <img src={addIcon} alt="add" className="add-icon" />
      </div>
      <p style={{ marginBottom: 0 }}>{`Add New ${text}`}</p>
    </Button>
  );
};

export default IconButton;
