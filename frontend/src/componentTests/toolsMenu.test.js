import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';

import { ToolsMenu } from '../components/ToolsMenu';

jest.mock('axios');

describe('ToolsMenu Component', () => {
  it('opens and closes the toolbox drawer', () => {
    render(
      <BrowserRouter>
        <ToolsMenu slide={{ elements: [] }} setSlide={() => {}} />
      </BrowserRouter>
    );

    // Open the toolbox
    userEvent.click(screen.getByLabelText('open toolbox'));
    expect(screen.getByText('Add Text')).toBeInTheDocument();

    // Close the toolbox
    fireEvent.click(document.body); // Simulate clicking outside to close drawer
    expect(screen.queryByText('Add Text')).not.toBeInTheDocument();
  });

  it('opens modals for each tool type', () => {
    render(
      <BrowserRouter>
        <ToolsMenu slide={{ elements: [] }} setSlide={() => {}} />
      </BrowserRouter>
    );

    // Open the toolbox
    userEvent.click(screen.getByLabelText('open toolbox'));

    // Trigger modal for Text
    userEvent.click(screen.getByText('Add Text'));
    expect(screen.getByText('Enter your text here:')).toBeInTheDocument(); // Text from AddTextModal

    // Trigger modal for Image
    userEvent.click(screen.getByText('Add Image'));
    expect(screen.getByText('Upload your image:')).toBeInTheDocument(); // Text from AddImageModal
  });

  it('handles adding a new element to the slide', async () => {
    const setSlideMock = jest.fn();
    axios.put.mockResolvedValue({}); // Mock successful response

    render(
      <BrowserRouter>
        <ToolsMenu slide={{ elements: [] }} setSlide={setSlideMock} />
      </BrowserRouter>
    );

    // Open toolbox and add new text element
    userEvent.click(screen.getByLabelText('open toolbox'));
    userEvent.click(screen.getByText('Add Text'));
    await userEvent.type(screen.getByRole('textbox'), 'New Text Element');
    userEvent.click(screen.getByText('Submit'));

    expect(setSlideMock).toHaveBeenCalled(); // Verify that setSlide was called
  });

  it('displays an error modal when adding an element fails', async () => {
    axios.put.mockRejectedValue({
      response: { data: { error: 'Error adding element' } }
    });

    render(
      <BrowserRouter>
        <ToolsMenu slide={{ elements: [] }} setSlide={() => {}} />
      </BrowserRouter>
    );

    // Attempt to add an element which triggers an error
    userEvent.click(screen.getByLabelText('open toolbox'));
    userEvent.click(screen.getByText('Add Text'));
    await userEvent.type(screen.getByRole('textbox'), 'New Text Element');
    userEvent.click(screen.getByText('Submit'));

    expect(screen.getByText('Error adding element')).toBeInTheDocument();
  });
});