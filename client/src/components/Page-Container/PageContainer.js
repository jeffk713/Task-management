import React from 'react';
import { Route } from 'react-router-dom'

import TaskPage from '../Pages/Task-page/TaskPage';
import UserPage from '../Pages/User-page/UserPage';
import SignInAndUpPage from '../Pages/Sign-in-and-up-page/SignInAndUpPage';

import './PageContainer.style.scss'

const PageContainer = () => {
  return (
    <div className='page-container'>
      <Route path='/task' component={TaskPage} />
      <Route path='/user' component={UserPage} />
      <Route path='/sign' component={SignInAndUpPage} />
    </div>
  )
}

export default PageContainer;