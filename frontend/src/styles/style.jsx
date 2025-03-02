// This file is for MUI Styles
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#fcd5ce', // pink orange
    },
    secondary: {
      main: '#ffcad4', // darker pink
    },
    tertiary: {
      main: '#fadde1', // lighter pink
    },
    quaternary: {
      main: '#eadbdd', // grey purple
    },
    error: {
      main: '#f69697', // soft red
    },
    background: {
      default: '#f6eee9', // light beige
    },
  },
});

export default theme;

export const appBarStyle = {
  backgroundColor: theme.palette.tertiary.main,
  position: 'static',
  height: '70px',
};

export const toolBarStyle = {
  height: '70px',
};

export const toolBoxStyle = {
  padding: '0 0 10px 20px',
}

export const buttonBoxStyle = {
  borderColor: 'divider',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '20px 0',
  boxShadow: theme.shadows[2],
  padding: '0px',
}

export const divWrapperStyle = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.quaternary.main,
  borderRadius: '10px',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[3],
  maxWidth: 400,
  mx: 'auto',
  my: theme.spacing(5),
};

export const listItemButtonStyle = {
  '&:hover': {
    bgcolor: 'action.hover',
    '.MuiListItemIcon-root': {
      color: '#957dad',
    }
  },
  transition: 'background-color 0.3s',
};

export const flexContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  rowGap: '10px',
  padding: '50px',
  backgroundColor: '#f5f5f5',
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  margin: '20px 20px 20px 20px',
};

export const presentationCardStyle = {
  flex: '1',
  minWidth: '300px',
  margin: '8px',
  borderRadius: '10px',
  aspectRatio: '2 / 1',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer'
};

export const slideRearrangeCardStyle = {
  flex: 'none',
  width: '170px',
  height: '85px',
  borderRadius: '0px',
  display: 'flex',
  flexDirection: 'column',
  cursor: 'pointer'
};

export const slideCardStyle = {
  width: 'calc(100vw - 50px)',
  height: 'calc((100vw - 50px) / 2)',
  margin: 'auto',
  padding: '0px'
};

export const slideCardPreviewStyle = {
  width: 'calc(100vw - 48px)',
  height: 'calc((100vw - 48px) / 2)',
  margin: '0px',
  padding: '0px'
};

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: '80%',
  maxWidth: '500px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    '-webkit-appearance': 'none',
    width: '5px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'grey',
    borderRadius: '10px',
  },
};

export const errorModalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid red',
  boxShadow: 24,
  p: 4,
};

export const elementsContainer = {
  width: '100%',
  height: '100%',
  padding: '0px',
  position: 'relative'
}

export const slideIndexStyle = {
  position: 'absolute',
  left: 0,
  bottom: 0,
  width: 50,
  height: 50,
  color: 'black',
  opacity: 0.5,
  fontSize: '1em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 100000,
  backgroundColor: 'rgba(255, 255, 255, 0.5)'
}

export const aceEditorStyle = {
  width: '100%',
  height: '100%',
  userSelect: 'none',
  pointerEvents: 'none'
}

export const previewFlexContainer = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  padding: '0px',
}

export const presentationTitleStyle = {
  flexGrow: 1,
  fontWeight: 'bold',
  fontFamily: 'Arial, sans-serif',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}
