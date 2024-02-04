import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#027ffe',
    },
    secondary: {
      main: '#F50057',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const darkTheme = createTheme({
  
  palette: {
    mode: 'dark',
    primary: {
      main: '#027ffe',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      default: '#121212', // Adjust the default background color
      paper: '#1e1e1e', // Adjust the paper background color (dialogs, cards, etc.)
    },
    text: {
      primary: '#ffffff', // Adjust the primary text color
      secondary: '#9e9e9e', // Adjust the secondary text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

export { lightTheme, darkTheme };
