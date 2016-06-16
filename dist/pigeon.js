/*!
 *  @name           pigeonjs
 *  @description    This is an in-memory message bus. Very slim and fast
 * 
 *  @version        0.0.6
 *  @author         gery.hirschfeld@w3tec.ch
 *  @license        MIT
 * 
 */
var pigeon =
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

	/// <reference path="./lib/pigeon.d.ts"/>
	"use strict";
	var pigeon_ts_1 = __webpack_require__(2);
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = new pigeon_ts_1.default();


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
	        this.channels = {};
	    }
	    Pigeon.prototype.has = function (channelName) {
	        return !!this.channels[channelName];
	    };
	    Pigeon.prototype.channel = function (name) {
	        return !this.has(name) && (this.channels[name] = new channel_ts_1.default(name)) && this.channels[name] || this.channels[name];
	    };
	    Pigeon.prototype.remove = function (channelName) {
	        delete this.channels[channelName];
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
	        this.name = name;
	        this.callbacks = {};
	    }
	    Object.defineProperty(PigeonChannel.prototype, "subscribers", {
	        get: function () {
	            return this.callbacks;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PigeonChannel.prototype.subscribe = function (item) {
	        var _this = this;
	        return function (callback) {
	            var callbacks = _this.callbacks[item] || (_this.callbacks[item] = []);
	            callbacks.push(callback);
	            // Disposer function
	            return function () {
	                var idx = callbacks.indexOf(callback);
	                if (idx >= 0) {
	                    callbacks.splice(idx, 1);
	                }
	                if (callbacks.length === 0) {
	                    delete _this.callbacks[item];
	                }
	                return idx >= 0;
	            };
	        };
	    };
	    PigeonChannel.prototype.publish = function (item) {
	        var _this = this;
	        return function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i - 0] = arguments[_i];
	            }
	            var callbacks = _this.callbacks[item] || [];
	            var size = callbacks.length;
	            callbacks.forEach(function (cb) { return cb.apply(void 0, args); });
	            return size < callbacks.length;
	        };
	    };
	    return PigeonChannel;
	}());
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PigeonChannel;


/***/ }
/******/ ]);
//# sourceMappingURL=pigeon.map