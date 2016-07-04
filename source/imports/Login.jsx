import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'

export default class Patient extends Component {
  render() {
    return (
      <DocumentTitle title="Tempus - Patient">
        <div>
          <h1>Hello Patient!</h1>
        </div>
      </DocumentTitle>
    )
  }
}
