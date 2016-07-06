import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'


export default class Doctor extends Component {
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        if (userData.loggedIn === false) {
          browserHistory.push('/')
        } else if (userData.type === "Patient") {
          browserHistory.push('/patient')
        }
      }
    })
  }
  render() {
    return (
      <DocumentTitle title="Tempus - Doctor">
        <div>
          <h1>Hello Doctor</h1>
        </div>
      </DocumentTitle>
    )
  }
}
