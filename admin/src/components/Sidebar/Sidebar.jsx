import React from 'react'
import './Sidebar.css'
import {assets} from '../../assets/admin_assets/assets'
import { NavLink } from 'react-router-dom'
const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/' className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Itmes</p>
            </NavLink>
            <NavLink to='/order' className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders Items</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
