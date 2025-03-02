import React from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/webpack-resolver';
import hljs from 'highlight.js';
import Draggable from 'react-draggable';
import { Box } from '@mui/material';
import { slideCardStyle, slideIndexStyle, elementsContainer } from '../styles/style.jsx';
import { EditCodeModal } from '../components/editCodeModal.jsx';
import { EditImageModal } from './editImageModal.jsx';
import { EditVideoModal } from './editVideoModal.jsx'
import { EditTextModal } from '../components/editTextModal.jsx';
import { ErrorModal } from '../components/errorModal.jsx';
import { CornerBox } from './cornerBox.jsx';
import 'react-resizable/css/styles.css';

export function SlideCard ({ slide, setSlide, slideIndex, deleteElement, updateElementContent, defaultBackgroundColor }) {
  const [backgroundColor, setBackgroundColor] = React.useState('ffffff');
  const [draggable, setDraggable] = React.useState([]);
  const cardContentRef = React.useRef(null);
  const [cardContentSize, setCardContentSize] = React.useState({ width: 0, height: 0 });
  const [dragEnabled, setDragEnabled] = React.useState(true);
  const [isModalEditTextVisible, setIsModalEditTextVisible] = React.useState(false);
  const [isModalEditImageVisible, setIsModalEditImageVisible] = React.useState(false);
  const [isModalEditVideoVisible, setIsModalEditVideoVisible] = React.useState(false);
  const [isModalEditCodeVisible, setIsModalEditCodeVisible] = React.useState(false);
  const [elementIndex, setElementIndex] = React.useState(null);
  const [activeOverlay, setActiveOverlay] = React.useState(null);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [initialPosition, setInitialPosition] = React.useState({ x: 0, y: 0 });

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

  const updatePositionBackend = async (moveXPercentage, moveYPercentage, index) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentation = currentStore.presentations[presentationId];
      const currentSlide = currentPresentation.slides.find(s => s.id === slide.id);
      const newXPosition = currentSlide.elements[index].position.x + moveXPercentage;
      const newYPosition = currentSlide.elements[index].position.y + moveYPercentage;
      const clampedNewXPos = Math.max(0, Math.min(100, newXPosition));
      const clampedNewYPos = Math.max(0, Math.min(100, newYPosition));
      currentSlide.elements[index].position.x = clampedNewXPos;
      currentSlide.elements[index].position.y = clampedNewYPos;

      console.log(currentSlide);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  };

  const handleDragStart = (e, data) => {
    setInitialPosition({ x: data.x, y: data.y });
  };

  const handleDragStop = (e, data, index) => {
    const moveX = data.x - initialPosition.x;
    const moveY = data.y - initialPosition.y;
    const moveXPercentage = (moveX / cardContentSize.width) * 100;
    const moveYPercentage = (moveY / cardContentSize.height) * 100;
    updatePositionBackend(moveXPercentage, moveYPercentage, index);
  };

  const toggleDraggable = (index) => {
    if (!dragEnabled) return;

    setDraggable((prevDraggable) =>
      prevDraggable.map((isDraggable, i) => (i === index ? !isDraggable : isDraggable))
    );
  };

  const handleMouseEnter = (index) => {
    setActiveOverlay(index);
  };

  const handleMouseLeave = () => {
    setActiveOverlay(null);
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

  const handleDoubleClickImage = (index) => {
    setElementIndex(index);
    toggleEditImageModal();
    setDragEnabled(false);
    setDraggable(Array(slide.elements.length).fill(false));
    setTimeout(() => {
      setDragEnabled(true);
    }, 500);
  };

  const handleDoubleClickVideo = (index) => {
    setElementIndex(index);
    toggleEditVideoModal();
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
      setDraggable(Array(slide.elements.length).fill(false));
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

  const toggleEditImageModal = () => {
    setIsModalEditImageVisible(!isModalEditImageVisible);
  }

  const toggleEditVideoModal = () => {
    setIsModalEditVideoVisible(!isModalEditVideoVisible);
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
      currentElement.size = newElementInfo.size;
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

  const updateImageElement = async (newElementInfo, index) => {
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
      currentElement.size = newElementInfo.size;
      currentElement.image = newElementInfo.image;
      currentElement.imageDescription = newElementInfo.imageDescription;
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

  const updateVideoElement = async (newElementInfo, index) => {
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
      currentElement.size = newElementInfo.size;
      currentElement.videoUrl = newElementInfo.videoUrl;
      currentElement.videoAutoplay = newElementInfo.videoAutoplay;
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
      currentElement.size = newElementInfo.size;
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

  return (
    <>
      <Card sx={{ ...slideCardStyle, backgroundColor }}>
        <CardContent ref={cardContentRef} style={elementsContainer}>
          {slide.elements.map((slideElement, index) => {
            let elementContent;
            if (slideElement.elementType === 'text') {
              elementContent = (
                <div
                  style={{
                    position: 'absolute',
                    top: `${(cardContentSize.height * slideElement.position.y / 100)}px`,
                    left: `${(cardContentSize.width * slideElement.position.x / 100)}px`,
                    height: `${(cardContentSize.height * slideElement.size.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.size.width) / 100}px`,
                    zIndex: index,
                  }}
                  onClick={() => toggleDraggable(index)}
                  onDoubleClick={() => handleDoubleClickText(index)}
                  onContextMenu={(event) => handleRightClick(event, index, slide)}
                >
                  <textarea
                    value={slideElement.elementContent}
                    onChange={(e) => handleChange(e.target.value, index, slide)}
                    style={{
                      position: 'relative',
                      height: '100%',
                      width: '100%',
                      fontSize: `${slideElement.fontSize}em`,
                      fontFamily: slideElement.fontFamily,
                      color: `#${slideElement.textColor}`,
                      overflow: 'hidden',
                      resize: 'none',
                      textAlign: 'left',
                      border: '1px solid lightgrey',
                      backgroundColor: 'transparent'
                    }}
                  />
                  {draggable[index] && (
                    <>
                      <CornerBox style={{ top: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ top: '-2.5px', right: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', right: '-2.5px' }} />
                    </>
                  )}
                </div>
              );
            } else if (slideElement.elementType === 'code') {
              const codeLanguage = hljs.highlightAuto(slideElement.elementContent, ['c', 'javascript', 'python']).language || 'javascript';
              elementContent = (
                <div
                  key={index}
                  onDoubleClick={() => handleDoubleClickCode(index)}
                  onClick={() => toggleDraggable(index)}
                  style={{
                    position: 'absolute',
                    top: `${(cardContentSize.height * slideElement.position.y / 100)}px`,
                    left: `${(cardContentSize.width * slideElement.position.x / 100)}px`,
                    height: `${(cardContentSize.height * slideElement.size.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.size.width) / 100}px`,
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
                  {draggable[index] && (
                    <>
                      <CornerBox style={{ top: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ top: '-2.5px', right: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', right: '-2.5px' }} />
                    </>
                  )}
                </div>
              );
            } else if (slideElement.elementType === 'image') {
              elementContent = (
                <div
                  style={{
                    position: 'absolute',
                    top: `${(cardContentSize.height * slideElement.position.y / 100)}px`,
                    left: `${(cardContentSize.width * slideElement.position.x / 100)}px`,
                    height: `${(cardContentSize.height * slideElement.size.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.size.width) / 100}px`,
                    zIndex: index,
                  }}
                  onDoubleClick={() => handleDoubleClickImage(index)}
                  onClick={() => toggleDraggable(index)}
                  onContextMenu={(event) => handleRightClick(event, index, slide)}
                >
                  <img
                    draggable="false"
                    src={slideElement.image}
                    alt={slideElement.imageDescription}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                  {draggable[index] && (
                    <>
                      <CornerBox style={{ top: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ top: '-2.5px', right: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', right: '-2.5px' }} />
                    </>
                  )}
                </div>
              );
            } else if (slideElement.elementType === 'video') {
              let iframeSrc = slideElement.videoUrl;
              if (slideElement.videoAutoplay) {
                const queryParams = 'autoplay=1&mute=1';
                iframeSrc += (slideElement.videoUrl.includes('?') ? '&' : '?') + queryParams;
              }
              elementContent = (
                <div
                  style={{
                    position: 'absolute',
                    top: `${(cardContentSize.height * slideElement.position.y / 100)}px`,
                    left: `${(cardContentSize.width * slideElement.position.x / 100)}px`,
                    height: `${(cardContentSize.height * slideElement.size.height) / 100}px`,
                    width: `${(cardContentSize.width * slideElement.size.width) / 100}px`,
                    zIndex: index,
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <iframe
                    src={iframeSrc}
                    height={`${(cardContentSize.height * slideElement.size.height) / 100}px`}
                    width={`${(cardContentSize.width * slideElement.size.width) / 100}px`}
                    onContextMenu={(event) => handleRightClick(event, index, slide)}
                  />
                  {draggable[index] && (
                    <>
                      <CornerBox style={{ top: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ top: '-2.5px', right: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', left: '-2.5px' }} />
                      <CornerBox style={{ bottom: '-2.5px', right: '-2.5px' }} />
                    </>
                  )}
                  {activeOverlay === index && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '20%',
                        width: '100%',
                        height: '20%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onDoubleClick={() => handleDoubleClickVideo(index)}
                      onClick={() => toggleDraggable(index)}
                      onContextMenu={(event) => handleRightClick(event, index, slide)}
                    >
                      Click here to interact with the video!
                    </div>
                  )}
                </div>
              );
            }
            let bounds = { left: 0, top: 0, right: 0, bottom: 0 };
            if (cardContentRef.current && cardContentSize && slideElement) {
              bounds = {
                left: -cardContentSize.width * (slideElement.position.x / 100),
                top: -cardContentSize.height * (slideElement.position.y / 100),
                right: cardContentRef.current.offsetWidth - (cardContentSize.width * ((slideElement.size.width / 100) + (slideElement.position.x / 100))),
                bottom: cardContentRef.current.offsetHeight - (cardContentSize.height * ((slideElement.size.height / 100) + (slideElement.position.y / 100)))
              };
            }
            return (
              <Draggable
                key={index}
                disabled={!draggable[index]}
                bounds={bounds}
                onStart={handleDragStart}
                onStop={(e, data) => handleDragStop(e, data, index)}
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
      {isModalEditImageVisible && <EditImageModal onSubmit={updateImageElement} onClose={toggleEditImageModal} index={elementIndex}/>}
      {isModalEditVideoVisible && <EditVideoModal onSubmit={updateVideoElement} onClose={toggleEditVideoModal} index={elementIndex}/>}
      {isModalEditCodeVisible && <EditCodeModal onSubmit={updateCodeElement} onClose={toggleEditCodeModal} index={elementIndex}/>}
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </>
  );
}
