const mongoose = require('mongoose');

const UploadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'User Id is missing']
  },
  filePath: {
    type: String,
    required: [true, 'Please add a file to upload']
  },
  fileName:{
    type:String,
    required:[true, 'pleaser provide file name']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Upload', UploadSchema);