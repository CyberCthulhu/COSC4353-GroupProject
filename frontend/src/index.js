import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const theme = createTheme({
  palette: {
    mode:'dark',
    primary: {
      main: '#1976d2',  
    },
    secondary: {
      main: '#dc004e',  
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> 
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);
