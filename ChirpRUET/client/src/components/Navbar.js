import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home'; 
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#031930', 
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center', 
  },
  logo: {
    maxWidth: '125px', 
    height: 'auto',
  },
  homeButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px', 
    color: '#B3D6F9',  
  },
  leftAlignButton: {
    position: 'absolute', 
    left: '20px', 
    top: '50%',
    transform: 'translateY(-50%)', 
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        
        <Link to="/" className={classes.leftAlignButton} style={{ textDecoration: 'none' }}>
          <Button color="inherit" className={classes.homeButton}>
            <HomeIcon style={{ color: '#B3D6F9', fontSize: '50px'}} />
            <Typography style={{ color: '#B3D6F9' }}></Typography>
          </Button>
        </Link>

        
        <Link to="/" className={classes.title}>
          <img src="/MainLogo.png" alt="Logo of ChirpRUET" className={classes.logo} />
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

