// This file is for MUI Styles

export const thisIsADivWrapperStyle = {
  backgroundColor: 'red'
};

export const flexContainerStyle = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'flex-between',
  alignItems: 'center',
  rowGap: '10px',
};

export const presentationCardStyle = {
  flex: '0 1 450px',
  minWidth: '100px',
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
  height: 'calc(100vh / 2)',
  margin: 'auto',
  padding: '0px'
};

export const slideCardPreviewStyle = {
  width: 'calc(100vw - 48px)',
  height: 'calc(100vh - 36.5px)',
  margin: '0px',
  padding: '0px'
};

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
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
