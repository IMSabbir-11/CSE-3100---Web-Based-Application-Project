import React from 'react';
import { Typography, List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import { Link } from 'react-router-dom';

const MembersOnline = () => {
  const members = ['2003095', '2003070', '2003082']; // Example member IDs

  return (
    <div style={{ backgroundColor: '#031930', borderRadius: '8px', padding: '16px', minHeight: '50%' }}>
      <Typography
        variant="h6"
        style={{
          color: '#B3D6F9',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '16px',
          textTransform: 'uppercase',
        }}
      >
        Members Online
      </Typography>
      <List>
        {members.map((member, index) => (
          <ListItem
            button
            key={index}
            style={{
              backgroundColor: index % 2 === 0 ? '#223A59' : '#3684DB', 
              borderRadius: '5px',
              marginBottom: '10px',
              padding: '10px 20px',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#3684DB'; 
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = index % 2 === 0 ? '#223A59' : '#3684DB'; 
            }}
          >
            <ListItemIcon>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  backgroundColor: '#36C759', 
                  marginRight: '10px',
                }}
              />
            </ListItemIcon>
            <Link to={`/profile/${member}`} style={{ textDecoration: 'none' }}>
              <ListItemText
                primary={member}
                primaryTypographyProps={{
                  style: {
                    color: '#D1DDED', 
                    fontWeight: 'bold',
                  },
                }}
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MembersOnline;
