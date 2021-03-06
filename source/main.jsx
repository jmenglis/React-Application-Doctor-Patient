import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import routes from './imports/routes.jsx'

render(<Router routes={routes} history={browserHistory} />, document.getElementById('react-render'))

$(document).ready(() => {
  $(".button-collapse").sideNav();
})
