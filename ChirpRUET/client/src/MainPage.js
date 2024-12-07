import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AuthPage from './components/AuthPage';
import WriteTweet from './components/WriteTweet';
import FeedComponent from './components/FeedComponent';
import MembersOnline from './components/MembersOnline'; 
import TrendingNews from './components/TrendingNews';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: '#031930',
    color: '#D1DDED',
  },
  topLeftComponent: {
    textAlign: 'left',
    minHeight: '20vh',
    border: '1px solid #3684DB',
    padding: theme.spacing(2),
    backgroundColor: '#223A59',
  },
  topMiddleComponent: {
    textAlign: 'center',
    minHeight: '20vh',
    border: '1px solid #3684DB',
    padding: theme.spacing(2),
    backgroundColor: '#223A59', 
  },
  topRightComponent: {
    textAlign: 'right',
    minHeight: '20vh',
    border: '1px solid #3684DB', 
    padding: theme.spacing(2),
    backgroundColor: '#223A59', 
  },
  bottomLeftComponent: {
    textAlign: 'left',
    minHeight: '20vh',
    border: '1px solid #3684DB', 
    padding: theme.spacing(2),
    backgroundColor: '#223A59', 
  },
  bottomRightComponent: {
    textAlign: 'center',
    minHeight: '20vh',
    border: '1px solid #3684DB',
    padding: theme.spacing(2),
    backgroundColor: '#223A59', 
  },
}));

const MainPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        
        <Grid item xs={12} sm={2}>
          <Container className={classes.topLeftComponent}>
            <div>
              <TrendingNews />
            </div>
          </Container>
        </Grid>

        
        <Grid item xs={12} sm={6}>
          <Container className={classes.topMiddleComponent}>
            <div>
              <AuthPage /> 
            </div>
          </Container>
        </Grid>

        
        <Grid item xs={12} sm={4}>
          <Container className={classes.topRightComponent}>
            <div>
              <WriteTweet />
            </div>
          </Container>
        </Grid>

        
        <Grid item xs={12} sm={2}>
          <Container className={classes.bottomLeftComponent}>
            <div>
              <MembersOnline /> 
            </div>
          </Container>
        </Grid>

        
        <Grid item xs={12} sm={10}>
          <Container className={classes.bottomRightComponent}>
            <div>
              <FeedComponent /> 
            </div>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainPage;
