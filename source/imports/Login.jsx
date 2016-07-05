import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'

export default class Login extends Component {

  render() {
    return (
      <DocumentTitle title="Tempus - Login">
        <div className="row">
          <h1>Please Login</h1>
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div class="row">
              <div className="input-field col s6">
                <input id="username" type="text" className="validate" />
                <label for="username">Username</label>
              </div>
              <div className="input-field col s6">
                <input id="password" type="password" className="validate" />
                <label for="password">Password</label>
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
