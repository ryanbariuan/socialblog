import React from 'react';
import HeaderComponent from './HeaderComponent.js';
import RegisterFormComponent from './RegisterFormComponent.js';
import LoginFormComponent from './LoginFormComponent.js';
import ProfileComponent from './ProfileComponent.js';
import HomeComponent from './HomeComponent.js';
import PostsComponent from './PostsComponent.js';
import {Helmet} from 'react-helmet';
import {Redirect, Route} from 'react-router-dom';
import './css/App.css';
import { connect } from 'react-redux';


class App extends React.Component{
  render()
  {
    return(
      <div className = "appContainer">
        <Helmet>
          <title>SocialBlog App</title>
        </Helmet>
        {
          this.props.userState ? 
          (
            <>
              <HeaderComponent
                userLogged = {this.props.userState}
                logoutUser = {this.props.logoutUser}
              />
              <main>
                <Route exact path="/register">
                  {this.props.userState && <Redirect to="/profile"/>}
                </Route>
                <Route exact path="/login">
                  {this.props.userState && <Redirect to="/profile"/>}
                </Route>
                <Route exact path="/profile">
                  <Helmet>
                    <title>My Profile</title>
                  </Helmet>
                  <ProfileComponent/>
                </Route>
                <Route exact path="/posts">
                  <Helmet>
                    <title>Blog Posts</title>
                  </Helmet>
                  <PostsComponent/>
                </Route>
                <Route exact path="/">
                  <Helmet>
                    <title>SocialBlog App | Home</title>
                  </Helmet>
                  <HomeComponent/>
                </Route>
              </main>
            </>
          )
          :
          (
            <>
              <HeaderComponent/>
              <main>
                <Route exact path="/register">
                  <Helmet>
                    <title>SocialBlog App | Sign Up</title>
                  </Helmet>
                  <RegisterFormComponent/>
                </Route>
                <Route exact path="/login">
                  <Helmet>
                    <title>SocialBlog App | Sign In</title>
                  </Helmet>
                  <LoginFormComponent/>
                </Route>
                <Route exact path="/profile">
                  <Redirect to="/login"/>
                </Route>
                <Route exact path="/">
                  <Helmet>
                    <title>SocialBlog App | Home</title>
                  </Helmet>
                  <HomeComponent/>
                </Route>
                <Route exact path="/posts">
                  <Helmet>
                    <title>Blog Posts</title>
                  </Helmet>
                  <PostsComponent/>
                </Route>
              </main>
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
    acc: state.acc
  };
}

const mapDispatchToProps = dispatch =>
{
  return{
    logoutUser: () =>
    {
      let action = {
        type: 'LOGOUT'
      }
      dispatch(action);
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
