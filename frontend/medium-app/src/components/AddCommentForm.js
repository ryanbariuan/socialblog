import React from 'react';
import './css/ContentStyle.css';
import './css/PostsComponent.css';
import {connect} from 'react-redux';
import axios from 'axios';

class AddCommentForm extends React.Component
{

  state = {
    content: '',
    username: this.props.userState,
    errors: ''
  }

  onChangeForm = (e) =>
  {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formValidation = () =>
  {
    const {content} = this.state;
    let isValid = true;
    const errors = {};

    if(content.trim() === "")
    {
      errors.commentRequired = "Please fill up the field for adding a comment";
      isValid = false;
    }
    
    this.setState({errors});
    return isValid;
  }

  addComment = () =>
  {
    const isValid = this.formValidation();
    if(isValid)
    {
      axios.post(`http://localhost:8080/posts/${this.props.post._id}/comment`, 
      {
        content: this.state.content,
        username: this.state.username
      }).then(res => {
        let allPosts = res.data.allPosts;
        // console.log(allPosts);
        // this.props.updateAllPostHandler(allPosts);
        this.props.getUpdatedPosts(allPosts);

      })

      this.setState({
        ...this.state,
        content: '',
        errors: ''
      })

    }
  }

  render()
  {
    let errorForm = this.state.errors;
    // console.log(this.props.post);

    return(
      <div className = "commentForm">

        {
          this.props.userState === null ?
          (
            <>
              <div className = "commentWrapper">
                {
                  this.props.post.comments.map(comment =>{
                    return(
                      <div 
                        key = {comment._id}
                      >
                        <span>@user: {comment.username}</span>
                        <p>{comment.content}</p>
                      </div>
                    )
                  })
                }
              </div>
              <p>You must login to add a comment</p>
            </>
          )
          :
          (
            <>
              <div className = "commentWrapper">
                {
                  this.props.post.comments.map(comment =>{
                    return(
                      <div 
                        key = {comment._id}
                      >
                        <span>@user: {comment.username}</span>
                        <p>{comment.content}</p>
                      </div>
                    )
                  })
                }
              </div>
              <label className ="label-style">Comment: </label>
              <textarea
                name = "content"
                value = {this.state.content}
                onChange = {
                  this.onChangeForm
                }   
                className = "textArea-style"
                placeholder = "Comment..."
                cols = "20"
                rows = "3"
              >
              </textarea>
              {
                errorForm.commentRequired ? 
                (
                  <span className = "errorMsg-style"><small>{errorForm.commentRequired}</small></span>
                )
                :
                ('')
              }
              <button
                onClick = {this.addComment}
                className = "btn-style"
              >
                Add Comment
              </button>
            </>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state =>
{
  return{
    userState: state.userState,
  };
}

export default connect(mapStateToProps)(AddCommentForm);