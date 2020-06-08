import React from 'react';
import { Link } from 'react-router-dom';

import './Header.style.scss'

const Header = () => {
  return(
    <div className='header-container'>
      <h1>TASK MANAGER</h1>
      <div className='nav-bar'>
        <Link className='link' to='/task'>Tasks</Link>
        <Link className='link' to='/user'>User</Link>
        <Link className='link' to='/sign'>Sign in</Link>
      </div>
    </div>
  )
};

export default Header;