import React from 'react';
import { Spin } from 'antd';

import './Spinner.css';

const Uploading = () => {
  return (
    <div className="Spinner">
      <Spin size="large" tip="Uploading..." />
    </div>
  );
};

export default Uploading;
