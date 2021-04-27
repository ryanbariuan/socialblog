import React from 'react';
import './css/ContentStyle.css';
import './css/ProfileComponent.css';
import MyPostComponent from './MyPostComponent.js';
import axios from 'axios';
import {connect} from 'react-redux';


class ProfileComponent extends React.Component
{

  state = {
    showAddPost: false,
    postTitle: '',
    postContent: '',
    username: this.props.userState,
    errors: '',
    myposts: []
  }

  componentDidMount()
  {
    axios.get(`http://localhost:8080/profile`).then(res => {
        let posts = res.data.filter( myPosts =>{
          return myPosts.username === this.props.userState;
        });
        this.setState({
          ...this.state,
          myposts: posts
        });
        this.props.loadMyPost(posts);

    });
  }

  updateMyPost = (postChanges) =>
  {
    this.setState({
      ...this.state,
      myposts: postChanges
    });
  }

  onChangeForm = (e) =>
  {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formValidation = () =>
  {
    const {postTitle, postContent} = this.state;
    let isValid = true;
    const errors = {};

    if(postTitle.trim() === "")
    {
      errors.titleRequired = "Title is required!";
      isValid = false;
    }
    if(postContent.trim() === "")
    {
      errors.contentRequired = "Content is required!";
      isValid = false;
    }

    this.setState({errors});
    return isValid;

  }

  newPost = () =>
  {
    const isValid = this.formValidation();
    if(isValid)
    {
      axios.post(`http://localhost:8080/profile/addpost`, {
        postTitle: this.state.postTitle,
        postContent: this.state.postContent,
        user_id: this.props.userIDState,
        username: this.props.userState,
      }).then( res => {
        if(res.data.error)
        {
          alert(res.data.error);
        }
        else
        {
          // REFRESH account and posts details
          alert(res.data.msg);

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
          
          this.setState({
            ...this.state,
            myposts: posts
          })

          this.props.loadMyPost(posts);
        }
      });

      this.setState({
        ...this.state,
        postTitle: '',
        postContent: '',
        errors: ''
      });

    }
  }

  render(){

    let errorForm = this.state.errors;
    let countPost = this.props.userPostCount;
    let myPostRecorded = this.state.myposts.slice(0); 

    // console.log(myPostRecorded);

    return(
      <div className = "container">
        <div className = "profileContainer">
          <div className = "welcomeUser">
            <h3 className ="h-style">Welcome {this.props.userState}</h3>
          </div>
          <div className = "manageContainer">
            <h4 className ="h-style">Management</h4>
            {
              this.state.showAddPost ?
              (
                <div className = "showFormWrapper">
                  <div className = "addPostForm">
                    <h5 className ="h-style">
                      Create New Blog Post
                    </h5>
                    <label className ="label-style">Title: </label>
                    <input 
                      type = "text"
                      name = "postTitle"
                      className ="inputText-style"
                      placeholder = "My first post"
                      value = {this.state.postTitle}
                      onChange = {
                        this.onChangeForm
                      } 
                    />
                    {
                      errorForm.titleRequired ? 
                      (
                        <span className = "errorMsg-style"><small>{errorForm.titleRequired}</small></span>
                      )
                      :
                      ('')
                    }
                    <label className ="label-style">Content:</label>
                    <textarea
                      placeholder = "My first content"
                      className ="textArea-style"
                      cols = "30"
                      rows = "8"
                      name = "postContent"
                      value = {this.state.postContent}
                      onChange = {
                        this.onChangeForm
                      } 
                    >
                    </textarea>
                    {
                      errorForm.contentRequired ? 
                      (
                        <span className = "errorMsg-style"><small>{errorForm.contentRequired}</small></span>
                      )
                      :
                      ('')
                    }
                  </div>
                  <div className = "actionBox">
                    <button
                      className = "btn-style"
                      onClick={this.newPost}
                    >
                      Create Post
                    </button>
                    <button
                      className = "btn-style"
                      onClick = { e => {this.setState({
                        ...this.state,
                        showAddPost: false,
                        postTitle: '',
                        postContent: '',
                        errors: ''
                      })}}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
              :
              (
                <div className = "showBtnWrapper">
                  <button 
                    className = "btn-style"
                    onClick = { e => {this.setState({showAddPost: true})}}
                  >
                    Add Post
                  </button>
                </div>
              )
            }

          </div>
          <div className ="myPostsContainer">
            <h4 className ="h-style">My Posts</h4>
            {
              countPost === 0 || undefined ?
              (
                <p>No Posts Added Yet</p>
              )
              :
              (
                <div className = "postsWrapper">
                  {
                    
                    myPostRecorded.map( myPost =>{
                      return(
                        <MyPostComponent
                          key = {myPost._id}
                          myPost = {myPost}
                          updateMyPost = {this.updateMyPost}
                        />
                      );
                    })
                  }                  
                </div>
              )
            }
            
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return{
    userState: state.userState,
    userIDState: state.userIDState,
    acc: state.acc,
    userPostCount: state.userPostCount,
    myPosts: state.myPosts
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

// export default ProfileComponent;
export default connect(mapStateToProps, mapDispatchToProps)(ProfileComponent);