import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import NavLink from './NavLink.jsx'

export default class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo">Tempus</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li><NavLink to="/patient">Patient</NavLink></li>
              <li><NavLink to="/doctors">Doctors</NavLink></li>
            </ul>
          </div>
        </nav>
        <br />
        <div className="container">
          {this.props.children || <Home/>}
        </div>
      </div>
    );
  }
}

