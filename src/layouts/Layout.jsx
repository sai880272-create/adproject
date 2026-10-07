import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import LuxeAIWidget from '../components/LuxeAIWidget';
import './Layout.css';

const Layout = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-container">
        <TopBar />
        <main className="content-area">
          <Outlet />
        </main>
      </div>
      <LuxeAIWidget />
    </div>
  );
};

export default Layout;
