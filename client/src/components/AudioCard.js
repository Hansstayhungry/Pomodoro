import React from 'react';
import { Card, CardContent, Typography, CardActions, Button } from '@mui/material';

import '../styles/AudioCard.scss'

const AudioCard = (props) => {
  const { name, link, picture, handleAudioClick } = props

  const cardStyle = {
    background: `url(${picture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '300px'
  };

  return (
    <div className='card-item'>
      <Card variant="outlined" style={cardStyle} className="cardRoot">
        <CardContent className="cardContent">
          <Typography variant="h4">
            <span style={{ color: '#F5F5DC' }}>{name}</span>
          </Typography>
        </CardContent>
        <CardActions className="cardActions">
          <Button onClick= {() => handleAudioClick(link)} style={{ backgroundColor: '#F5F5DC' }}>
            <span>Listen</span>
          </Button>
        </CardActions>
      </Card>      
    </div>

  );
};

export default AudioCard;
