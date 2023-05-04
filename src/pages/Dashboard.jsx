import React from 'react';
import '../styles/Dashboard.css';
import {Outlet} from 'react-router-dom';
import SideBar from '../components/SideBar';
// import NavSearch from '../components/NavSearch';

const Dashboard = () => {
  return (
    <>
      <div className='dashboard_container'>
        <div className='dashboard_sidebar_container'>
          <SideBar />   
        </div>
        
        <div className='dashboard_nav_outlet_container'>
          {/* <NavSearch /> */}
          <Outlet />
        </div>
      </div>
      
    </>
  )
}

export default Dashboard;