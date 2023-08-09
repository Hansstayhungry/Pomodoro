import React from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import '../styles/Header.scss';

const Header = (props) => {
  const { handleAmbientToggle } = props;

  const [value, setValue] = React.useState(30);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
    <section>
      {props.player}
      <h1>Doro - Your Personal Productivity Booster</h1>
      <div className="auth-links">
          <a href="/login">Login</a>
          <a href="/signup">Sign Up</a>
        </div>
    </section>
    <div onClick={(handleAmbientToggle)}> Ambient Sound</div>
    </div>
  )
}

export default Header;