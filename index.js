'use strict';

if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return Promise.resolve().then(fn);
  case 2:
    return Promise.resolve().then(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return Promise.resolve().then(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return Promise.resolve().then(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return Promise.resolve().then(function afterTick() {
      fn.apply(null, args);
    });
  }
}

