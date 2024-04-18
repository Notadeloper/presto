import React from 'react';
import { Box } from '@mui/system';

export function CornerBox ({ style }) {
  return (
    <Box style={{
      width: '5px',
      height: '5px',
      backgroundColor: 'black',
      position: 'absolute',
      ...style
    }}
    />
  );
}
