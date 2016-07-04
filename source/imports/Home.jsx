import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'


export default class Home extends Component {
  render() {
    return (
      <DocumentTitle title="Tempus - Home">
        <div>
          <h1>Hello World</h1>
        </div>
      </DocumentTitle>
    )
  }
}
