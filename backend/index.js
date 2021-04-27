const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');
const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/socialblogdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const User = require(`./models/User.js`);
const Post = require(`./models/Post.js`);

// -- deprecated bodyParser? --
// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// --- User Registration ---
app.post(`/register`, (req, res)=> {

  User.findOne({username: req.body.username}).then(account =>{
    if(account)
    {
      res.send({error: 'Username already exist'});
    }
    else
    {
      User.findOne({email: req.body.email}).then(emailAdd =>{
        if(emailAdd)
        {
          res.send({error: 'Email Address already exist'});
        }
        else
        {
          bcrypt.hash(req.body.password, 10).then(hashedPW => {
            let newUser = new User();
            newUser.username = req.body.username;
            newUser.password = hashedPW;
            newUser.email = req.body.email;
            newUser.save().then(data => {
              res.send({success: 'You have successfully registered an account'});
            });
          });
        }
      });      
    }
  });
});

// --- User Login ---
app.post('/login', (req, res) =>{
  User.findOne({email: req.body.email}).then(user =>{
    if(user)
    {
      bcrypt.compare(req.body.password, user.password).then(match =>{
        if(match)
        {
          res.send(user);
        }
        else
        {
          res.send({error: 'Incorrect Password'});
        }
      });
    }
    else
    {
      res.send({error: 'Incorrect Email/Password'});
    }
  });
});

// --- Add User Blog Posts ---
app.post('/profile/addpost', (req, res) =>{
  let newPost = new Post(req.body);
  newPost.save().then(post => {
    User.findById(req.body.user_id).then(user =>{
      user.posts.push(post._id);
      user.save();

      Post.find().then(data => {
        res.send({
          acc: user,
          msg: "Post created successfully",
          posts: data
        });
      });
    });
  });
});

//--- Delete Blog Posts ---
app.delete('/profile/myposts/:_id', (req,res) =>{
  Post.findByIdAndDelete(req.params._id, {
    useFindAndModify: false
  }).then(post => {
    User.findById(post.user_id)
    .then(user => {
      user.posts = user.posts.filter(id => id.toString() !== req.params._id);
      user.save();
      Post.find().then(data => {
        res.send({
          acc: user,
          posts: data
        });
      });
    });
    
  });
});

//-- Get all User Blog Post display on user Profile --
app.get('/profile', (req, res) =>{
  Post.find().then(data => res.send(data));
});

//-- Get all User Blog Post display on Posts Page --
app.get('/posts', (req, res) =>{
  Post.find().then(data => res.send(data));
});

//-- Add Comment on Post --
app.post(`/posts/:_id/comment`, (req, res) =>{
  Post.findById(req.params._id).then(post => {
    post.comments.push(req.body);
    post.save().then(newComment => {
      Post.find().then(data => {
        res.send({
          allPosts: data,
          newComment: newComment
        });
      });
    });
  });
});

//-- Add Like on Post --
app.post(`/posts/:_id/like`,(req, res) =>{
  Post.findById(req.params._id).then(post => {
    post.likes.push(req.body);
    post.save().then(newLikes => {
      Post.find().then(data => {
        res.send({
          allPosts: data,
          newLikes: newLikes
        });
      });
    });
  });

});


let db = mongoose.connection;
db.once('open', function() {
  console.log(`W'ere connected to database.`);
});

app.listen(port, function(){
  console.log(`app is running on port ${port}`);
});

