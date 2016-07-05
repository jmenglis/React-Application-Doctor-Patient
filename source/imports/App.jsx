import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import DocumentTitle from 'react-document-title'
import NavLink from './NavLink.jsx'

export default class App extends Component {
  render() {
    return (
      <DocumentTitle title="Tempus - Home">
        <div>
          <header>
            <nav>
              <div className="nav-wrapper">
                <Link to="/" className="brand-logo">Tempus</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                  <li><NavLink to="/Login">Login</NavLink></li>
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

