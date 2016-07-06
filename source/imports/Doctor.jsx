import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

class PatientInfo extends Component {
  // componentDidMount() {
  //   $.ajax({
  //     type: "GET"
  //     url: "/patientinfo"
  //     success: (patientData) => {
  //       console.log(patientData)
  //     }
  //   })
  // }
  render() {
    return (
      <ul>
      <li>Name:</li>
      <li>Address:</li>
      <li>Phone:</li>
      </ul>
    )
  }
}


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
          <PatientInfo />
        </div>
      </DocumentTitle>
    )
  }
}
