import React from 'react';
import { useDrag } from 'react-dnd';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { slideRearrangeCardStyle } from '../styles/style';

export function DraggableSlide ({ slide, index }) {
  const ref = React.useRef(null);

  const [, drag] = useDrag({
    type: 'slide',
    item: { type: 'slide', id: slide.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return (
    <div ref={ref}>
      <Card sx={slideRearrangeCardStyle}>
        <CardContent>
          <Typography variant="body2">
            {slide.id} <br />
            Slide {index + 1}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
