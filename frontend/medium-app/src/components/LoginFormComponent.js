import React from 'react';
import './css/ContentStyle.css';
import './css/LoginFormComponent.css';
import axios from 'axios';
import {connect} from 'react-redux';

class LoginFormComponent extends React.Component
{

  state = {
    email: '',
    password: '',
    errors: {},
    serverResponse: ''
  }

  onChangeForm = (e) =>
  {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  formValidation = () =>
  {
    const {email, password} = this.state;
    let isValid = true;
    const errors = {};

    if(email.trim() === "")
    {
      errors.emailRequired = "Email must be filled out!";
      isValid = false;
    }
    if(password.trim() === "")
    {
      errors.passwordRequired = "Password must be filled out!";
      isValid = false;
    }
    this.setState({errors});
    return isValid;
  }

  login = () =>
  {
    const isValid = this.formValidation();
    if(isValid)
    {
      axios.post(`http://localhost:8080/login`, this.state).then(res =>{
        if(res.data.error)
        {
          // alert(res.data.error);
          this.setState({
            serverResponse: res.data.error
          })
        }
        else
        {
          alert('Login successful!');
          this.props.loginUser(res.data.username);

          let loadedAccountDetails = {
            _id: res.data._id,
            username: res.data.username,
            email: res.data.email,
            posts: res.data.posts
          };
          this.props.loadAccInfo(loadedAccountDetails);
        }
      });
    }
  }


  render()
  {

    let errorForm = this.state.errors;
    let response = this.state.serverResponse;

    return(
      <div className = "container">
        <div className = "loginContainer">
          <h1 className = "h-style">Sign In</h1>
          <div id = "loginForm" className = "flexBox-column-style">
            {
              response ?
              (
                <span className = "errorMsg-style"><small>{response}</small></span>
              )
              :
              ('')
            }
            <label className="label-style">Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="user@email.com"
              value = {this.state.email}
              onChange = {
                this.onChangeForm
              }   
              className = "inputText-style"
            />
            {
              errorForm.emailRequired ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.emailRequired}</small></span>
              )
              :
              ('')
            }
            <label className="label-style">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Your Password"
              value = {this.state.password}
              onChange = {
                this.onChangeForm
              }   
              className = "inputText-style"
            />
            {
              errorForm.passwordRequired ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.passwordRequired}</small></span>
              )
              :
              ('')
            }
            <button 
              id = "loginBtn" 
              className = "btn-style"
              onClick = {
                this.login
              }
            >
              Login
            </button>
          </div>
          <p>
            New User? <a href ="/register">Sign Up</a> for new account
          </p>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loginUser: (user) =>{
      let action = {
        type: 'LOGIN',
        payload: user
      };
      dispatch(action);
    },

    loadAccInfo: (accountInfo) =>
    {
      let action = {
        type: 'LOAD_INFO',
        payload: accountInfo
      };
      dispatch(action);
    }

  };
}



export default connect(null, mapDispatchToProps)(LoginFormComponent);