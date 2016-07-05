/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(1);

	var _express2 = _interopRequireDefault(_express);

	var _path = __webpack_require__(2);

	var _path2 = _interopRequireDefault(_path);

	var _serveFavicon = __webpack_require__(3);

	var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

	var _morgan = __webpack_require__(4);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _cookieParser = __webpack_require__(5);

	var _cookieParser2 = _interopRequireDefault(_cookieParser);

	var _bodyParser = __webpack_require__(6);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _reactRouter = __webpack_require__(9);

	var _routes = __webpack_require__(10);

	var _routes2 = _interopRequireDefault(_routes);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(17).config();


	__webpack_require__(18);

	var app = (0, _express2.default)();

	// view engine setup
	app.engine('html', __webpack_require__(20).renderFile);
	app.set('views', _path2.default.join(__dirname, 'views'));
	app.set('view engine', 'html');

	// uncomment after placing your favicon in /public
	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use((0, _cookieParser2.default)());
	app.use(__webpack_require__(21)({
	  src: _path2.default.join(__dirname, 'public'),
	  dest: _path2.default.join(__dirname, 'public'),
	  sourceMap: true
	}));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));

	app.post('/login', function (req, res) {
	  if (req.body.username === "Testing" && req.body.password === "1234") {
	    res.json({
	      failedLogin: false,
	      username: "Testing",
	      type: "Doctor"
	    });
	  } else if (req.body.username === "Testing2" && req.body.password === "1234") {
	    res.json({
	      failedLogin: false,
	      username: "Testing2",
	      type: "Patient"
	    });
	  } else {
	    res.json({ failedLogin: true });
	  }
	});

	app.get('/authorized', function (req, res) {
	  console.log("Received Hit");
	});

	app.get('*', function (req, res) {
	  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (err, redirect, props) {
	    if (err) {
	      res.status(500).send(err.message);
	    } else if (redirect) {
	      res.redirect(redirect.pathname + redirect.search);
	    } else if (props) {
	      var appHtml = (0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, props));
	      res.send(renderPage(appHtml));
	    } else {
	      res.status(404).send('Not Found');
	    }
	  });
	});

	function renderPage(appHtml) {
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Tempus - Home</title>\n    <link rel="stylesheet" href="/stylesheets/style.css" />\n    <div id=react-render>' + appHtml + '</div>\n    <script src="/javascripts/jquery-3.0.0.js"></script>\n    <script src="/javascripts/materialize.js"></script>\n    <script src="/javascripts/main.jsx"></script>\n   ';
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

	var PORT = process.env.PORT || 3000;
	app.listen(PORT, function () {
	  console.log('Production Express server running at localhost:' + PORT);
	});

	module.exports = app;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("serve-favicon");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("cookie-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	var _App = __webpack_require__(11);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(15);

	var _Home2 = _interopRequireDefault(_Home);

	var _Login = __webpack_require__(16);

	var _Login2 = _interopRequireDefault(_Login);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/Login', component: _Login2.default })
	);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(12);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(9);

	var _reactDocumentTitle = __webpack_require__(13);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _NavLink = __webpack_require__(14);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	  _inherits(App, _Component);

	  function App() {
	    _classCallCheck(this, App);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	  }

	  _createClass(App, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactDocumentTitle2.default,
	        { title: 'Tempus - Home' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'header',
	            null,
	            _react2.default.createElement(
	              'nav',
	              null,
	              _react2.default.createElement(
	                'div',
	                { className: 'nav-wrapper' },
	                _react2.default.createElement(
	                  _reactRouter.Link,
	                  { to: '/', className: 'brand-logo' },
	                  'Tempus'
	                ),
	                _react2.default.createElement(
	                  'ul',
	                  { id: 'nav-mobile', className: 'right hide-on-med-and-down' },
	                  _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(
	                      _NavLink2.default,
	                      { to: '/Login' },
	                      'Login'
	                    )
	                  )
	                )
	              )
	            )
	          ),
	          _react2.default.createElement(
	            'main',
	            null,
	            _react2.default.createElement('br', null),
	            _react2.default.createElement(
	              'div',
	              { className: 'container' },
	              this.props.children || _react2.default.createElement(Home, null)
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return App;
	}(_react.Component);

	exports.default = App;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-document-title");

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NavLink = function (_Component) {
	  _inherits(NavLink, _Component);

	  function NavLink() {
	    _classCallCheck(this, NavLink);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(NavLink).apply(this, arguments));
	  }

	  _createClass(NavLink, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(_reactRouter.Link, _extends({}, this.props, { activeClassName: 'active' }));
	    }
	  }]);

	  return NavLink;
	}(_react.Component);

	exports.default = NavLink;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(12);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(13);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Home = function (_Component) {
	  _inherits(Home, _Component);

	  function Home() {
	    _classCallCheck(this, Home);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Home).apply(this, arguments));
	  }

	  _createClass(Home, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactDocumentTitle2.default,
	        { title: 'Tempus - Home' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h1',
	            null,
	            'Hello World'
	          )
	        )
	      );
	    }
	  }]);

	  return Home;
	}(_react.Component);

	exports.default = Home;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(12);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(13);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _reactRouter = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Message = function (_Component) {
	  _inherits(Message, _Component);

	  function Message() {
	    _classCallCheck(this, Message);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Message).apply(this, arguments));
	  }

	  _createClass(Message, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        null,
	        'Your password or username is incorrect'
	      );
	    }
	  }]);

	  return Message;
	}(_react.Component);

	var Login = function (_Component2) {
	  _inherits(Login, _Component2);

	  function Login(props) {
	    _classCallCheck(this, Login);

	    var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(Login).call(this, props));

	    _this2.state = {
	      failedLogin: false
	    };
	    return _this2;
	  }

	  _createClass(Login, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $.ajax({
	        type: "GET",
	        url: "/authorized",
	        success: function success(userData) {
	          if (userData) {
	            if (userData.type === "Doctor") {
	              _reactRouter.browserHistory.push('/doctor');
	            } else {
	              _reactRouter.browserHistory.push('/patient');
	            }
	          }
	          console.log("Good to Go");
	        }
	      });
	    }
	  }, {
	    key: 'handleSubmit',
	    value: function handleSubmit(e) {
	      var _this3 = this;

	      this.setState({ failedLogin: false });
	      e.preventDefault();
	      var data = {
	        username: _reactDom2.default.findDOMNode(this.refs.usernameInput).value.trim(),
	        password: _reactDom2.default.findDOMNode(this.refs.passwordInput).value.trim()
	      };
	      $.ajax({
	        type: "POST",
	        url: "/login",
	        data: data,
	        success: function success(userData) {
	          if (userData.failedLogin) {
	            _this3.setState({ failedLogin: true });
	            console.log(_this3.state);
	          } else {
	            if (userData.type === "Doctor") {
	              _reactRouter.browserHistory.push('/doctor');
	            } else {
	              _reactRouter.browserHistory.push('/patient');
	            }
	          }
	        }
	      });
	      _reactDom2.default.findDOMNode(this.refs.usernameInput).value = '';
	      _reactDom2.default.findDOMNode(this.refs.passwordInput).value = '';
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var failureMessage = this.state.failedLogin ? _react2.default.createElement(Message, null) : '';
	      return _react2.default.createElement(
	        _reactDocumentTitle2.default,
	        { title: 'Tempus - Login' },
	        _react2.default.createElement(
	          'div',
	          { className: 'row' },
	          _react2.default.createElement(
	            'h1',
	            null,
	            'Please Login'
	          ),
	          failureMessage,
	          _react2.default.createElement(
	            'form',
	            { className: 'col s12', onSubmit: this.handleSubmit.bind(this) },
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'div',
	                { className: 'input-field col s6' },
	                _react2.default.createElement('input', { ref: 'usernameInput', id: 'username', type: 'text', className: 'validate' }),
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'username' },
	                  'Username'
	                )
	              ),
	              _react2.default.createElement(
	                'div',
	                { className: 'input-field col s6' },
	                _react2.default.createElement('input', { ref: 'passwordInput', id: 'password', type: 'password', className: 'validate' }),
	                _react2.default.createElement(
	                  'label',
	                  { htmlFor: 'password' },
	                  'Password'
	                )
	              )
	            ),
	            _react2.default.createElement(
	              'div',
	              { className: 'row' },
	              _react2.default.createElement(
	                'button',
	                { className: 'btn waves-effect waves-light', type: 'submit', name: 'action' },
	                'Submit'
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Login;
	}(_react.Component);

	exports.default = Login;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(19);

	// connect us to the database.

	var connectionString = process.env.DB;
	console.log('Attempting to Connect to MongoDB');
	mongoose.connect(connectionString);

	mongoose.connection.on('connected', function () {
	  console.log('Mongoose connected to: ' + process.env.DB);
	});

	mongoose.connection.on('error', function (error) {
	  console.log('Mongoose error!' + error);
	});

	mongoose.connection.on('disconnected', function () {
	  console.log('Mongoose disconnected from: ' + process.env.DB);
	});

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("ejs");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("node-sass-middleware");

/***/ }
/******/ ]);