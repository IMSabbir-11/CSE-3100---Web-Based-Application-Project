
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import API_DOMAIN from '../config'; // Import API_DOMAIN from config.js

const WriteTweet = () => {
  const [tweetText, setTweetText] = useState('');
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const username = useSelector(state => state.user.username);

  const handleInputChange = (event) => {
    setTweetText(event.target.value);
  };

  const handleTweetSubmit = () => {
    if (!token) {
      console.log('Please Sign-IN/Register to start Chirping');
      return;
    }

    // Add logic to submit tweet to API with tweetText using fetch
    fetch(`${API_DOMAIN}/createPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ content: tweetText, username })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit tweet');
        }
        console.log('Tweet submitted:', tweetText);
        
        setTweetText('');
      })
      .catch(error => {
        console.error('Failed to submit tweet:', error);
      });
  };

  const handleClearText = () => {
    setTweetText('');
  };

  if (!token) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '24vh', 
        backgroundColor: '#031930', 
        color: '#D1DDED' 
      }}>
        <Typography variant="h6">
          Please{' '}
          <span style={{ color: '#3684DB' }}>Sign-In/Register</span> to start Chirping
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <TextField
        label="Feel free to Chirp"
        multiline
        rows={5}
        variant="outlined"
        value={tweetText}
        onChange={handleInputChange}
        fullWidth
        InputProps={{
          style: { color: 'white' }, 
        }}
        InputLabelProps={{
          style: { color: '#B3D6F9' }, 
        }}
      />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleTweetSubmit}
        style={{ marginTop: '10px' }}
      >
        Chirp
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleClearText}
        style={{ marginTop: '10px', marginLeft: '10px' }}
      >
        Clear
      </Button>
    </div>
  );
};

export default WriteTweet;
