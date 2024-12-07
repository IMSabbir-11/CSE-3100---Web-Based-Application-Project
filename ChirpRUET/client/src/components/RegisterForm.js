import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: '#223A59',  
    borderRadius: 8,
    padding: theme.spacing(4),
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
  },
  textField: {
    marginBottom: theme.spacing(2),
    backgroundColor: '#223A59', 
    '& input': {
      color: '#ffffff', 
    },
    '& label': {
      color: '#B3D6F9', 
    },
    '& .MuiInput-underline:before': {
      borderBottom: '1px solid #ffffff',  
    },
    '& .MuiInput-underline:hover:before': {
      borderBottom: '2px solid #ffffff',  
    },
    '& .MuiInput-underline:after': {
      borderBottom: '2px solid #ffffff', 
    }
  },
  button: {
    backgroundColor: '#3684DB',  
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1F5D8A', 
    },
  },
  errorText: {
    color: '#FF4D4D', 
  },
  successText: {
    color: '#4CAF50', 
    textAlign: 'center',
  },
}));

const RegisterForm = ({ onSubmit }) => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateUsername = (username) => {
    const usernameRegex = /^[0-9]{7}$/;
    const isValid = usernameRegex.test(username) && parseInt(username) >= 2003001 && parseInt(username) <= 2003180;
    return isValid;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,32}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    // Validate Username
    if (!validateUsername(username)) {
      setErrorMessage('Invalid username. It must be a number between 2003001 and 2003180.');
      return;
    }

    // Validate Password
    if (!validatePassword(password)) {
      setErrorMessage('Invalid password. It must be 8-32 characters long and contain at least one letter, one number, and one special symbol.');
      return;
    }

    // Validate Confirm Password
    if (password !== confirmPassword) {
      setErrorMessage("Password doesn't match.");
      return;
    }

    // If everything is valid, submit the form and show success message
    console.log('Register form submitted:', username, password, confirmPassword);
    setSuccessMessage('Account created successfully!');

    
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    onSubmit({ username, password });
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
   
    if (validateUsername(event.target.value)) {
      setErrorMessage('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    
    if (validatePassword(event.target.value)) {
      setErrorMessage('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
 
    if (event.target.value === password) {
      setErrorMessage('');
    }
  };

  return (
    <Container maxWidth="xs" className={classes.container}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {successMessage ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h6" className={classes.successText}>
                  {successMessage}
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              <Grid item xs={12}>
                <TextField
                  label="Username"
                  fullWidth
                  value={username}
                  onChange={handleUsernameChange}
                  error={!!errorMessage && !validateUsername(username)}
                  helperText={!!errorMessage && !validateUsername(username) && 'Username must be a number between 2003001 and 2003180'}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  value={password}
                  onChange={handlePasswordChange}
                  error={!!errorMessage && !validatePassword(password)}
                  helperText={!!errorMessage && !validatePassword(password) && 'Password must contain at least one letter, one number, and one special symbol (8-32 characters).'}
                  className={classes.textField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  error={!!errorMessage && password !== confirmPassword}
                  helperText={!!errorMessage && password !== confirmPassword && "Password doesn't match."}
                  className={classes.textField}
                />
              </Grid>
              {errorMessage && (
                <Grid item xs={12}>
                  <Typography color="error" variant="body2" align="center" className={classes.errorText}>
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth className={classes.button}>
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  onClick={handleReset}
                >
                  Reset
                </Button>
              </Grid>
            </>
          )}
        </Grid>
      </form>
    </Container>
  );
};

export default RegisterForm;
