# express-route-resolver
[![Build Status](https://travis-ci.org/thiagogarbazza/express-route-resolver.svg?branch=0.0.1)](https://travis-ci.org/thiagogarbazza/express-route-resolver)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://github.com/thiagogarbazza/express-route-resolver/)

## Installation

### Using NPM

```sh
npm install --save express-route-resolver
```

## Usage

### import

```js
import routeResolver from 'express-route-resolver';
```

or

```js
const routeResolver = require('express-route-resolver');
```

### onCreate

```js
app.route('/my-route')
  .post((req, res) => {
    const promise = Promise.resolve(req.body);
    routeResolver.onCreate(res, promise);
  });
```

### onDelete

```js
app.route('/my-route/:id')
  .delete((req, res) => {
    const promise = Promise.resolve(req.params.id);
    routeResolver.onDelete(res, promise);
  });
```

### onError

```js
app.use((err, req, res, next) => {
  routeResolver.onError(res, err);
});
```

### onFind

```js
app.route('/my-route')
  .get((req, res) => {
    const promise = Promise.resolve(req.query);
    routeResolver.onFind(res, promise);
  });
```

### onFindOne

```js
app.route('/my-route/:id')
  .get((req, res) => {
    const promise = Promise.resolve(req.params.id);
    routeResolver.onFindOne(res, promise);
  });
```

### onUpdate

```js
app.route('/my-route/:id')
  .put((req, res) => {
    const promise = Promise.resolve(req.params.id);
    routeResolver.onUpdate(res, promise);
  });
```

## License

The `express-route-resolver` project is under MIT license.
