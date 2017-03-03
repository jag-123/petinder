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
/******/ 	__webpack_require__.p = "/scripts";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var HelloWorld = React.createClass({
	  displayName: 'HelloWorld',


	  getInitialState: function getInitialState() {
	    return {
	      h1Text: ''
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    $.ajax({
	      url: '/api/',
	      dataType: 'json',
	      cache: false,
	      type: 'GET',
	      success: function (data) {
	        //data from res.json in routes/index.js is {text: "HelloWorld"}, so we want to access the text field of data
	        this.setState({
	          h1Text: data.text
	        });
	      }.bind(this),
	      failure: function (xhr, status, err) {
	        console.error('GET /api', status, err.toString());
	      }.bind(this)
	    });
	  },

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        this.state.h1Text
	      ),
	      React.createElement(DankParagraph, { pText: this.state.h1Text })
	    );
	  }
	});

	var DankParagraph = React.createClass({
	  displayName: 'DankParagraph',

	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'p',
	        null,
	        ' ',
	        this.props.pText,
	        ' '
	      )
	    );
	  }
	});

	ReactDOM.render(React.createElement(HelloWorld, null), document.getElementById('content'));

/***/ }
/******/ ]);