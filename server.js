require('dotenv').config();
import express from 'express'
import path from 'path'
// import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import compression from 'compression'
import routes from './source/imports/routes.jsx'
import DBSchema from './models/schema'

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
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}))
app.use(express.static(path.join(__dirname, 'public'), {index: false}))

app.get('/patientinfo', (req,res) => {
  DBSchema.Patient.count().exec( (err, count) => {
    let random = Math.floor(Math.random() * count)
    DBSchema.Patient.findOne().skip(random).exec( (err, patient) => {
      res.json({
        name: patient.name,
        age: patient.age,
        address: patient.address
      })
    })
  })
})

app.post('/upload', (req, res) => {
  res.send("Done");
  let data = {
    username: req.body.username,
    filename: req.body.filename,
    file: req.body.payload,
  }
  DBSchema.File.create(data), (err, results) => {
  }
})

app.post('/results', (req, res) => {
  DBSchema.File.find({username: req.body.username}, (err, results) => {
    res.json(results)
  })
})

app.post('/login', (req, res) => {
  let userInfo = {
    username: req.body.username,
    password: req.body.password
  }
  DBSchema.User.findOne({username: req.body.username, password: req.body.password}, (err, user) => {
    if (user) {
      req.session.username = user.username
      req.session.loggedIn = true
      req.session.type = user.type
      res.json({
        failedLogin:false,
        username: user.username,
        type: user.type
      })
    } else {
      res.json({failedLogin:true})
    }
  })
})

app.get('/authorized', (req, res) => {
  if (req.session.loggedIn === true) {
     res.json({
      username: req.session.username,
      loggedIn: true,
      type: req.session.type
     })
  } else {
    res.json({
      username: null,
      loggedIn: false,
      type: null
    })
  }
})

app.get('/logout', (req, res) => {
  req.session = null
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
    <title>Application - Home</title>
    <link href="http://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="/stylesheets/style.css" />
    <div id=react-render>${appHtml}</div>
    <script src="/javascripts/jquery-3.0.0.js"></script>
    <script src="/javascripts/materialize.js"></script>
    <script src="/javascripts/main.js"></script>
   `
}


var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production server is running at localhost:' + PORT)
})


module.exports = app
