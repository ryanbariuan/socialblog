import React from 'react';
import {Link} from 'react-router-dom';
import './css/HeaderComponent.css';


class HeaderComponent extends React.Component
{
  render(){
    return(
      <header>
        <div id = "logoContainer">
          <h2><Link to ="/">SocialBlog</Link></h2>
        </div>
        <input type ="checkbox" id = "navToggle" className = "navToggle"/>
        <nav>
          <ul>
            {
              this.props.userLogged ?
              (
                <>
                  <li><Link to ="/posts">Blog Posts</Link></li>
                  <li>
                    <Link to ="/profile">Profile</Link>
                  </li>
                  <li>
                    <button onClick = {this.props.logoutUser}>
                      Logout
                    </button>
                  </li>
                </>
              )
              :
              (
                <>
                  <li><Link to ="/posts">Blog Posts</Link></li>
                  <li><Link to ="/login">Login</Link></li>
                  <li><Link to ="/register">Register</Link></li>
                </>
              )
            }
          </ul>
        </nav>
        <label htmlFor="navToggle" className="navToggleIcon">
          <span></span>
        </label>
      </header>
    );
  }
}

export default HeaderComponent;