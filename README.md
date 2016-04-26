[![npm version](https://badge.fury.io/js/pigeonjs.svg)](https://badge.fury.io/js/pigeonjs)
[![Build Status](https://travis-ci.org/w3tecch/pigeon.js.svg?branch=master)](https://travis-ci.org/w3tecch/pigeon.js)
[![Dependency Status](https://david-dm.org/w3tecch/pigeon.js.svg)](https://david-dm.org/w3tecch/pigeon.js)
[![devDependency Status](https://david-dm.org/w3tecch/pigeon.js/dev-status.svg)](https://david-dm.org/w3tecch/pigeon.js#info=devDependencies)
[![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

#Pigeon.js

#Install
##npm
```
npm install pigeonjs
```
Add a <script> to your index.html:
```
<script src="node_modules/pigeonjs/dist/pigeon.js"></script>
```
##bower
WIP


#How to use
```
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
