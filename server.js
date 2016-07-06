require('dotenv').config();
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import compression from 'compression'
import routes from './source/imports/routes.jsx'


require('./db/database')

var app = express()
app.use(compression())

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cookieSession({
  name: "Tempted",
  keys: ['key12345678'],
  maxAge: 180000
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public'), {index: false}))

app.post('/login', (req, res) => {
  if (req.body.username === "Testing" && req.body.password === "1234") {
    req.session.username = req.body.username
    req.session.loggedIn = true
    req.session.type = "Doctor"
    res.json({
      failedLogin:false,
      username: "Testing",
      type: "Doctor"
    })
  } else if (req.body.username === "Testing2" && req.body.password === "1234") {
    req.session.username = req.body.username
    req.session.loggedIn = true
    req.session.type = "Patient"
    res.json({
      failedLogin:false,
      username: "Testing2",
      type: "Patient"
    })
  } else {
    res.json({failedLogin:true})
  }
})

app.get('/authorized', (req, res) => {
  if (req.session.loggedIn === true) {
     res.json({
       loggedIn: true,
       type: req.session.type
     })
  } else {
    res.json({
       loggedIn: false,
       type: req.session.type
    })
  }
})

app.get('/logout', (req, res) => {
  req.session = null
  console.log(req.session)
  res.json({
    loggedIn: false
  })
})

app.get('*', (req, res) => {
  match({ routes, location: req.url }, (err, redirect, props) => {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirect) {
      res.redirect(redirect.pathname + redirect.search)
    } else if (props) {
      const appHtml = renderToString(<RouterContext {...props}/>)
      res.send(renderPage(appHtml))
    } else {
      res.status(404).send('Not Found')
    }
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Tempus - Home</title>
    <link rel="stylesheet" href="/stylesheets/style.css" />
    <div id=react-render>${appHtml}</div>
    <script src="/javascripts/jquery-3.0.0.js"></script>
    <script src="/javascripts/materialize.js"></script>
    <script src="/javascripts/main.js"></script>
   `
}


var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})


module.exports = app
