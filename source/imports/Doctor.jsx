import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'

export default class Doctor extends Component {
  render() {
    return (
      <DocumentTitle title="Tempus - Doctor">
        <div>
          <h1>Hello Doctor!</h1>
        </div>
      </DocumentTitle>
    )
  }
}
