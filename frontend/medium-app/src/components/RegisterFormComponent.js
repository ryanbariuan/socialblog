import React from 'react';
import './css/ContentStyle.css';
import './css/RegisterFormComponent.css';
import axios from 'axios';


class RegisterFormComponent extends React.Component
{

  state = {
    username: '',
    password: '',
    confirmpw: '',
    email: '',
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
    const {username, password, confirmpw, email} = this.state;
    let isValid = true;
    const errors = {};

    if(username.trim() === "")
    {
      errors.usernameRequired = "Username must be filled out!";
      isValid = false;
    }
    if(password.trim() === "")
    {
      errors.passwordRequired = "Password must be filled out!";
      isValid = false;
    }
    if(confirmpw.trim() === "")
    {
      errors.confirmpwRequired = "Confirm Password must be filled out!";
      isValid = false;
    }
    if(email.trim() === "")
    {
      errors.emailRequired = "Email must be filled out!";
      isValid = false;
    }
    if(password !== confirmpw)
    {
      errors.notMatched = "Password did not match!";
      isValid = false;
    }

    this.setState({errors});
    return isValid;

  }

  register = () =>
  {
    const isValid = this.formValidation();
    if(isValid)
    {
      axios.post(`http://localhost:8080/register`, this.state).then(res =>{
        if(res.data.error)
        {
          // alert(res.data.error);
          this.setState({
            serverResponse: res.data.error
          })
        }
        else
        {
          // alert(`You have successfully registered an account`);
          this.setState({
            username: '',
            password: '',
            confirmpw: '',
            email: '',
            serverResponse: res.data.success
          });
        }
      });
    }
  }

  render(){

    let errorForm = this.state.errors;
    let response = this.state.serverResponse;

    return(
      <div className="container">
       <div className = "registerContainer">
          <h1 className = "h-style">Sign Up Account</h1>
          <div id = "registerForm" className = "flexBox-column-style">
            {
              response === 'You have successfully registered an account' ? 
              (
                <span className = "successMsg-style"><small>{response}</small></span>
              )
              :
              (
                <span className = "errorMsg-style"><small>{response}</small></span>
              )
            }
            <label className="label-style">Username</label>
            <input 
              type="text" 
              name="username" 
              placeholder="Username"
              value = {this.state.username}
              onChange = {
                this.onChangeForm
              } 
              className = "inputText-style"
            />
            {
              errorForm.usernameRequired ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.usernameRequired}</small></span>
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
            {
              errorForm.notMatched ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.notMatched}</small></span>
              )
              :
              ('')
            }
            <label className="label-style">Confirm Password</label>
            <input 
              type="password" 
              name="confirmpw" 
              placeholder="Retype Password"
              value = {this.state.confirmpw}
              onChange = {
                this.onChangeForm
              }   
              className = "inputText-style"
            />
            {
              errorForm.confirmpwRequired ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.passwordRequired}</small></span>
              )
              :
              ('')
            }
            {
              errorForm.notMatched ? 
              (
                <span className = "errorMsg-style"><small>{errorForm.notMatched}</small></span>
              )
              :
              ('')
            }
            <button 
              id = "signUpBtn" 
              className = "btn-style"
              onClick = {
                this.register
              }
            >
              Sign Up
            </button>
          </div>
          <p>
            Already have an account? <a href ="/login">Sign In</a>
          </p>
       </div>
      </div>
    );
  }
}

export default RegisterFormComponent;