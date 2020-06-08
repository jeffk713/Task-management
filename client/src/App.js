import React from 'react';
import { Route } from 'react-router-dom'

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PageContainer from './components/Page-Container/PageContainer';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <PageContainer />
      <Footer />
    </div>
  );
};

export default App;
