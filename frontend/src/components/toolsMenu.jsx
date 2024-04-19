import React from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CodeIcon from '@mui/icons-material/Code';
import useMediaQuery from '@mui/material/useMediaQuery';
import { AddTextModal } from '../components/addTextModal.jsx';
import { AddCodeModal } from '../components/addCodeModal.jsx';
import { AddVideoModal } from '../components/addVideoModal.jsx';
import { AddImageModal } from '../components/addImageModal.jsx';
import { ErrorModal } from '../components/errorModal.jsx';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { listItemButtonStyle } from '../styles/style';

export function ToolsMenu ({ slide, setSlide }) {
  const [open, setOpen] = React.useState(false);
  const [isModalErrorVisible, setIsModalErrorVisible] = React.useState(false);
  const [errorText, setErrorText] = React.useState('');
  const [modalState, setModalState] = React.useState({
    text: false,
    image: false,
    video: false,
    code: false
  });
  const belowWidth = useMediaQuery('(max-width:600px)');

  const toggleModalError = () => {
    setIsModalErrorVisible(!isModalErrorVisible);
  };

  const toggleToolbox = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const ToolboxList = (
    <Box sx={{ width: belowWidth ? 200 : 250 }} role="presentation" onClick={toggleToolbox(false)}>
      <List>
        {[
          { text: 'Add Text Box', icon: <TextFieldsIcon />, tool: 'Text' },
          { text: 'Upload Image', icon: <ImageIcon />, tool: 'Image' },
          { text: 'Upload Video', icon: <OndemandVideoIcon />, tool: 'Video' },
          { text: 'Add Code Box', icon: <CodeIcon />, tool: 'Code' }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton sx={listItemButtonStyle} onClick={() => toggleModal(item.tool.toLowerCase())}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // This adds the new element to the database as well as updates the slide state
  const addNewElement = async (newElement) => {
    const token = localStorage.getItem('token');
    const presentationId = localStorage.getItem('currentPresentationId');
    try {
      const response = await axios.get('http://localhost:5005/store', {
        headers: {
          Authorization: token,
        }
      });

      const currentStore = response.data.store;
      const currentPresentation = currentStore.presentations[presentationId];
      const currentSlide = currentPresentation.slides.find(s => s.id === slide.id);
      currentSlide.elements.push(newElement);
      const updatedSlide = {
        ...slide,
        elements: [...slide.elements, newElement]
      };
      setSlide(updatedSlide);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      setErrorText(err.response.data.error);
      toggleModalError(!isModalErrorVisible);
    }
  }
  return (
    <div>
      <Button onClick={toggleToolbox(true)} aria-label="open toolbox" sx={{ color: 'black' }} endIcon={<KeyboardArrowRightIcon />}>Open Toolbox</Button>
      <Drawer open={open} onClose={toggleToolbox(false)} sx={{ zIndex: 100001 }}>
        {ToolboxList}
      </Drawer>
      {modalState.text && <AddTextModal onSubmit={addNewElement} onClose={() => toggleModal('text')} />}
      {modalState.image && <AddImageModal onSubmit={addNewElement} onClose={() => toggleModal('image')} />}
      {modalState.video && <AddVideoModal onSubmit={addNewElement} onClose={() => toggleModal('video')} />}
      {modalState.code && <AddCodeModal onSubmit={addNewElement} onClose={() => toggleModal('code')} />}
      {isModalErrorVisible && <ErrorModal onClose={toggleModalError} errorText={errorText}/>}
    </div>
  );
}
