import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import Player from './Player';

import '../styles/Header.scss';

const Header = (props) => {
  const { handleAmbientToggle, handleHomeToggle, audioUrl } = props;

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
      <AppBar position="static" className="header-container">
        <Toolbar>
          <Grid container alignItems="center" className="gridbar">
            <Grid item xs={1.5}>
              <Player audioUrl={audioUrl} color="inherit" />
            </Grid>
            <Typography variant="h3" className='logo'>
              Doro - Your Personal Productivity Booster
            </Typography>
            <div className="auth-links">
              <Button color="inherit" href="" className="auth-button">
                Login
              </Button>
              <Button color="inherit" href="" className="auth-button">
                Sign Up
              </Button>
            </div>
          </Grid>
        </Toolbar>
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
