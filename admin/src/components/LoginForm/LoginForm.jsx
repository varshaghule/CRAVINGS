import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);
    if (isValidEmail(email) && password.trim()) {
      onLogin({ email });
      setEmail('');
      setPassword('');
    } else {
      alert('Please enter a valid email and password');
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <h2>Admin Login</h2>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="new-password"
        />
        <button className="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
