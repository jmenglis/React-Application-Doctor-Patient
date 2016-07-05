import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import NavLink from './NavLink.jsx'

class LoggedIn extends Component {
  render () {
    return (
      <li><NavLink to="/Login">Login</NavLink></li>
    )
  }
}
class LoggedOut extends Component {
  render () {
    return (
      <li><NavLink to="/Logout">Logout</NavLink></li>
    )
  }
}


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logoutButton: false
    }
  }
  componentDidMount() {
    $.ajax({
      type: "GET",
      url: "/authorized",
      success: (userData) => {
        if (userData.loggedIn) {
          this.setState({logoutButton: true})
        } else {
          this.setState({logoutButton: false})
        }
      }
    })
  }
  render() {
    var loggedButton = this.state.logoutButton ? <LoggedOut /> : <LoggedIn />
    return (
      <DocumentTitle title="Tempus - Home">
        <div>
          <header>
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Tempus</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  {loggedButton}
                </ul>
              </div>
            </nav>
          </header>
          <main>
            <br />
            <div className="container">
              {this.props.children || <Home/>}
            </div>
          </main>
          {/* <footer className="page-footer">
            <div className="footer-copyright">
              <div className="container">
              © 2016 Josh English
              </div>
            </div>
          </footer>
          */}
        </div>
      </DocumentTitle>
    );
  }
}

