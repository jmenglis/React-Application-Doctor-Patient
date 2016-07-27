import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

class PatientInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      age: '',
      address: ''
    }
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/patientinfo",
      success: (patientData) => {
        this.setState({
          name: patientData.name,
          age: patientData.age,
          address: patientData.address
        })
      }
    })
  }
  render() {
    return (
      <ul>
      <li><strong>Name:</strong> {this.state.name}</li>
      <li><strong>Age:</strong> {this.state.age}</li>
      <li><strong>Address:</strong> {this.state.address}</li>
      </ul>
    )
  }
}


export default class Doctor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
    }
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        this.setState({ username: userData.username})
        if (userData.loggedIn === false) {
          browserHistory.push('/login')
        } else if (userData.type === "Patient") {
          browserHistory.push('/patient')
        }
      }
    })
  }
  render() {
    return (
      <DocumentTitle title="Application - Doctor">
        <div>
          <h2 className="center-align">Welcome Back {this.state.username}</h2>
          <p>Here is some random patient info:</p>
          <PatientInfo />
        </div>
      </DocumentTitle>
    )
  }
}
