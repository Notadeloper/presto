import React from 'react';
import { render, screen } from '@testing-library/react';
import { SlideListRearrange } from '../components/SlideListRearrange';

jest.mock('../components/draggableSlide', () => ({ DraggableSlide: ({ slide, index }) => <div>DraggableSlide - {slide.id} - Index: {index}</div> }));
jest.mock('../components/betweenSlidesDropZone', () => ({ BetweenSlidesDropZone: ({ index }) => <div>DropZone - Index: {index}</div> }));

describe('SlideListRearrange', () => {
  it('renders correctly with slides', () => {
    const presentation = {
      slides: [
        { id: 'slide1', title: 'Slide 1' },
        { id: 'slide2', title: 'Slide 2' }
      ]
    };

    render(<SlideListRearrange presentation={presentation} />);

    expect(screen.queryByText(/loading presentations/i)).toBeNull();

    presentation.slides.forEach((slide, index) => {
      expect(screen.getByText(`DraggableSlide - ${slide.id} - Index: ${index}`)).toBeInTheDocument();
      expect(screen.getByText(`DropZone - Index: ${index}`)).toBeInTheDocument();
    });
  });

  it('displays loading message in case no presentation is passed', () => {
    render(<SlideListRearrange presentation={null} />);
    expect(screen.getByText(/loading presentations/i)).toBeInTheDocument();
  });
});