// This file is for MUI Styles

export const thisIsADivWrapperStyle = {
  backgroundColor: 'red'
};

export const flexContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  alignItems: 'stretch'
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

export const slideCardStyle = {
  width: 'calc(100vw - 50px)',
  height: 'calc(100vh / 2)',
  margin: 'auto',
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
