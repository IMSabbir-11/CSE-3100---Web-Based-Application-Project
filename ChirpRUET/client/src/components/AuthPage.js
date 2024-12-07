import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setToken, setUsername } from '../redux/reducers/userReducer';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import API_DOMAIN from '../config';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const token = useSelector(state => state.user.token);
  const username = useSelector(state => state.user.username);

  const dispatch = useDispatch();

  const handleSwitchForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage(''); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(clearUser());
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch(`${API_DOMAIN}/api/verify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        dispatch(setToken(token));
        dispatch(setUsername(data.username));
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch]);

  const handleLoginSubmit = (loginData) => {
    fetch(`${API_DOMAIN}/users/login`, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          dispatch(setToken(data.token));
          dispatch(setUsername(data.username));
          localStorage.setItem('token', data.token);
          setErrorMessage(''); 
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('An unexpected error occurred. Please try again.');
      });
  };

  const handleRegisterSubmit = (registerData) => {
    fetch(`${API_DOMAIN}/users/register`, {
      method: 'POST',
      body: JSON.stringify(registerData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          setErrorMessage(data.error);
        } else {
          dispatch(setToken(data.token));
          dispatch(setUsername(data.username));
          localStorage.setItem('token', data.token);
          setErrorMessage(''); 
        }
      })
      .catch(error => {
        console.error(error);
        setErrorMessage('An unexpected error occurred. Please try again.'); 
      });
  };

  return (
    <div>
      {token ? (
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h6" align="center">
            Welcome, {username}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLogout}
            style={{ marginTop: 10 }}
          >
            Logout
          </Button>
        </div>
      ) : (
        isLogin ? (
          <LoginForm onSubmit={handleLoginSubmit} errorMessage={errorMessage} />
        ) : (
          <RegisterForm onSubmit={handleRegisterSubmit} />
        )
      )}
      {!token && (
        <Link
          component="button"
          variant="body2"
          onClick={handleSwitchForm}
          style={{ marginTop: 10 }}
        >
          {isLogin ? 'Click here to register' : 'Click here to login'}
        </Link>
      )}
    </div>
  );
};

export default AuthPage;
