const mongoose = require('mongoose');


const postsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now 
  }
});

const Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;
