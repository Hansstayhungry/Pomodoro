import React from 'react';
import { AppBar, Toolbar, Typography, Button, Grid, ThemeProvider, createTheme } from '@mui/material';
import Player from './Player';

// import '../styles/Header.scss';

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
    <ThemeProvider theme= {customTheme}>
      <AppBar position="static">
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item xs={2}> {/* Adjust the value of xs to control the width */}
              <Player audioUrl={audioUrl} color="inherit"/>
            </Grid>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1, paddingLeft: 12}}>
                Doro - Your Personal Productivity Booster
              </Typography>
              <div className="auth-links">
                <Button color="inherit" href=""
                 sx={{ backgroundColor: customTheme.palette.secondary.main }}>
                  Login
                </Button>
                <Button color="inherit" href=""
                 sx={{ backgroundColor: customTheme.palette.secondary.main }}>
                  Sign Up
                </Button>
              </div>
          </Grid>
        </Toolbar>
        <div className="nav-bar" style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            className="nav-bar-item"
            color="inherit"
            onClick={handleHomeToggle}
          >
            Home
          </Button>
          <Button
            className="nav-bar-item"
            color="inherit"
            onClick={handleAmbientToggle}
          >
            Ambient Sound
          </Button>
        </div>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
