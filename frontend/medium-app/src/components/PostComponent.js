import React from 'react';
import AddCommentForm from './AddCommentForm.js';
import './css/ContentStyle.css';
import './css/PostsComponent.css';
import axios from 'axios';
import {connect} from 'react-redux';


class PostComponet extends React.Component
{

  state = {
    showComments: false,
  }


  toggleComment = () =>
  {
    let toggle = this.state.showComments;
    if(toggle)
    {
      this.setState({
        ...this.state,
        showComments: false
      });
    }
    else
    {
      this.setState({
        ...this.state,
        showComments: true
      });
    }
  }

  getUpdatedPosts = (getUpdated) =>
  {
    this.props.updatedPosts(getUpdated);
  }

  addLike = (e) =>
  {
    axios.post(`http://localhost:8080/posts/${e.target.value}/like`,
      {
        username: this.props.userState
      }
      ).then(res => {
        // console.log(res.data);
        this.props.updatedPosts(res.data.allPosts);

      })

  }

  render()
  {
    // console.log(this.props.post.likes);

    return(
      <div className = "userPostContainer">
        <div className = "userPostTitle">
          <h4 className = "h-style">{this.props.post.postTitle}</h4>
          <span><small>by {this.props.post.username}</small></span>
        </div>
        <p>
          {this.props.post.postContent}
        </p>
        <div className = "actionPostBox">
          {
            this.state.showComments ?
            (
              <>
                <AddCommentForm
                  post = {this.props.post}
                  getUpdatedPosts = {this.getUpdatedPosts}
                />
                <div className = "likeAndCommentBox">
                  <span className = "spanLike">
                    <small>
                    {
                      this.props.userState === null ?
                      (
                        <span>
                        </span>
                      )
                      :
                      (
                        <span>
                          {
                            this.props.post.likes.some(liked => liked.username === this.props.userState) ?
                            (
                              <span>You Liked this | </span>
                            )
                            :
                            (
                              <button
                                value = {this.props.post._id}
                                onClick = {this.addLike}
                              >
                                Like
                              </button> 
                            )
                          }
                        </span>
                      )
                    }
                      Like/s {this.props.post.likes.length}
                    </small>
                  </span>
                  <span className = "toggleSpanComment" onClick={this.toggleComment}>
                    <small>hide comments</small>
                  </span>
                </div>
              </>
            )
            :
            (
              <div className = "likeAndCommentBox">
                <span className = "spanLike">
                    <small>
                      {
                        this.props.userState === null ?
                        (
                          <span>
                          </span>
                        )
                        :
                        (
                          <span>
                            {
                              this.props.post.likes.some(liked => liked.username === this.props.userState)  ?
                              (
                                <span>You Liked this | </span>
                              )
                              :
                              (
                                <button
                                  value = {this.props.post._id}
                                  onClick = {this.addLike}
                                >
                                  Like
                                </button> 
                              )
                            }
                          </span>
                        )
                      }
                      Like/s {this.props.post.likes.length}
                    </small>
                  </span>
                <span className = "toggleSpanComment" onClick={this.toggleComment}>
                  <small>comment/s {this.props.post.comments.length}</small>
                </span>
              </div>
            )
          }

        </div>

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

export default connect(mapStateToProps)(PostComponet);