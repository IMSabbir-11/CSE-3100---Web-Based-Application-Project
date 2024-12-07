import React, { useState } from 'react';
import { Button, TextField, Grid, Container, Typography } from '@material-ui/core';

const LoginForm = ({ onSubmit, errorMessage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Container maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Username"
              fullWidth
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              color="primary"
              InputProps={{
                style: { color: 'white' }, 
              }}
              InputLabelProps={{
                style: { color: '#B3D6F9' }, 
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              color="primary"
              InputProps={{
                style: { color: 'white' }, 
              }}
              InputLabelProps={{
                style: { color: '#B3D6F9' }, 
              }}
            />
          </Grid>

          {errorMessage && (
            <Grid item xs={12}>
              <Typography variant="body2" color="error">
                {errorMessage}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;
