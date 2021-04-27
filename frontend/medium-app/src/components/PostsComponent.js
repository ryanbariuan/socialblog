import React from 'react';
import PostComponent from './PostComponent.js';
import './css/ContentStyle.css';
import './css/PostsComponent.css';
import axios from 'axios';
import {connect} from 'react-redux';

class PostsComponet extends React.Component
{

  state = {
    allPosts: []
  }

  componentDidMount()
  {
    axios.get(`http://localhost:8080/posts`).then(res => {
      // console.log(res.data);
      this.setState({
        allPosts: res.data
      });
    });
  }

  updatedPosts = (updated) =>
  {
    this.setState({
      allPosts: updated
    });
    // console.log(this.state.allPosts);
  }

  render()
  {

    return(
      <div className = "container">
        <div className = "postContainer">
          {
            this.props.userState === null ?
            (
              <p>You are not logged In</p>
            )
            :
            (
              <p>Welcome {this.props.userState}</p>
            )
          }
          <h1 className = "h-style">All Blog Posts</h1>
          <div className = "postWrapper">
            {

              this.state.allPosts.length === 0 ?
              (
                <>
                  <p>No Posts Yet</p>
                </>
              )
              :
              (
                <>
                  {
                    this.state.allPosts.map(post =>{
                      return(
                        <PostComponent
                          key = {post._id}
                          post = {post}
                          updatedPosts = {this.updatedPosts}
                          allPosts = {this.state.allPosts}
                        />
                      );
                    })
                  }
                </>
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
  };
}

export default connect(mapStateToProps)(PostsComponet);