import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { LogoutButton } from '../components/logoutButton.jsx';
import { DashboardButton } from '../components/dashboardButton.jsx';
import { DeletePresentationButton } from '../components/deletePresentationButton.jsx';
import { DeletePresentationModal } from '../components/deletePresentationModal.jsx';
import { SlideCard } from '../components/slideCard.jsx';
import { EditTitleButton } from '../components/editTitleButton.jsx';
import { EditTitleModal } from '../components/editTitleModal.jsx';
import { EditThumbnailButton } from '../components/editThumbnailButton.jsx';
import { EditThumbnailModal } from '../components/editThumbnailModal.jsx';
import { NewSlideButton } from '../components/newSlideButton.jsx';
import { SlideLeftButton } from '../components/slideLeftButton.jsx';
import { SlideRightButton } from '../components/slideRightButton.jsx';
import { ViewPreviewButton } from '../components/viewPreviewButton.jsx';
import { ToolsMenu } from '../components/toolsMenu.jsx';
import { v4 as uuidv4 } from 'uuid';

export function Presentation ({ token, setTokenFunction }) {
  const { presentationId } = useParams();
  const navigate = useNavigate();
  const [presentation, setPresentation] = React.useState(null);
  const [slide, setSlide] = React.useState(null);
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [isModalDeletePresVisible, setIsModalDeletePresVisible] = React.useState(false);
  const [isModalEditTitleVisible, setIsModalEditTitleVisible] = React.useState(false);
  const [isModalEditThumbnailVisible, setIsModalEditThumbnailVisible] = React.useState(false);

  localStorage.setItem('currentPresentationId', presentationId);

  React.useEffect(() => {
    const fetchPresentation = async () => {
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const fetchedPresentation = response.data.store.presentations[presentationId];
        setPresentation(fetchedPresentation);
        setSlide(fetchedPresentation.slides[slideIndex]);
      } catch (err) {
        alert(err);
      }
    };
    if (presentationId) {
      fetchPresentation();
    }
  }, [presentationId]);

  React.useEffect(() => {
    if (presentation?.slides?.length > slideIndex) {
      setSlide(presentation.slides[slideIndex]);
      console.log('Updated slide index to:', slideIndex);
    }
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        doSlideLeft();
      } else if (event.key === 'ArrowRight') {
        doSlideRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [slideIndex, presentation]);

  const toggleModalDeletePres = () => {
    setIsModalDeletePresVisible(!isModalDeletePresVisible);
  };

  const deletePresentation = async (presentationId) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      delete currentPresentations[presentationId];

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      navigate('/dashboard');
    } catch (err) {
      alert(err);
    }
  };

  const toggleModalEditTitle = () => {
    setIsModalEditTitleVisible(!isModalEditTitleVisible);
  };

  const editPresentationTitle = async (presentationId, presentationTitle) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].title = presentationTitle;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        title: presentationTitle
      }));
    } catch (err) {
      alert(err);
    }
  };

  const toggleModalEditThumbnail = () => {
    setIsModalEditThumbnailVisible(!isModalEditThumbnailVisible);
  };

  const editPresentationThumbnail = async (presentationId, presentationThumbnail) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].thumbnail = presentationThumbnail;

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        Thumbnail: presentationThumbnail
      }));
    } catch (err) {
      alert(err);
    }
  };

  const createNewSlide = async (presentationId) => {
    const newSlide = {
      id: uuidv4(),
      elements: []
    }
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      currentPresentations[presentationId].slides.push(newSlide);

      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setPresentation(prev => ({
        ...prev,
        slides: currentPresentations[presentationId].slides
      }));
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const doSlideLeft = async () => {
    if (slideIndex > 0) {
      const currentSlideIndex = slideIndex;
      setSlideIndex(slideIndex - 1);
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const currentStore = response.data.store;
        const currentPresentations = currentStore.presentations;
        console.log(currentPresentations[presentationId].slides[currentSlideIndex - 1]);
        setSlide(currentPresentations[presentationId].slides[currentSlideIndex - 1]);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }

  const doSlideRight = async () => {
    if (slideIndex < presentation.slides.length - 1) {
      const currentSlideIndex = slideIndex;
      setSlideIndex(slideIndex + 1);
      try {
        const response = await axios.get('http://localhost:5005/store', {
          headers: {
            Authorization: token,
          }
        });
        const currentStore = response.data.store;
        const currentPresentations = currentStore.presentations;
        console.log(currentPresentations[presentationId].slides[currentSlideIndex + 1]);
        setSlide(currentPresentations[presentationId].slides[currentSlideIndex + 1]);
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  }

  const deleteElement = async (elementIndex, slide) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slide.id);
      currentSlide.elements = currentSlide.elements.filter((_, index) => index !== elementIndex);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const updateElementContent = async (elementIndex, slide, updatedContent) => {
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });
      const currentStore = response.data.store;
      const currentPresentations = currentStore.presentations;
      const currentSlide = currentPresentations[presentationId].slides.find(s => s.id === slide.id);
      const currentElement = currentSlide.elements[elementIndex];
      currentElement.elementContent = updatedContent;
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
      setSlide(currentSlide);
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  const updateTextFont = async () => {

  }

  const openPreview = () => {
    const previewUrl = window.location.origin + '/presentations' + `/${presentationId}` + '/preview';
    window.open(previewUrl, '_blank');
  }

  if (!presentation) {
    return <div>Loading Presentation...</div>;
  }

  return (
    <>
      <h1>{presentation.title}</h1>
      <LogoutButton token={token} setToken={setTokenFunction}/>
      <DashboardButton/>
      <DeletePresentationButton onClick={toggleModalDeletePres}/>
      <EditTitleButton onClick={toggleModalEditTitle}/>
      <EditThumbnailButton onClick={toggleModalEditThumbnail}/>
      <NewSlideButton onClick={createNewSlide} presentationId={presentationId}/>
      <ViewPreviewButton onClick={openPreview}/>
      <ToolsMenu slide={slide} setSlide={setSlide}/>
      <SlideCard slide={slide} deleteElement={deleteElement} updateElementContent={updateElementContent} updateTextFont={updateTextFont}/>
      {isModalDeletePresVisible && <DeletePresentationModal onSubmit={deletePresentation} onClose={toggleModalDeletePres} presentationId={presentationId} />}
      {isModalEditTitleVisible && <EditTitleModal onSubmit={editPresentationTitle} onClose={toggleModalEditTitle} presentationId={presentationId} />}
      {isModalEditThumbnailVisible && <EditThumbnailModal onSubmit={editPresentationThumbnail} onClose={toggleModalEditThumbnail} presentationId={presentationId} />}
      {slideIndex > 0 && <SlideLeftButton onClick={doSlideLeft}/>}
      {slideIndex < presentation.slides.length - 1 && <SlideRightButton onClick={doSlideRight}/>}
    </>
  )
}
