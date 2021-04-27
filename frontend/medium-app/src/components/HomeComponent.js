import React from 'react';
import './css/ContentStyle.css';
import './css/HomeComponent.css';
import {Link} from 'react-router-dom';

class HomeComponent extends React.Component
{
  render()
  {
    return(
      <div className = "container">
        <div className = "homeContainer">
          <h1>Welcome to SocialBlog!</h1>
          <div className = "introContainer">
            <p>
                Read and share any stories anything under the sun.
                Sign Up and Login to start. 
            </p>
            <span><Link to ="/register">Get Started</Link></span>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;