import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

class Message extends Component {
  render() {
    return (
      <div className="card-panel">
        <span className="red-text">Your password or username is incorrect</span>
      </div>
    )
  }
}

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      failedLogin: false
    }
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        if (userData.loggedIn) {
          if (userData.type === "Doctor") {
            browserHistory.push('/doctor')
          } else {
            browserHistory.push('/patient')
          }
        }
      }
    })
  }
  handleSubmit(e) {
    this.setState({ failedLogin: false });
    e.preventDefault();
    let data = {
      username: ReactDOM.findDOMNode(this.refs.usernameInput).value.trim(),
      password: ReactDOM.findDOMNode(this.refs.passwordInput).value.trim()
    }
    $.ajax({
      type: "POST",
      url: "/login",
      data: data,
      success: (userData) => {
        if (userData.failedLogin) {
          this.setState({ failedLogin: true })
        } else {
          if (userData.type === "Doctor") {
            this.props.logUserIn(userData.type)
            browserHistory.push('/doctor')
          } else {
            this.props.logUserIn(userData.type)
            browserHistory.push('/patient')
          }
        }
      }
    })
    ReactDOM.findDOMNode(this.refs.usernameInput).value = ''
    ReactDOM.findDOMNode(this.refs.passwordInput).value = ''
  }
  render() {
    var failureMessage = this.state.failedLogin ? <Message /> : ''
    return (
      <DocumentTitle title="Application - Login">
        <div className="row">
          <h2 className="center-align">Please Login</h2>
          {failureMessage}
          <form className="col s12" onSubmit={this.handleSubmit.bind(this)}>
            <div className="row">
              <div className="input-field col s6">
                <input ref="usernameInput" id="username" type="text" className="validate" />
                <label htmlFor="username">Username</label>
              </div>
              <div className="input-field col s6">
                <input ref="passwordInput" id="password" type="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="row center-align">
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}
