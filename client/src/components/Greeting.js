import React from 'react';
import Typography from '@mui/material/Typography';

import '../styles/Greeting.scss';

const Greeting = (props) => {
  const { loggedInUser } = props;
  const first_name = loggedInUser["first_name"];
  let firstName = "";

  if (!first_name) {
    firstName = "Guest"
  } else {
    firstName = first_name
  }

  const now = new Date();
  const currentHour = now.getHours();
  let setWords = "";

  if (currentHour > 5 && currentHour < 12) {
    setWords = "Good Morning!";
  } else if (currentHour >= 12 && currentHour < 18) {
    setWords = "Good Afternoon! ";
  } else {
    setWords = "Good Evening! ";
  }

  return (
    <div className='greeting'>
      <Typography variant="h4" component="h1">
        {setWords} {firstName} 
      </Typography>
    </div>
  );
}

export default Greeting;
