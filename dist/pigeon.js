/*!
 *  @name           pigeonjs
 *  @description    
 * 
 *  @version        0.0.0
 *  @author         gery.hirschfeld@w3tec.ch
 *  @license        MIT
 * 
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="pigeon.d.ts"/>
	"use strict";
	var pigeon_ts_1 = __webpack_require__(2);
	exports.pigeon = pigeon_ts_1.default;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * @name Pigeon
	 * @description
	 * TODO
	 */
	var channel_ts_1 = __webpack_require__(3);
	var Pigeon = (function () {
	    function Pigeon() {
	    }
	    Pigeon.channel = function (name) {
	        return new channel_ts_1.default(name);
	    };
	    return Pigeon;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Pigeon;


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @name PigeonChannel
	 * @description
	 * TODO
	 */
	var PigeonChannel = (function () {
	    function PigeonChannel(name) {
	        this.name = '';
	        this.callbacks = {};
	        this.name = name;
	    }
	    PigeonChannel.prototype.list = function () {
	        return this.callbacks;
	    };
	    PigeonChannel.prototype.publish = function (channel) {
	        var _this = this;
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var callbacks = _this.callbacks[channel] || [];
	            var size = callbacks.length;
	            callbacks.forEach(function (cb) { return cb.apply(void 0, args); });
	            return size < callbacks.length;
	        };
	    };
	    PigeonChannel.prototype.subscribe = function (channel) {
	        var _this = this;
	        return function (callback) {
	            var callbacks = _this.callbacks[channel] || (_this.callbacks[channel] = []);
	            callbacks.push(callback);
	            // destroy function
	            return function () {
	                var idx = callbacks.indexOf(callback);
	                if (idx >= 0) {
	                    callbacks.splice(idx, 1);
	                }
	                if (callbacks.length === 0) {
	                    delete _this.callbacks[channel];
	                }
	                return idx >= 0;
	            };
	        };
	    };
	    return PigeonChannel;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PigeonChannel;


/***/ }
/******/ ]);
//# sourceMappingURL=pigeon.map