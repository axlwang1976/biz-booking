import React from 'react';
import { Spin } from 'antd';

import './Spinner.css';

const Spinner = () => {
  return (
    <div className="Spinner">
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Spinner;
