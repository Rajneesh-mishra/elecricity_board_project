import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import LightModeIcon from '@mui/icons-material/LightMode';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import { Link } from 'react-router-dom';

const Header = ({setCurrentTheme,currentTheme}) => {
  const toggleTheme = ()=>setCurrentTheme(currentTheme==="dark"?"light":"dark")
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Typography variant="h6" component="div">
            Electricity Connection Management 
          </Typography>
          <Typography variant="h6" component="div">
          <Link to={'/'} style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </Typography>
          <Typography variant="h6" component="div">
            <Link to={'/connections'} style={{ textDecoration: 'none', color: 'inherit' }}>
              Connections
            </Link>
          </Typography>
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* setCurrentTheme */}
        <IconButton size="large" onClick={toggleTheme}>
            {
              currentTheme === "light" ?
              <LightModeIcon style={{color:"#f9d71c"}} />:<Brightness3Icon/>
            }
          </IconButton>
          <IconButton size="large">
            <Avatar alt="RM" src="/path-to-your-avatar.jpg" />
          </IconButton>
          <Typography variant="body1" sx={{ marginLeft: 1 }}>
            Rajneesh Mishra
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
