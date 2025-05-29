import React from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
const Navbar = ({ user, onProfileClick, onLogout }) => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt="Logo" />
      <h1>Admin Panel</h1>
      <div className="navbar-actions">
        <img className='profile' src={assets.profile_image} alt="Profile" onClick={onProfileClick} style={{ cursor: 'pointer' }} />
        {user && (
          <button onClick={onLogout} className="logout-btn">
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
