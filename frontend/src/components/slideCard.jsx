import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import hljs from 'highlight.js';
import { Box } from '@mui/material';
import Draggable from 'react-draggable';
import { slideCardStyle, slideIndexStyle, elementsContainer } from '../styles/style.jsx';
import { EditCodeModal } from '../components/editCodeModal.jsx';
import { EditTextModal } from '../components/editTextModal.jsx';
import { ErrorModal } from '../components/errorModal.jsx';

export function SlideCard ({ slide, setSlide, slideIndex, deleteElement, updateElementContent, defaultBackgroundColor }) {
  const [backgroundColor, setBackgroundColor] = React.useState('ffffff');
  const [draggable, setDraggable] = React.useState([]);
  const cardContentRef = React.useRef(null);
  const [cardContentSize, setCardContentSize] = React.useState({ width: 0, height: 0 });
  const [dragEnabled, setDragEnabled] = React.useState(true);
  const [isModalEditTextVisible, setIsModalEditTextVisible] = React.useState(false);
  const [isModalEditCodeVisible, setIsModalEditCodeVisible] = React.useState(false);
  const [elementIndex, setElementIndex] = React.useState(null);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');

  const token = localStorage.getItem('token');
  const presentationId = localStorage.getItem('currentPresentationId');

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  // This deletes the element if we right click
  const handleRightClick = (e, index, slide) => {
    e.preventDefault();
    deleteElement(index, slide);
  };

  // This is for editing the element as a textbox
  const handleChange = (newValue, index, slide) => {
    updateElementContent(index, slide, newValue);
  };

  const toggleDraggable = (index) => {
    if (!dragEnabled) return;

    setDraggable((prevDraggable) =>
      prevDraggable.map((isDraggable, i) => (i === index ? !isDraggable : isDraggable))
    );
  };

  const handleDoubleClickText = (index) => {
    setElementIndex(index);
    toggleEditTextModal();
    setDragEnabled(false);
    setDraggable(Array(slide.elements.length).fill(false));
    setTimeout(() => {
      setDragEnabled(true);
    }, 500);
  };

  const handleDoubleClickCode = (index) => {
    setElementIndex(index);
    toggleEditCodeModal();
    setDragEnabled(false);
    setDraggable(Array(slide.elements.length).fill(false));
    setTimeout(() => {
      setDragEnabled(true);
    }, 500);
  };

  React.useEffect(() => {
    if (slide && slide.currentBgColor !== null) {
      setBackgroundColor(slide.currentBgColor);
    } else if (defaultBackgroundColor !== null) {
      setBackgroundColor(defaultBackgroundColor);
    }
    if (slide) {
      setDraggable(Array(slide.elements.length).fill(true));
    }
  }, [slide, defaultBackgroundColor]);

  React.useEffect(() => {
    const handleResize = () => {
      if (cardContentRef.current) {
        const width = cardContentRef.current.offsetWidth;
        const height = cardContentRef.current.offsetHeight;
        setCardContentSize({ width, height });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cardContentRef.current]);

  if (!slide || !cardContentRef) {
    return <div>Loading slides...</div>;
  }

  const toggleEditTextModal = () => {
    setIsModalEditTextVisible(!isModalEditTextVisible);
  }

  const toggleEditCodeModal = () => {
    setIsModalEditCodeVisible(!isModalEditCodeVisible);
  }

  const updateTextElement = async (newElementInfo, index) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slide.id);
      const currentElement = currentSlide.elements[index];
      currentElement.elementContent = newElementInfo.elementContent;
      currentElement.fontFamily = newElementInfo.fontFamily;
      currentElement.fontSize = newElementInfo.fontSize;
      currentElement.textColor = newElementInfo.textColor;
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  const updateCodeElement = async (newElementInfo, index) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slide.id);
      const currentElement = currentSlide.elements[index];
      currentElement.elementContent = newElementInfo.elementContent;
      currentElement.fontSize = newElementInfo.fontSize;
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }

  console.log(cardContentSize.width, cardContentSize.height);
  return (
    <>
      <Card sx={{ ...slideCardStyle, backgroundColor }}>
        <CardContent ref={cardContentRef} style={elementsContainer}>
          {slide.elements.map((slideElement, index) => {
            let elementContent;
            if (slideElement.elementType === 'text') {
              elementContent = (
                <textarea
                  key={index}
                  value={slideElement.elementContent}
                  onChange={(e) => handleChange(e.target.value, index, slide)}
                  onDoubleClick={() => handleDoubleClickText(index)}
                  style={{
                    position: 'absolute',
                    top: `${slideElement.textPosition.y}%`,
                    left: `${slideElement.textPosition.x}%`,
                    height: `${(cardContentSize.height * slideElement.textSize.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.textSize.width) / 100}px`,
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
              elementContent = (
                <div
                  key={index}
                  onDoubleClick={() => handleDoubleClickCode(index)}
                  style={{
                    position: 'absolute',
                    top: `${slideElement.codePosition.y}%`,
                    left: `${slideElement.codePosition.x}%`,
                    height: `${(cardContentSize.height * slideElement.codeSize.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.codeSize.width) / 100}px`,
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
            return (
              <Draggable
                key={index}
                disabled={!draggable[index]}
                bounds="parent"
              >
                <div
                  onDoubleClick={() => toggleDraggable(index)}
                  onContextMenu={(event) => handleRightClick(event, index)}
                  style={{ position: 'absolute', ...slideElement.positionStyle }} // Assuming positionStyle contains top, left, width, and height
                >
                  {elementContent}
                </div>
              </Draggable>
            )
          })}
          <Box sx={slideIndexStyle}>
            {Number(slideIndex) + 1}
          </Box>
        </CardContent>
      </Card>
      {isModalEditTextVisible && <EditTextModal onSubmit={updateTextElement} onClose={toggleEditTextModal} index={elementIndex}/>}
      {isModalEditCodeVisible && <EditCodeModal onSubmit={updateCodeElement} onClose={toggleEditCodeModal} index={elementIndex}/>}
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
