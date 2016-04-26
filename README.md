[![npm version](https://badge.fury.io/js/pigeonjs.svg)](https://badge.fury.io/js/pigeonjs)
[![Build Status](https://travis-ci.org/w3tecch/pigeon.js.svg?branch=master)](https://travis-ci.org/w3tecch/pigeon.js)
[![Dependency Status](https://david-dm.org/w3tecch/pigeon.js.svg)](https://david-dm.org/w3tecch/pigeon.js)
[![devDependency Status](https://david-dm.org/w3tecch/pigeon.js/dev-status.svg)](https://david-dm.org/w3tecch/pigeon.js#info=devDependencies)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

#Pigeon.js
The idea of pigeon.js is to have a light and fast event-bus service. Moreover, to be able to remove your subscriber.

#Install
This library is available on npm.

##npm
```
npm install pigeonjs
```

##bower
WIP

#How to use
```javascript
// Create a new channel
let channel = pigeon.channel();

// Add a subscriber
channel.subscribe('user:create')(() => {...});

// Dispose your subscriber
let disposer = channel.subscribe('user:create')(() => {...});
disposer();

// Publish your message or date
channel.publish('test')('an example message');
```

#License

[MIT](/LICENSE)
