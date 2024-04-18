import React from 'react';
import Box from '@mui/material/Box';
import { flexContainerStyle } from '../styles/style';
import { DraggableSlide } from './draggableSlide';
import { BetweenSlidesDropZone } from './betweenSlidesDropZone';

export function SlideListRearrange ({ presentation }) {
  if (!presentation) {
    return <div>Loading presentations...</div>;
  }

  const [slides, setSlides] = React.useState(presentation.slides);

  const moveSlide = (dragIndex, hoverIndex) => {
    setSlides((prevSlides) => {
      const newSlides = [...prevSlides];
      const [draggedSlide] = newSlides.splice(dragIndex, 1);
      const newIndex = dragIndex > hoverIndex ? hoverIndex : hoverIndex - 1;
      newSlides.splice(newIndex, 0, draggedSlide);
      return newSlides;
    });
  }

  return (
    <Box sx={flexContainerStyle}>
      {slides.map((slide, index) => (
        <div key={slide.id} style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
          <DraggableSlide slide={slide} index={index} moveSlide={moveSlide} />
          <BetweenSlidesDropZone index={index} moveSlide={moveSlide} />
        </div>
      ))}
    </Box>
  );
}
