import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

const AudioCard = (props) => {
  const { name, link, picture, handleAudioClick } = props

  const cardStyle = {
    background: `url(${picture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <Card variant="outlined" style={cardStyle} className="cardRoot">
      <CardContent className="cardContent">
        <Typography variant="h6" style={{ color: 'black' }}>
          {name}
        </Typography>
      </CardContent>
      <CardActions className="cardActions">
        <Button onClick= {() => handleAudioClick(link)} color="primary">
          Listen
        </Button>
      </CardActions>
    </Card>
  );
};

export default AudioCard;
