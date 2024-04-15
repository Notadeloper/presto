import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { slideCardStyle } from '../styles/style.jsx';

export function SlideCard ({ slide }) {
  if (!slide) {
    return <div>Loading slides...</div>;
  }
  console.log(slide);
  return (
    <Card sx={slideCardStyle}>
      <CardContent style={{ width: '100%', height: '100%', padding: '0px' }}>
        {slide.elements.filter(element => element.elementType === 'text').map((textElement, index) => (
          <div key={index} style={{
            height: `${textElement.textSize.height}%`,
            width: `${textElement.textSize.width}%`,
            fontSize: `${textElement.fontSize}em`,
            color: `#${textElement.textColor}`,
            overflow: 'hidden',
            textAlign: 'left',
            border: '1px solid lightgrey',
          }}>
            {textElement.textContent}
          </div>
        ))}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {slide.id} <br/>
        </Typography>
      </CardContent>
    </Card>
  );
}
