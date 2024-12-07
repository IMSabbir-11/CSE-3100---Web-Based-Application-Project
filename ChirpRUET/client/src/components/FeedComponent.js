import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import API_DOMAIN from '../config';
import { ThumbUp, ThumbDown } from '@material-ui/icons'; 

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2),
    padding: theme.spacing(3),
    display: 'flex',
    alignItems: 'flex-start',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
    transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
    background: 'linear-gradient(135deg, #031930 20%, #223A59 80%)',
    '&:hover': {
      transform: 'scale(1.05)',
      backgroundColor: '#3684DB',
    },
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: 50,
    height: 50,
  },
  username: {
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textDecoration: 'underline',
    cursor: 'pointer',
    color: '#B3D6F9',
    transition: '0.3s ease',
    '&:hover': {
      textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
    },
  },
  content: {
    flexGrow: 1,
    wordWrap: 'break-word',
    color: '#D1DDED',
  },
  createdAt: {
    marginLeft: 'auto',
    color: '#B3D6F9',
    fontSize: '0.85rem',
    fontStyle: 'italic',
  },
  likeDislikeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2), 
    justifyContent: 'flex-start', 
  },
  button: {
    cursor: 'pointer',
    padding: theme.spacing(0.5),
    color: '#B3D6F9',
    '&:hover': {
      color: '#3684DB',
    },
  },
  divider: {
    margin: theme.spacing(2, 0),
    backgroundColor: '#B3D6F9',
  },
}));

const FeedComponent = ({ username }) => {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const url = `${API_DOMAIN}/feed${username ? `?username=${username}` : ''}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error('Failed to fetch posts:', error));
  }, [username]);

  
  const handleLikeDislike = (postId, action) => {
    
    console.log(`Post ${postId} ${action}`);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom style={{ color: '#B3D6F9' }}>
        Feed
      </Typography>
      {posts.map((post, index) => (
        <React.Fragment key={post._id}>
          <Paper className={classes.root}>
            <Avatar alt={post.username} src={post.avatar} className={classes.avatar} />
            <Link to={`/profile/${post.username}`} className={classes.username}>
              <Typography>{post.username}</Typography>
            </Link>
            <Typography className={classes.content}>{post.content}</Typography>
            <Typography className={classes.createdAt}>
              {new Date(post.createdAt).toLocaleString()}
            </Typography>

            <div className={classes.likeDislikeContainer}>
            
              <div
                className={classes.button}
                onClick={() => handleLikeDislike(post._id, 'like')}
              >
                <ThumbUp />
              </div>

              
              <div
                className={classes.button}
                onClick={() => handleLikeDislike(post._id, 'dislike')}
              >
                <ThumbDown />
              </div>
            </div>
          </Paper>
          {index !== posts.length - 1 && <Divider className={classes.divider} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default FeedComponent;
