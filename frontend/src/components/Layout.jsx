import React from 'react';
import Header from './Header'; // Import the Header component
import { Box, Paper } from '@mui/material';

const Layout = ({ children,setCurrentTheme,currentTheme }) => {
  return (
    <Paper style={{height:"100vh"}}>
      {/* Props drilling can be avoided with context */}
      <Header setCurrentTheme={setCurrentTheme} currentTheme={currentTheme}/>

      {/* Content Area */}
      <Box style={{  height:'100%',width:'100%'}}>
        {children}
      </Box>
    </Paper>
  );
};

export default Layout;
