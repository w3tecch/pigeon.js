[![npm version](https://badge.fury.io/js/pigeonjs.svg)](https://badge.fury.io/js/pigeonjs)
[![Build Status](https://travis-ci.org/w3tecch/pigeon.js.svg?branch=master)](https://travis-ci.org/w3tecch/pigeon.js)
[![Dependency Status](https://david-dm.org/w3tecch/pigeon.js.svg)](https://david-dm.org/w3tecch/pigeon.js)
[![devDependency Status](https://david-dm.org/w3tecch/pigeon.js/dev-status.svg)](https://david-dm.org/w3tecch/pigeon.js#info=devDependencies)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

#Pigeon.js
The idea of pigeon.js is to have a light and fast event-bus service. Moreover, to be able to remove your subscriber.

#Installation
Install via NPM
```
npm install pigeonjs
```

and include the library into your application
```html
<script src="https://github.com/w3tecch/pigeon.js/blob/master/dist/pigeon.min.js"></script>
```

#Usage

```javascript
// Register a new channel
pigeon.channel('my-channel');

// Verify if my channel was created
pigeon.has('my-channel'); // returns a boolean

// Get a list of all subscribers of my channel
pigeon.channel('my-channel').subscribers;

// Get a list of all subscribers of my channel
pigeon.channel('my-channel').subscribe('item:updated', () => {
  // Callback function
});

// Removes my subscriber
let disposer = pigeon.channel('my-channel').subscribe('item:updated', () => {...});
disposer();

// Publish an event
pigeon.channel('my-channel').publish('item:updated', data);

// Create a new channel
let channel = pigeon.channel();
```

#License

[MIT](/LICENSE)
