import React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import '../styles/Header.scss';

const Header = (props) => {
  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <section>
      <div>
        <PlayArrowIcon />
        <Box sx={{ width: 200 }}>
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider aria-label="Volume" value={value} onChange={handleChange} />
            <VolumeUp />
          </Stack>
        </Box>        
      </div>
      <h1>Doro - Your Personal Productivity Booster</h1>
      <div className="auth-links">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
    </section>
  )
}

export default Header;