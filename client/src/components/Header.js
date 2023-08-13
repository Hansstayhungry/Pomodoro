import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import Player from './Player';

import logo from '../logo.png';
import '../styles/Header.scss';

const Header = (props) => {
  const { handleAmbientToggle, handleHomeToggle, audioUrl, handleSignIn, handleSignUp, loggedInUser, setLoggedInUser, handleSignOut } = props;

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#f2933f',
      },
      secondary: {
        main: '#f2ce3f',
      },
    },
  });
  

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="fixed" className="header-container">
        <Toolbar>
          <Grid container alignItems="center" className="gridbar">
            <img src={logo} />
            <Typography variant="h3" className='logo'>
              Doro - Your Personal Productivity Booster
            </Typography>
            {Object.keys(loggedInUser).length == 0 && <div className="auth-links">
              <Button onClick={handleSignIn} color="inherit" href="" className="auth-button">
                Login
              </Button>
              <Button onClick={handleSignUp} color="inherit" href="" className="auth-button">
                Sign Up
              </Button>
            </div>}
            {Object.keys(loggedInUser).length > 0 && <div className="auth-links">
              <p>Logged In As: {loggedInUser['email']}</p>
              <Button onClick={async () => {await handleSignOut();}} color="inherit" href="" className="auth-button">
                Logout
              </Button>
            </div>}
          </Grid>
        </Toolbar>
        <div className="player-container">
            <Player audioUrl={audioUrl}/>        
        </div>
        <div className="nav-bar">
          <Button className="nav-bar-item" color="inherit" onClick={handleHomeToggle}>
            Home
          </Button>
          <Button className="nav-bar-item" color="inherit" onClick={handleAmbientToggle}>
            Ambient Sound
          </Button>
        </div>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
