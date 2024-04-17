import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import hljs from 'highlight.js';
import { Box } from '@mui/material';
import { slideCardPreviewStyle, slideIndexStyle, elementsContainer, aceEditorStyle } from '../styles/style.jsx';

export function SlideCardPreview ({ slide, slideIndex }) {
  if (!slide) {
    return <div>Loading slides...</div>;
  }
  console.log(slide, slideIndex);

  return (
    <Card sx={slideCardPreviewStyle}>
      <CardContent style={elementsContainer}>
        {slide.elements.map((slideElement, index) => {
          if (slideElement.elementType === 'text') {
            return (
              <textarea
                key={index}
                value={slideElement.elementContent}
                readOnly
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
                  zIndex: index,
                  backgroundColor: 'transparent',
                  border: 'none',
                  userSelect: 'none',
                  pointerEvents: 'none'
                }}
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
              >
                <AceEditor
                  mode={codeLanguage}
                  theme="monokai"
                  name={index.toString()}
                  value={slideElement.elementContent}
                  readOnly={true}
                  fontSize={slideElement.fontSize}
                  showPrintMargin={false}
                  setOptions={{
                    showLineNumbers: true,
                    tabSize: 2,
                    readOnly: true,
                  }}
                  style={aceEditorStyle}
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
  )
}
