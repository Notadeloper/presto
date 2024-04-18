import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { presentationCardStyle, flexContainerStyle } from '../styles/style';

export function PresentationList ({ presentations }) {
  const navigate = useNavigate();

  const handlePresentationClick = (presentationId) => {
    navigate(`/presentations/${presentationId}`);
  };

  return (
    <Box sx={flexContainerStyle}>
      {presentations.map((presentation) => (
        <Card key={presentation.id} sx={presentationCardStyle}>
          <CardActionArea sx={{ height: '100%' }} onClick={() => handlePresentationClick(presentation.id)}>
            <CardContent sx={{ flexGrow: 1 }}>
              <img src={presentation.thumbnail} alt={presentation.title} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
              <Typography variant="h5" component="div" sx={{ wordWrap: 'break-word' }}>
                {presentation.title}
              </Typography>
              <Typography variant="body2">
                {presentation.slides.length}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
