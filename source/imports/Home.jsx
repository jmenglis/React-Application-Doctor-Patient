import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'


export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Application - Home">
        <div>
          <h2 className="center-align">Doctor and Patient Application</h2>
          <p>In order to login to this application please use the following credentials:</p>
          <table>
            <thead>
              <tr>
                <th data-field="id">Username</th>
                <th data-field="password">Password</th>
                <th data-field="type">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Doc</td>
                <td>1234</td>
                <td>Doctor</td>
              </tr>
              <tr>
                <td>Pat</td>
                <td>1234</td>
                <td>Patient</td>
              </tr>
            </tbody>
          </table>
        </div>
      </DocumentTitle>
    )
  }
}
