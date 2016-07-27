import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import NavLink from './NavLink.jsx'
import { browserHistory } from 'react-router'

class LoggedIn extends Component {
  render() {
    return (
      <li><NavLink to="/login">Login</NavLink></li>
    )
  }
}
class LoggedOut extends Component {
  render() {
    return (
      <div>
        {(() => {
          switch (this.props.type) {
            case "Doctor": return <li><NavLink to="/doctor">Doctor</NavLink></li>
            case "Patient": return <li><NavLink to="/patient">Patient</NavLink></li>
            default: return ""
          }
        })()}
        <li><NavLink to="/" onClick={this.props.logUser}>Logout</NavLink></li>
      </div>
    )
  }
}


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logoutButton: false,
      type: ''
    }
    this.logUserOut = this.logUserOut.bind(this)
    this.logUserIn = this.logUserIn.bind(this)
  }
  logUserOut() {
    $.ajax({
      type: "GET",
      url: "/logout",
      success: (userData) => {
        if (userData.loggedIn === false) {
          this.setState({logoutButton: false})
        }
      }
    })
  }
  logUserIn(type) {
    this.setState({
      logoutButton: true,
      type: type
    })
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        if (userData.loggedIn) {
          this.setState({
            logoutButton: true,
            type: userData.type
          })
        } else {
          this.setState({
            logoutButton: false,
            type: ''
          })
        }
      }
    })
  }
  render() {
    let loggedButton = this.state.logoutButton ? <LoggedOut type={this.state.type} logUser={this.logUserOut} /> : <LoggedIn />
    return (
      <DocumentTitle title="Application - Home">
        <div>
          <header>
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Application</Link>
                <a href="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                  {loggedButton}
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  {loggedButton}
                </ul>
              </div>
            </nav>
          </header>
          <main>
            <br />
            <div className="container">
              {React.cloneElement(this.props.children, {logUserIn: this.logUserIn}) || <Home />}
            </div>
          </main>
        </div>
      </DocumentTitle>
    );
  }
}

