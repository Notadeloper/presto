import React from 'react';
import { render } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DraggableSlide } from './DraggableSlide'; // Adjust the path based on your file structure

// Mock Slide Data
const slide = {
  id: 'slide-1',
  content: 'Test Slide Content'
};

describe('DraggableSlide', () => {
  it('renders slide content and checks for drag functionality', () => {
    // Wrap the component in DndProvider when testing
    const { getByText } = render(
      <DndProvider backend={HTML5Backend}>
        <DraggableSlide slide={slide} index={0} />
      </DndProvider>
    );

    expect(getByText(/slide-1/i)).toBeInTheDocument();
    expect(getByText(/slide 1/i)).toBeInTheDocument();
    // More assertions can be added to check for specific behaviors like dragging
  });
});