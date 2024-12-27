import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#031930',
  },
  toolbar: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
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
  },
  searchIconContainer: {
    position: 'absolute',
    right: '20px',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: '#223A59',
    color: '#D1DDED',
    borderRadius: '5px',
    width: '0',
    overflow: 'hidden',
    transition: 'width 0.3s ease-in-out',
    '&:focus': {
      width: '200px',
    },
    '& .MuiInputBase-input': {
      color: '#D1DDED',
      padding: theme.spacing(0.5),
    },
  },
  expandedSearchInput: {
    width: '200px', // Expanded width when search is active
    paddingLeft: theme.spacing(1),
  },
  searchResults: {
    position: 'absolute',
    top: '40px',
    right: '20px',
    backgroundColor: '#223A59',
    color: '#D1DDED',
    border: '1px solid #3684DB',
    borderRadius: '5px',
    zIndex: 1000,
    width: '200px',
    maxHeight: '200px',
    overflowY: 'auto',
    padding: theme.spacing(1),
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const dummyUsernames = ['john_doe', 'jane_smith', 'charlie_brown', 'ruet_user'];

  const handleSearchToggle = () => {
    setSearchExpanded(!searchExpanded);
    setSearchTerm(''); // Clear search term on toggle
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      const results = dummyUsernames.filter((username) =>
        username.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/* Home Button */}
        <Link to="/" className={classes.leftAlignButton} style={{ textDecoration: 'none' }}>
          <IconButton color="inherit" className={classes.homeButton}>
            <HomeIcon style={{ color: '#B3D6F9', fontSize: '50px' }} />
          </IconButton>
        </Link>

        {/* Logo */}
        <Link to="/" className={classes.title}>
          <img src="/MainLogo.png" alt="Logo of ChirpRUET" className={classes.logo} />
        </Link>

        {/* Search Icon and Input */}
        <Box className={classes.searchIconContainer}>
          {searchExpanded && (
            <InputBase
              placeholder="Search username..."
              value={searchTerm}
              onChange={handleSearch}
              className={`${classes.searchInput} ${
                searchExpanded ? classes.expandedSearchInput : ''
              }`}
            />
          )}
          <IconButton color="inherit" onClick={handleSearchToggle}>
            <SearchIcon style={{ color: '#B3D6F9' }} />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Search Results */}
      {searchExpanded && searchResults.length > 0 && (
        <div className={classes.searchResults}>
          {searchResults.map((result, index) => (
            <div key={index}>{result}</div>
          ))}
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;
