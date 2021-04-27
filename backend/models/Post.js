const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postTitle: String,
  postContent: String,
  username: String,
  user_id: String,
  comments :[
    {
      content: String,
      username: String
    }
  ],
  likes :[
    {
      username: String
    }
  ]

});

module.exports = mongoose.model('Post', PostSchema);