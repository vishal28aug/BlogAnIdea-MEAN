const mongoose = require('mongoose');

const BlogsSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please enter id']
  },
  user: {
    type: String,
    required: [true, 'User Id is missing']
  },
  coverImagePath: {
    type: String,
  },
  blogTitle: {
    type: String,
    required: [true, 'pleaser provide blog title']
  },
  blogContent: {
    type: String,
    required: [true, 'please Enter some blog content']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blogs', BlogsSchema);