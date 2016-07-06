import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'


export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Tempus - Home">
        <div>
          <h2 className="centerize">Templus Challenge Application</h2>
          <p>In order to login to this application please use the following credentials:</p>
          <ul className="listStyleCirc">
            <li><strong>Username:</strong> TempusDoc | <strong>Password:</strong> Tempus1234</li>
            <li><strong>Username:</strong> TempusPat | <strong>Password:</strong> Tempus1234</li>
          </ul>
          <p>Once logged in you will be directed to the appropriate page based on login information</p>
        </div>
      </DocumentTitle>
    )
  }
}
