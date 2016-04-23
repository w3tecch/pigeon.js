/*
 * event-bus 1.0.0
 * 
 * 
 *
 * Copyright 2015, gery.hirschfeld@w3tec.ch
 * Released under the MIT license.
*/

"use strict";
/**
 * This is the EventBus service. This service isn't bound to the NG dependency/injection system
 *
 * @export
 * @class EventBus
 */
var EventBus = (function () {
    /**
     * Creates an instance of EventBus.
     */
    function EventBus() {
        this._callbacks = {};
    }
    /**
     * Returns a list off all currently registerd callbacks
     *
     * @returns {{ [event: string]: IEventBusCallback[] }}
     */
    EventBus.prototype.list = function () {
        return this._callbacks;
    };
    /**
     * Let's you publishes an event to a specific channel
     *
     * @param {string} channel
     * @returns {(...args) => boolean}
     */
    EventBus.prototype.publish = function (channel) {
        var _this = this;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            var callbacks = _this._callbacks[channel] || [];
            var size = callbacks.length;
            callbacks.forEach(function (cb) { return cb.apply(void 0, args); });
            return size < callbacks.length;
        };
    };
    /**
     * Let's you subscribe to a specific channel
     *
     * @param {string} channel
     * @returns {(callback: IEventBusCallback) => () => boolean}
     */
    EventBus.prototype.subscribe = function (channel) {
        var _this = this;
        return function (callback) {
            var callbacks = _this._callbacks[channel] || (_this._callbacks[channel] = []);
            callbacks.push(callback);
            // destroy function
            return function () {
                var idx = callbacks.indexOf(callback);
                if (idx >= 0) {
                    callbacks.splice(idx, 1);
                }
                if (callbacks.length === 0) {
                    delete _this._callbacks[channel];
                }
                return idx >= 0;
            };
        };
    };
    return EventBus;
}());
exports.EventBus = EventBus;
/**
 * Export the Service
 */
exports.eventBusService = new EventBus();

//# sourceMappingURL=event-bus.js.map
