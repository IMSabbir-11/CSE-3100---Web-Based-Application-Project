import React from 'react';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import PublicIcon from '@material-ui/icons/Public';

const TrendingNews = () => {
  // Function to handle the click event
  const handleClick = (topic) => {
    alert(`You clicked on: ${topic}`);
  };

  return (
    <div style={{ padding: '10px', backgroundColor: '#223A59', borderRadius: '6px', minHeight: '50%' }}>
      <Typography
        variant="h6"
        style={{ color: '#B3D6F9', fontWeight: '500', textAlign: 'center', marginBottom: '10px' }}
      >
        Trending News
      </Typography>
      <List>
        <ListItem 
          button 
          onClick={() => handleClick("Trending Topic")}
          style={{
            backgroundColor: '#3A5BA0', 
            borderRadius: '6px', 
            margin: '5px 0', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
            transition: 'background-color 0.3s',
            padding: '8px 12px', 
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#4A6EA1'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3A5BA0'} 
        >
          <ListItemIcon>
            <TrendingUpIcon style={{ color: '#B3D6F9', fontSize: '1.3rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Trending Topic"
            primaryTypographyProps={{ style: { color: '#B3D6F9', fontWeight: '500', fontSize: '0.9rem' } }}
          />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleClick("Hot Topic")}
          style={{
            backgroundColor: '#FF5733', 
            borderRadius: '6px', 
            margin: '5px 0', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
            transition: 'background-color 0.3s',
            padding: '8px 12px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FF7043'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5733'} 
        >
          <ListItemIcon>
            <FlashOnIcon style={{ color: '#B3D6F9', fontSize: '1.3rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="Hot Topic"
            primaryTypographyProps={{ style: { color: '#B3D6F9', fontWeight: '500', fontSize: '0.9rem' } }}
          />
        </ListItem>

        <ListItem 
          button 
          onClick={() => handleClick("New Updates")}
          style={{
            backgroundColor: '#2A86A5', 
            borderRadius: '6px', 
            margin: '5px 0', 
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
            transition: 'background-color 0.3s',
            padding: '8px 12px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3B97B1'} 
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2A86A5'} 
        >
          <ListItemIcon>
            <PublicIcon style={{ color: '#B3D6F9', fontSize: '1.3rem' }} />
          </ListItemIcon>
          <ListItemText
            primary="New Updates"
            primaryTypographyProps={{ style: { color: '#B3D6F9', fontWeight: '500', fontSize: '0.9rem' } }}
          />
        </ListItem>
      </List>
    </div>
  );
};

export default TrendingNews;
