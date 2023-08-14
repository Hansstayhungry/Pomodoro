import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import Player from './Player';

import logo from '../logo.png';
import '../styles/Header.scss';

const Header = (props) => {
  const { handleAmbientToggle, handleHomeToggle, audioUrl, handleSignIn, handleSignUp, loggedInUser, setLoggedInUser, handleSignOut } = props;

  return (
    <AppBar position="sticky" sx={{backgroundColor: 'orange'}} className="header-container">
      <Toolbar>
        <Grid container alignItems="center" className="gridbar">
          <img src={logo} />
          <Typography variant="h3" className='logo'>
            Doro - Your Personal Productivity Booster
          </Typography>
          {Object.keys(loggedInUser).length == 0 && <div className="auth-links">
            <Button onClick={handleSignIn} color="inherit" href="" className="auth-button">
              <Typography variant="h6">Log in</Typography>
            </Button>
            <Button onClick={handleSignUp} color="inherit" href="" className="auth-button">
              <Typography variant="h6">Sign up</Typography>
            </Button>
          </div>}
          {Object.keys(loggedInUser).length > 0 && <div className="auth-links">
            <Typography variant='subtitle1'>Logged In As: {loggedInUser['email']}</Typography>
            <Button onClick={async () => {await handleSignOut();}} color="inherit" href="" className="auth-button">
              <Typography variant="h6">Logout</Typography>
            </Button>
          </div>}
        </Grid>
      </Toolbar>
      <div className="player-container">
          <Player audioUrl={audioUrl}/>        
      </div>
      <div className="nav-bar">
        <Button className="nav-bar-item" color="inherit" onClick={handleHomeToggle}>
          <Typography variant="h6">Home</Typography>
        </Button>
        <Button className="nav-bar-item" color="inherit" onClick={handleAmbientToggle}>
          <Typography variant="h6">Ambient Sounds</Typography>
        </Button>
      </div>
    </AppBar>    
  );
};

export default Header;
