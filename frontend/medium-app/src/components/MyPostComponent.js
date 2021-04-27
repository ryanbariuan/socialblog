import React from 'react';
import './css/ContentStyle.css';
import './css/ProfileComponent.css';
import axios from 'axios';
import {connect} from 'react-redux';

class MyPostComponent extends React.Component
{

  deletePost = () => {
    axios.delete(`http://localhost:8080/profile/myposts/${this.props.myPost._id}`).then(
      res => {
        alert(`Post deleted`);
        console.log(res.data);

        let loadedAccountDetails = {
          _id: res.data.acc._id,
          username: res.data.acc.username,
          email: res.data.acc.email,
          posts: res.data.acc.posts
        };
        this.props.loadAccInfo(loadedAccountDetails);

        let posts = res.data.posts.filter( myPosts =>{
          return myPosts.username === this.props.userState;
        });

        this.props.updateMyPost(posts); // update myPost state on profile
        this.props.loadMyPost(posts);

      });
  }

  render(){
    return(
      <div className = "myPostContainer">
        <h4 className = "h-style">Title: {this.props.myPost.postTitle}</h4>
        {/* <div className = "myPostContent">
            <p>{this.props.myPost.postContent}</p>
        </div> */}
        <div className ="managePostBox">
          <button
            value = {this.props.myPost._id}
            onClick = {this.deletePost}
            className = "btn-del-style" 
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return{
    userState: state.userState
  };
}

const mapDispatchToProps = dispatch => {
  return{

    loadAccInfo: (accountInfo) =>
    {
      let action = {
        type: 'LOAD_INFO',
        payload: accountInfo
      };
      dispatch(action);
    },

    loadMyPost: (myposts) =>
    {
      let action = {
        type: 'MY_POSTS',
        payload: myposts
      };
      dispatch(action);
    }

  };
}


export default connect(mapStateToProps,mapDispatchToProps)(MyPostComponent);