import React from 'react';
import hljs from 'highlight.js';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { slideCardStyle, elementsContainer } from '../styles/style.jsx';

export function SlideCard ({ slide, deleteElement }) {
  if (!slide) {
    return <div>Loading slides...</div>;
  }

  const handleRightClick = (e, index, slide) => {
    e.preventDefault();
    deleteElement(index, slide);
  };

  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current) {
      ref.current.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
      });
    }
  }, [slide]);

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
          } else if (slideElement.elementType === 'code') {
            return (
              <div key={index} style={{
                position: 'absolute',
                top: `${slideElement.codePosition.y}%`,
                left: `${slideElement.codePosition.x}%`,
                height: `${slideElement.codeSize.height}%`,
                width: `${slideElement.codeSize.width}%`,
                fontSize: `${slideElement.fontSize}em`,
                overflow: 'hidden',
                textAlign: 'left',
                zIndex: index
              }}
              onContextMenu={(event) => handleRightClick(event, index, slide)}
              >
                <code>
                  {slideElement.codeContent}
                </code>
              </div>
            );
          }
          return null;
        })}
      </CardContent>
    </Card>
  );
}
