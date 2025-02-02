import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/admin_assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.admin_panel} alt="" />
      <img className='profile' src={assets.profile} alt="" />
    </div>
  )
}

export default Navbar
