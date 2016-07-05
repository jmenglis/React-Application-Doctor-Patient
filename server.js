require('dotenv').config();
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'
import bodyParser from 'body-parser'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import session from 'express-session'
import routes from './source/imports/routes.jsx'


require('./db/database')

var app = express()

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
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
    res.json({
      failedLogin:false,
      username: "Testing",
      type: "Doctor"
    })
  } else if (req.body.username === "Testing2" && req.body.password === "1234") {
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
    <script src="/javascripts/main.jsx"></script>
   `
}

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

var PORT = process.env.PORT || 3000
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})


module.exports = app
