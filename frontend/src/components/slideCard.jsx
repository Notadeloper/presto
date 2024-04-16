import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { slideCardStyle, elementsContainer } from '../styles/style.jsx';

export function SlideCard ({ slide, deleteElement }) {
  if (!slide) {
    return <div>Loading slides...</div>;
  }

  const handleRightClick = (e, index, slide) => {
    e.preventDefault();
    deleteElement(index, slide);
  };

  console.log(slide);
  return (
    <Card sx={slideCardStyle}>
      <CardContent style={elementsContainer}>
        {slide.elements.map((slideElement, index) => {
          if (slideElement.elementType === 'text') {
            return (
              <div key={index} style={{
                position: 'absolute',
                top: `${slideElement.textPosition.y}%`,
                left: `${slideElement.textPosition.x}%`,
                height: `${slideElement.textSize.height}%`,
                width: `${slideElement.textSize.width}%`,
                fontSize: `${slideElement.fontSize}em`,
                color: `#${slideElement.textColor}`,
                overflow: 'hidden',
                textAlign: 'left',
                border: '1px solid lightgrey',
                zIndex: index
              }}
              onContextMenu={(event) => handleRightClick(event, index, slide)}
              >
                {slideElement.textContent}
              </div>
            );
          }
          return null;
        })}
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {slide.id} <br/>
        </Typography>
      </CardContent>
    </Card>
  );
}
