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


// TODO remove, this demo shouldn't need to reset the theme.

const Signup = (props) => {

  const { handleHomeToggle, handleSignIn, loggedInUser, setLoggedInUser, signUpFirstNameError, setSignUpFirstNameError, signUpLastNameError, setSignUpLastNameError, signUpEmailError, setSignUpEmailError, signUpPasswordError, setSignUpPasswordError, setCookie } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]{1,}$/i;
    if (data.get('firstName').trim() === '') {
      setSignUpFirstNameError(true);
      return;
    } else {
      setSignUpFirstNameError(false);
    }
    if (data.get('lastName').trim() === '') {
      setSignUpLastNameError(true);
      return;
    } else {
      setSignUpLastNameError(false);
    }
    if (!emailRegex.test(data.get('email').trim())) {
      setSignUpEmailError(true);
      return;
    } else {
      setSignUpEmailError(false);
    }
    if (data.get('password').trim() === '' || data.get('password').length < 8) {
      setSignUpPasswordError(true);
      return;
    } else {
      setSignUpPasswordError(false);
    }
    console.log({
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    });
    const newUser = {
      first_name: data.get('firstName'),
      last_name: data.get('lastName'),
      email: data.get('email'),
      password: data.get('password')
    };
    const response = await axios.post('/users/register', newUser);
    if (response.data['users'].length > 0) {
      const userLoggedIn = {
        id: response.data['users'][0]['id'],
        email: response.data['users'][0]['email'],
        first_name: response.data['users'][0]['first_name']
      };
      setCookie('user_id', response.data['users'][0]['id']);
      setLoggedInUser(userLoggedIn);
      console.log(userLoggedIn);
      handleHomeToggle();
    }
  };

  return (
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={signUpFirstNameError}
                  helperText={signUpFirstNameError ? 'First name can not be empty' : ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={signUpLastNameError}
                  helperText={signUpLastNameError ? 'Last name can not be empty' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={signUpEmailError}
                  helperText={signUpEmailError ? 'Email address has to be valid' : ''}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={signUpPasswordError}
                  helperText={signUpPasswordError ? 'Password has to be at least 8 characters' : ''}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link onClick={handleSignIn} style={{ cursor: 'pointer' }} variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}

export default Signup;