import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

class Message extends Component {
  render() {
    return (
      <div>Your password or username is incorrect</div>
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
  handleSubmit(e) {
    this.setState({ failedLogin: false });
    e.preventDefault();
    let username = ReactDOM.findDOMNode(this.refs.usernameInput).value.trim()
    let password = ReactDOM.findDOMNode(this.refs.passwordInput).value.trim()
    var data = {
      username: username,
      password: password

    }
    $.ajax({
      type: "POST",
      url: "/login",
      data: data,
      success: (myData) => {
        if (myData.failedLogin) {
          this.setState({ failedLogin: true })
          console.log(this.state)
        } else {
          console.log(myData)
          browserHistory.push('/')
        }
      }
    })
    ReactDOM.findDOMNode(this.refs.usernameInput).value = ''
    ReactDOM.findDOMNode(this.refs.passwordInput).value = ''
  }
  render() {
    var failureMessage
    if (this.state.failedLogin) {
      failureMessage = <Message />
    } else {
      failureMessage = '';
    }
    return (
      <DocumentTitle title="Tempus - Login">
        <div className="row">
          <h1>Please Login</h1>
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
            <div className="row">
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit
              </button>
            </div>
          </form>
        </div>
      </DocumentTitle>
    )
  }
}
