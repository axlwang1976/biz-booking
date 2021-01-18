import React from 'react';

import './Logo.css';
import logo from '../../assets/images/logo.png';

const Logo = () => (
  <div className="logo">
    <img src={logo} alt="logo" style={{ width: '80%' }} />
  </div>
);

export default Logo;
