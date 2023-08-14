import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import '../styles/Login.scss'


// TODO remove, this demo shouldn't need to reset the theme.

const Signin = (props) => {

  const { handleHomeToggle, handleSignUp, loggedInUser, setLoggedInUser, loginEmailError, setLoginEmailError, loginPasswordError, setLoginPasswordError } = props;


  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{1,}$/i;
    if (data.get('email').trim() === '' || !emailRegex.test(data.get('email').trim())) {
      setLoginEmailError(true);
      return;
    } else {
      setLoginEmailError(false);
    }
    if (data.get('password').trim() === '' || data.get('password').length < 8) {
      setLoginPasswordError(true);
      return;
    } else {
      setLoginPasswordError(false);
    }
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    const loginUser = {
      email: data.get('email'),
      password: data.get('password')
    };
    const response = await axios.post('/users/login', loginUser);
    if (response.data['users'].length > 0) {
      const userLoggedIn = {
        id: response.data['users'][0]['id'],
        email: response.data['users'][0]['email']
      };
      setLoggedInUser(userLoggedIn);
      console.log(userLoggedIn);
      handleHomeToggle();      
    }
  };

  return (
    <div className='loginContainer'>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={loginEmailError}
                helperText={loginEmailError ? 'Email address has to be valid' : ''}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                error={loginPasswordError}
                helperText={loginPasswordError ? 'Password has to be at least 8 characters' : ''}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link onClick={handleSignUp} style={{ cursor: 'pointer' }} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </div>

  );
}

export default Signin;