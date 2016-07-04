import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from './App.jsx'
import Home from './Home.jsx'
import Patient from './Patient.jsx'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/patient" component={Patient} />
  </Route>
)
