import React from 'react'
import '../styles/SideBar.css';
import { NavLink } from 'react-router-dom';



const SideBar = () => {

  const sideBarData = [
    {
      id:1,
      title: 'Arrivals by Airport',
      path:'/dashboard/arriveflights'
    },

    {
      id:2,
      title: 'Departures by Airport',
      path:'/dashboard/departflights'
    }
  ]

  return (
    <div className='sidebar_container'>
      <div className="sidebar_logo">
        <h2>Chillycee Air</h2>
      </div>

      
      <div className="sidebar_section2" >
  
        < div className="sidebar_nav_links">

        {sideBarData.map((data) =>(
          
          <NavLink to={data.path} key={data.id}>
            <p>{data.title}</p>
          </NavLink>

          ))}
        </div>

        <div className="logout_container">
          <NavLink to='/'><p>Logout</p></NavLink>
        </div>
      </div>
      
    </div>
  )
}

export default SideBar;