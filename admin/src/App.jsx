import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Orders from './pages/Orders/Orders';
import LoginForm from './components/LoginForm/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
const App = () => {
  const url = "https://cravings-backend-b7kq.onrender.com";
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(true); 
  const handleLogin = (userData) => {
    setUser(userData);
    setShowLogin(false);
  };
  const handleProfileClick = () => {
    if (!user) setShowLogin(true);
  };
  const handleLogout = () => {
    setUser(null);
    setShowLogin(true); 
  };
  return (
    <div className="app-background">
      <ToastContainer />
      <Navbar user={user} onProfileClick={handleProfileClick} onLogout={handleLogout} />
      <hr />
      {showLogin && !user && <LoginForm onLogin={handleLogin} />}
      {user && (
        <div className="app-content">
          <Sidebar />
          <Routes>
            <Route path="/add" element={<Add url={url} />} />
            <Route path="/list" element={<List url={url} />} />
            <Route path="/orders" element={<Orders url={url} />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
