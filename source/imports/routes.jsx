import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App.jsx'
import Home from './Home.jsx'
import Login from './Login.jsx'
import Doctor from './Doctor.jsx'
import Patient from './Patient.jsx'

module.exports = (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/doctor" component={Doctor} />
    <Route path="/patient" component={Patient} />

  </Route>
)
