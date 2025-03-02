import React from 'react';
import { Box } from '@mui/system';
import { useDrop } from 'react-dnd';

export const BetweenSlidesDropZone = ({ index, moveSlide }) => {
  const [, drop] = useDrop({
    accept: 'slide',
    drop: (item) => {
      if (item.index !== index) {
        moveSlide(item.index, Number(index + 1));
      }
    },
  });

  return (
    <Box
      ref={drop}
      sx={{
        flex: '1',
        margin: '0px',
        height: '85px',
        minWidth: '20px',
      }}
    >
    </Box>
  );
}
