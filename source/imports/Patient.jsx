import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import DocumentTitle from 'react-document-title'
import { browserHistory } from 'react-router'

class ListFiles extends Component {
  render() {
    return <li>{this.props.file}</li>
  }
}

class PatientForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filename: [],
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    let files = document.querySelector('input[type=file]').files
    var readURL = (file) => {
      let reader = new FileReader();
      let base64file;
      var p1 = new Promise((resolve, reject) => {
        reader.onload = function(e) {
          base64file = e.target.result
          resolve(base64file)
        }
      })
      p1.then((result) => {
        let combinedData = {
          username: this.props.username,
          filename: file.name,
          payload: result
        }
        $.ajax({
          url: '/upload',
          data: combinedData,
          type: 'POST',
          success: (upload) => {
            this.componentDidUpdate()
          }
        })
      })
      reader.readAsDataURL(file)
    }
    if (files) {
      [].forEach.call(files, readURL)
    }
  }
  componentDidUpdate() {
    $.ajax({
      url: '/results',
      type: 'POST',
      data: {username: this.props.username},
      success: (dbData) => {
        dbData.forEach((result, index) => {
          for (let key in result) {
            let indexOf = this.state.filename.indexOf(result['filename'])
            if (indexOf === -1) {
              this.setState({
                filename: this.state.filename.concat(result['filename'])
              })
            }
          }
        });
      }
    })
  }
  render() {
    return (
      <div>
        <div>Here are the files that are currently stored in the system:</div>
        <ul>
        {this.state.filename.map((file, i) => {
          return (
            <ListFiles key={i} file={file} />
          )
        })}
        </ul>
        <br />
        <br />
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" multiple />
            </div>
            <div className="file-path-wrapper">
              <input ref="valueBox" className="file-path validate" type="text" placeholder="Upload one or more files" />
            </div>
          </div>
          <div className="row centerize">
              <button className="btn waves-effect waves-light" type="submit" name="action">Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

export default class Patient extends Component {
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
          <h2>Welcome {this.state.username}</h2>
          <PatientForm username={this.state.username} />
        </div>
      </DocumentTitle>
    )
  }
}
