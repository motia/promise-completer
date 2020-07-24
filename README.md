# promise-completer

A helper to resolve/reject your promise whenerver you want.

## Motivation
### TL;DR
Because I hate define multiple variables when I can not use `util.promisify` callbacks..

### Long story
Quite often we want to promisfy callbacks. If they adhere to the Node.js `(err, ...args) => returnVal` signature `require('util').promisify` is enough.

But sometimes, it is not possible. And we end up writing something like the example below:
```javascript
let shutdownResolve; /* var 1 */
let shutdownReject; /* var 2 */
const shutdownPromise /* and a constant */ = new Promise((resolve, reject) => { 
  shutdownResolve = resolve;
  shutdownReject = reject; 
});

function asyncComputation() {
  canNotPromisfyThisFunc (function myCallback () {
    ....
    shutdownResolve();
    ....
    shutdownReject(error);
    ....
  })
}

await shutdownPromise;
```

Without compromise on type checking. This package allows you to write the code.

```javascript
var Completer = require('node-completer');
const shutdown = new Completer;

function asyncComputation() {
  canNotPromisfyThisFunc (function myCallback () {
    ....
    shutdown.resolve();
    ....
    shutdown.reject(error);
    ....
  })
}

await shutdown.promise;
```
