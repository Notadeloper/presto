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
import { AddTextModal } from '../components/addTextModal.jsx';
import { AddCodeModal } from '../components/addCodeModal.jsx';
import { AddVideoModal } from '../components/addVideoModal.jsx';
import { AddImageModal } from '../components/addImageModal.jsx';

export function ToolsMenu ({ slide, setSlide }) {
  const [open, setOpen] = React.useState(false);
  const [modalState, setModalState] = React.useState({
    text: false,
    image: false,
    video: false,
    code: false
  });

  const toggleToolbox = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleModal = (type) => {
    setModalState(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const ToolboxList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleToolbox(false)}>
      <List>
        {[
          { text: 'Add Text', icon: <TextFieldsIcon />, tool: 'Text' },
          { text: 'Add Image', icon: <ImageIcon />, tool: 'Image' },
          { text: 'Add Video', icon: <OndemandVideoIcon />, tool: 'Video' },
          { text: 'Add Code', icon: <CodeIcon />, tool: 'Code' }
        ].map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => toggleModal(item.tool.toLowerCase())}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const addNewText = async (newTextElement) => {
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
      currentSlide.elements.push(newTextElement);
      const updatedSlide = {
        ...slide,
        elements: [...slide.elements, newTextElement]
      };
      setSlide(updatedSlide);
      await axios.put('http://localhost:5005/store', { store: currentStore }, {
        headers: {
          Authorization: token,
        }
      });
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }

  const addNewImage = async () => {

  }

  const addNewVideo = async () => {

  }

  const addNewCode = async () => {

  }

  return (
    <div>
      <Button onClick={toggleToolbox(true)}>Open Toolbox</Button>
      <Drawer open={open} onClose={toggleToolbox(false)}>
        {ToolboxList}
      </Drawer>
      {modalState.text && <AddTextModal onSubmit={addNewText} onClose={() => toggleModal('text')} />}
      {modalState.image && <AddImageModal onSubmit={addNewImage} onClose={() => toggleModal('image')} />}
      {modalState.video && <AddVideoModal onSubmit={addNewVideo} onClose={() => toggleModal('video')} />}
      {modalState.code && <AddCodeModal onSubmit={addNewCode} onClose={() => toggleModal('code')} />}
    </div>
  );
}
