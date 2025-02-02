import React from 'react'
import './AppDoenload.css'
import { assets } from '../../assets/frontend_assets/assets'
const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br /> Kirna stroe App </p>
      
      <p className='soon'> coming soon...</p>
      <div className="app-download-platforms">
        <img src={assets.play_store} alt="" />
        <img src={assets.app_store} alt="" />
      </div>
    </div>
  )
}

export default AppDownload
