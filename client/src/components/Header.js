import React from 'react';
import Player from './Player';

import '../styles/Header.scss';

const Header = (props) => {
  const { handleAmbientToggle, audioUrl } = props;

  return (
    <div className = "header">
    <section>
      <Player audioUrl = {audioUrl} />
      <h1>Doro - Your Personal Productivity Booster</h1>
      <div className="auth-links">
        <a href="/login">Login</a>
        <a href="/signup">Sign Up</a>
      </div>
    </section>
    <div className = "nav-bar">
      <div className="nav-bar-item"> Home </div>
      <div className="nav-bar-item" onClick={(handleAmbientToggle)}> Ambient Sound </div>
    </div>
    </div>
  )
}

export default Header;