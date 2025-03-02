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
    navigate(`/presentations/${presentationId}/0`);
  };

  if (!presentations) {
    return <div>Loading presentations...</div>;
  }

  return (
    <Box sx={flexContainerStyle}>
      {presentations.map((presentation) => (
        <Card key={presentation.id} sx={presentationCardStyle}>
          <CardActionArea sx={{ height: '100%' }} onClick={() => handlePresentationClick(presentation.id)}>
            <CardContent sx={{ flexGrow: 1 }}>
            {presentation.thumbnail
              ? (
                <img
                  src={presentation.thumbnail}
                  alt={presentation.title}
                  style={{
                    width: 'auto',
                    height: '80px',
                    marginBottom: '10px',
                    display: 'block'
                  }}
                />
                )
              : (
                <div
                  style={{
                    width: 'auto',
                    height: '80px',
                    marginBottom: '10px',
                    backgroundColor: '#D3D3D3',
                    display: 'block'
                  }}
                />
                )}
              <Typography variant="h5" component="div" sx={{ wordWrap: 'break-word' }}>
                {presentation.title}
              </Typography>
              <Typography variant="body2">
                Description: {presentation.description}
              </Typography>
              <Typography variant="body2">
                Number of slides: {presentation.slides.length}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
}
