import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import hljs from 'highlight.js';
import { Box } from '@mui/material';
import { slideCardStyle, slideIndexStyle, elementsContainer } from '../styles/style.jsx';

export function SlideCard ({ slide, slideIndex, deleteElement, updateElementContent }) {
  if (!slide) {
    return <div>Loading slides...</div>;
  }

  // This deletes the element if we right click
  const handleRightClick = (e, index, slide) => {
    e.preventDefault();
    deleteElement(index, slide);
  };

  // This is for editing the element as a textbox
  const handleChange = (newValue, index, slide) => {
    updateElementContent(index, slide, newValue);
  };

  return (
    <Card sx={slideCardStyle}>
      <CardContent style={elementsContainer}>
        {slide.elements.map((slideElement, index) => {
          if (slideElement.elementType === 'text') {
            return (
              <textarea
                key={index}
                value={slideElement.elementContent}
                onChange={(e) => handleChange(e.target.value, index, slide)}
                style={{
                  position: 'absolute',
                  top: `${slideElement.textPosition.y}%`,
                  left: `${slideElement.textPosition.x}%`,
                  height: `${slideElement.textSize.height}%`,
                  width: `${slideElement.textSize.width}%`,
                  fontSize: `${slideElement.fontSize}em`,
                  fontFamily: slideElement.fontFamily,
                  color: `#${slideElement.textColor}`,
                  overflow: 'hidden',
                  resize: 'none',
                  textAlign: 'left',
                  border: '1px solid lightgrey',
                  zIndex: index,
                  backgroundColor: 'transparent'
                }}
                onContextMenu={(event) => handleRightClick(event, index, slide)}
              />
            );
          } else if (slideElement.elementType === 'code') {
            const codeLanguage = hljs.highlightAuto(slideElement.elementContent, ['c', 'javascript', 'python']).language || 'javascript';
            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: `${slideElement.codePosition.y}%`,
                  left: `${slideElement.codePosition.x}%`,
                  height: `${slideElement.codeSize.height}%`,
                  width: `${slideElement.codeSize.width}%`,
                  zIndex: index
                }}
                onContextMenu={(event) => handleRightClick(event, index, slide)}
              >
                <AceEditor
                  mode={codeLanguage}
                  theme="monokai"
                  name={index.toString()}
                  value={slideElement.elementContent}
                  onChange={(newValue) => handleChange(newValue, index, slide)}
                  fontSize={slideElement.fontSize}
                  showPrintMargin={false}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                  }}
                  style={{ width: '100%', height: '100%' }}
                />
              </div>
            );
          }
          return null;
        })}
        <Box sx={slideIndexStyle}>
          {slideIndex + 1}
        </Box>
      </CardContent>
    </Card>
  );
}
