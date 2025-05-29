import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} />
          <p>Satisfy your cravings by ordering food online.<br/>
            Whether it's a quick lunch, an evening snack,or <br/> 
            late-night craving always there for </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
            <img src={assets.download} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>CONTACT US</h2>
          <ul>
            <li>+91-9078563412</li>
            <li>contact@cravings.com</li>
          </ul>
        </div>
        <div className="footer-content-location">
          <h2>AVAILABLE IN</h2>
          <ul>
            <li>Pune</li>
            <li>Mumbai</li>
            <li>Bangalore</li>
            <li>Delhi</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className='footer-copyright'>Copyright 2025 © cravings.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer