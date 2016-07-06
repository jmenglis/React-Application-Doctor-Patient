import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'


export default class Patient extends Component {
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        if (userData.loggedIn === false) {
          browserHistory.push('/')
        } else if (userData.type === "Doctor") {
          browserHistory.push('/doctor')
        }
      }
    })
  }
  render() {
    return (
      <DocumentTitle title="Tempus - Patient">
        <div>
          <h1>Hello Patient</h1>
        </div>
      </DocumentTitle>
    )
  }
}
