const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const usersRoute = require('./routes/users');
const Posts = require('./models/posts'); 
const { JWT_SECRET } = require('./config');

const app = express();
const PORT = 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://mdsabbirmahmud11:WVkKOiyKY6jfGAl9@cluster0.k1u70.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Failed to connect to MongoDB:', err);
});

// Define a Passport JWT strategy
const jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(new passportJwt.Strategy(jwtOptions, (payload, done) => {

  const user = {
    id: payload.userId,
    username: payload.username,
  };

  // Pass the user to the next middleware or route handler
  return done(null, user);
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize()); // Initialize Passport middleware

// Routes
app.use('/users', usersRoute);

// Define a route for token verification
app.get('/api/verify', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log(req.user);
  return res.json(req.user);
});

// Define a route to create a new post
app.post('/createPost', passport.authenticate('jwt', { session: false }), (req, res) => {
 
  const { id: userId, username } = req.user;
  const { content } = req.body;
  const newPost = new Posts({
    userId,
    username,
    content
  });

  // Save the new post to the database
  newPost.save()
    .then(post => {
      res.status(201).json({ message: 'Post created successfully', post });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to create post' });
    });
});

app.get('/feed', (req, res) => {
  const { username } = req.query;

  // Find the posts from the database, ordered by creation date and limited to 10 posts
  let query = Posts.find().sort({ createdAt: -1 }).limit(10);

  if (username) {
    query = query.where({ username });
  }

  query
    .exec()
    .then(posts => {
      // Send the list of posts as a response
      res.status(200).json({ posts });
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to get feed' });
    });
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
