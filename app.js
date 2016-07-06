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

	var _bodyParser = __webpack_require__(5);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _cookieSession = __webpack_require__(6);

	var _cookieSession2 = _interopRequireDefault(_cookieSession);

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(8);

	var _reactRouter = __webpack_require__(9);

	var _compression = __webpack_require__(10);

	var _compression2 = _interopRequireDefault(_compression);

	var _routes = __webpack_require__(11);

	var _routes2 = _interopRequireDefault(_routes);

	var _schema = __webpack_require__(20);

	var _schema2 = _interopRequireDefault(_schema);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	__webpack_require__(22).config();


	__webpack_require__(23);

	var app = (0, _express2.default)();
	app.use((0, _compression2.default)());

	//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
	app.use((0, _morgan2.default)('dev'));
	app.use((0, _cookieSession2.default)({
	  name: "Tempted",
	  keys: ['key12345678'],
	  maxAge: 180000
	}));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));
	app.use(__webpack_require__(24)({
	  src: _path2.default.join(__dirname, 'public'),
	  dest: _path2.default.join(__dirname, 'public'),
	  sourceMap: true
	}));
	app.use(_express2.default.static(_path2.default.join(__dirname, 'public'), { index: false }));

	app.post('/login', function (req, res) {
	  var userInfo = {
	    username: req.body.username,
	    password: req.body.password
	  };
	  _schema2.default.User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
	    if (user) {
	      req.session.username = user.username;
	      req.session.loggedIn = true;
	      req.session.type = user.type;
	      res.json({
	        failedLogin: false,
	        username: user.username,
	        type: user.type
	      });
	    } else {
	      res.json({ failedLogin: true });
	    }
	  });
	});

	app.get('/authorized', function (req, res) {
	  if (req.session.loggedIn === true) {
	    res.json({
	      loggedIn: true,
	      type: req.session.type
	    });
	  } else {
	    res.json({
	      loggedIn: false,
	      type: req.session.type
	    });
	  }
	});

	app.get('/logout', function (req, res) {
	  req.session = null;
	  console.log(req.session);
	  res.json({
	    loggedIn: false
	  });
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
	  return '\n    <!doctype html public="storage">\n    <html>\n    <meta charset=utf-8/>\n    <title>Tempus - Home</title>\n    <link rel="stylesheet" href="/stylesheets/style.css" />\n    <div id=react-render>' + appHtml + '</div>\n    <script src="/javascripts/jquery-3.0.0.js"></script>\n    <script src="/javascripts/materialize.js"></script>\n    <script src="/javascripts/main.js"></script>\n   ';
	}

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

	module.exports = require("body-parser");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("cookie-session");

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
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactRouter = __webpack_require__(9);

	var _App = __webpack_require__(12);

	var _App2 = _interopRequireDefault(_App);

	var _Home = __webpack_require__(16);

	var _Home2 = _interopRequireDefault(_Home);

	var _Login = __webpack_require__(17);

	var _Login2 = _interopRequireDefault(_Login);

	var _Doctor = __webpack_require__(18);

	var _Doctor2 = _interopRequireDefault(_Doctor);

	var _Patient = __webpack_require__(19);

	var _Patient2 = _interopRequireDefault(_Patient);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	module.exports = _react2.default.createElement(
	  _reactRouter.Route,
	  { path: '/', component: _App2.default },
	  _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/login', component: _Login2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/doctor', component: _Doctor2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/patient', component: _Patient2.default })
	);

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactRouter = __webpack_require__(9);

	var _reactDocumentTitle = __webpack_require__(14);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _NavLink = __webpack_require__(15);

	var _NavLink2 = _interopRequireDefault(_NavLink);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoggedIn = function (_Component) {
	  _inherits(LoggedIn, _Component);

	  function LoggedIn() {
	    _classCallCheck(this, LoggedIn);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoggedIn).apply(this, arguments));
	  }

	  _createClass(LoggedIn, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'li',
	        null,
	        _react2.default.createElement(
	          _NavLink2.default,
	          { to: '/login' },
	          'Login'
	        )
	      );
	    }
	  }]);

	  return LoggedIn;
	}(_react.Component);

	var LoggedOut = function (_Component2) {
	  _inherits(LoggedOut, _Component2);

	  function LoggedOut() {
	    _classCallCheck(this, LoggedOut);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(LoggedOut).apply(this, arguments));
	  }

	  _createClass(LoggedOut, [{
	    key: 'render',
	    value: function render() {
	      var _this3 = this;

	      return _react2.default.createElement(
	        'div',
	        null,
	        function () {
	          switch (_this3.props.type) {
	            case "Doctor":
	              return _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/doctor' },
	                  'Doctor'
	                )
	              );
	            case "Patient":
	              return _react2.default.createElement(
	                'li',
	                null,
	                _react2.default.createElement(
	                  _NavLink2.default,
	                  { to: '/patient' },
	                  'Patient'
	                )
	              );
	            default:
	              return "";
	          }
	        }(),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _NavLink2.default,
	            { to: '/', onClick: this.props.logUser },
	            'Logout'
	          )
	        )
	      );
	    }
	  }]);

	  return LoggedOut;
	}(_react.Component);

	var App = function (_Component3) {
	  _inherits(App, _Component3);

	  function App(props) {
	    _classCallCheck(this, App);

	    var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	    _this4.state = {
	      logoutButton: false,
	      type: ''
	    };
	    _this4.logUserOut = _this4.logUserOut.bind(_this4);
	    _this4.logUserIn = _this4.logUserIn.bind(_this4);
	    return _this4;
	  }

	  _createClass(App, [{
	    key: 'logUserOut',
	    value: function logUserOut() {
	      var _this5 = this;

	      $.ajax({
	        type: "GET",
	        url: "/logout",
	        success: function success(userData) {
	          if (userData.loggedIn === false) {
	            _this5.setState({ logoutButton: false });
	          }
	        }
	      });
	    }
	  }, {
	    key: 'logUserIn',
	    value: function logUserIn(type) {
	      this.setState({
	        logoutButton: true,
	        type: type
	      });
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this6 = this;

	      $.ajax({
	        type: "GET",
	        url: "/authorized",
	        success: function success(userData) {
	          if (userData.loggedIn) {
	            _this6.setState({
	              logoutButton: true,
	              type: userData.type
	            });
	          } else {
	            _this6.setState({
	              logoutButton: false,
	              type: ''
	            });
	          }
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var loggedButton = this.state.logoutButton ? _react2.default.createElement(LoggedOut, { type: this.state.type, logUser: this.logUserOut }) : _react2.default.createElement(LoggedIn, null);
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
	                  loggedButton
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
	              _react2.default.cloneElement(this.props.children, { logUserIn: this.logUserIn }) || _react2.default.createElement(Home, null)
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
/* 13 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("react-document-title");

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(14);

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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(14);

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
	          if (userData.loggedIn) {
	            if (userData.type === "Doctor") {
	              _reactRouter.browserHistory.push('/doctor');
	            } else {
	              _reactRouter.browserHistory.push('/patient');
	            }
	          }
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
	          } else {
	            if (userData.type === "Doctor") {
	              _this3.props.logUserIn(userData.type);
	              _reactRouter.browserHistory.push('/doctor');
	            } else {
	              _this3.props.logUserIn(userData.type);
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(14);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _reactRouter = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Doctor = function (_Component) {
	  _inherits(Doctor, _Component);

	  function Doctor() {
	    _classCallCheck(this, Doctor);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Doctor).apply(this, arguments));
	  }

	  _createClass(Doctor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $.ajax({
	        type: "GET",
	        url: "/authorized",
	        success: function success(userData) {
	          if (userData.loggedIn === false) {
	            _reactRouter.browserHistory.push('/');
	          } else if (userData.type === "Patient") {
	            _reactRouter.browserHistory.push('/patient');
	          }
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactDocumentTitle2.default,
	        { title: 'Tempus - Doctor' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h1',
	            null,
	            'Hello Doctor'
	          )
	        )
	      );
	    }
	  }]);

	  return Doctor;
	}(_react.Component);

	exports.default = Doctor;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(7);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(13);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _reactDocumentTitle = __webpack_require__(14);

	var _reactDocumentTitle2 = _interopRequireDefault(_reactDocumentTitle);

	var _reactRouter = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Patient = function (_Component) {
	  _inherits(Patient, _Component);

	  function Patient() {
	    _classCallCheck(this, Patient);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Patient).apply(this, arguments));
	  }

	  _createClass(Patient, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      $.ajax({
	        type: "GET",
	        url: "/authorized",
	        success: function success(userData) {
	          if (userData.loggedIn === false) {
	            _reactRouter.browserHistory.push('/');
	          } else if (userData.type === "Doctor") {
	            _reactRouter.browserHistory.push('/doctor');
	          }
	        }
	      });
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        _reactDocumentTitle2.default,
	        { title: 'Tempus - Patient' },
	        _react2.default.createElement(
	          'div',
	          null,
	          _react2.default.createElement(
	            'h1',
	            null,
	            'Hello Patient'
	          )
	        )
	      );
	    }
	  }]);

	  return Patient;
	}(_react.Component);

	exports.default = Patient;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(21);

	// userSchema

	var userSchema = new mongoose.Schema({
	  type: String,
	  username: String,
	  password: String
	});

	var User = mongoose.model('User', userSchema);

	var patientSchema = new mongoose.Schema({
	  name: String,
	  age: Number,
	  address: String
	});

	var Patient = mongoose.model('Patient', patientSchema);

	var fileSchema = new mongoose.Schema({
	  username: String,
	  file: []
	});

	var File = mongoose.model('File', fileSchema);

	module.exports = {
	  User: User,
	  Patient: Patient,
	  File: File
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mongoose = __webpack_require__(21);

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
/* 24 */
/***/ function(module, exports) {

	module.exports = require("node-sass-middleware");

/***/ }
/******/ ]);