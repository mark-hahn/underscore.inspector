/*
coffee -cb /opt/node/bb/dev/node_modules/underscore.inspector/underscore.inspector.cof
*/var atbar, dump, fs, inspect, inspectRecurse, x, xTypeof, _;
var __hasProp = Object.prototype.hasOwnProperty, __slice = Array.prototype.slice;
_ = require('underscore');
_.mixin(require('underscore.string'));
x = 1;
exports.wait = function(cb) {
  var recurse;
  console.log('Node execution is frozen waiting on debugger (in underscore.inspector)');
  return (recurse = function() {
    if (x = 1) {
      return setTimeout(recurse, 200);
    } else {
      return cb();
    }
  })();
};
exports.xTypeof = xTypeof = function(v) {
  if (_.isUndefined(v)) {
    return "undefined";
  }
  if (_.isNull(v)) {
    return "null";
  }
  if (_.isBoolean(v)) {
    return "boolean";
  }
  if (_.isNumber(v)) {
    return "number";
  }
  if (_.isNaN(v)) {
    return "nan";
  }
  if (_.isString(v)) {
    return "string";
  }
  if (_.isArray(v)) {
    return "array";
  }
  if (_.isFunction(v)) {
    return "function";
  }
  if (_.isRegExp(v)) {
    return "regexp";
  }
  if (_.isArguments(v)) {
    return "arguments";
  }
  if (typeof v === 'object') {
    return 'object';
  }
  return 'unknown';
};
exports.firstType = function(list, type) {
  var item, _i, _len;
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    item = list[_i];
    if (xTypeof(item) === type) {
      return item;
    }
  }
  return null;
};
inspectRecurse = function(objList, arg, depth, key) {
  var hdr, i, idx, k, objListIdx, recurse, str, toa, v, _len;
  if (key == null) {
    key = '';
  }
  str = '';
  for (i = 0; 0 <= depth ? i < depth : i > depth; 0 <= depth ? i++ : i--) {
    str += '   ';
  }
  if (objList.length > 100) {
    return str + '... (Exceeded 100 object limit)\n';
  }
  toa = xTypeof(arg);
  str += key + '<' + toa;
  switch (toa) {
    case "array":
    case "arguments":
    case "object":
      objListIdx = _.indexOf(objList, arg);
      idx = (objListIdx !== -1 ? objListIdx : objList.length);
      str += ':' + idx + ':' + (toa === "object" ? _.size(arg) : arg.length) + '>';
      if (objListIdx !== -1) {
        return str + ' *duplicate*\n';
      } else {
        str += '\n';
      }
      objList.push(arg);
      recurse = function(k, v) {
        return str += inspectRecurse(objList, v, depth + 1, k + ': ');
      };
      if (toa === "object") {
        for (k in arg) {
          if (!__hasProp.call(arg, k)) continue;
          v = arg[k];
          recurse(k, v);
        }
      } else {
        for (i = 0, _len = arg.length; i < _len; i++) {
          v = arg[i];
          recurse(i, v);
        }
      }
      return str;
    case "function":
      hdr = str + '>';
      return hdr + arg.toString().replace(/\s+/g, ' ').slice(8, (100 - hdr.length + 1) || 9e9) + '\n';
    case "null":
    case "undefined":
    case "nan":
      return str + '>\n';
    default:
      return str + '> ' + arg.toString() + '\n';
  }
};
exports.inspect = inspect = function(arg, depth) {
  var objList;
  if (depth == null) {
    depth = 0;
  }
  objList = [];
  return inspectRecurse(objList, arg, depth).slice(0, -1);
};
exports.dump = dump = function(arg, depth) {
  return console.log(inspect(arg, depth));
};
exports.dbg = function() {
  var arg, args, _i, _len, _results;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  if (typeof args[0] === 'string') {
    console.log('-- DBG: ' + args.shift());
  }
  _results = [];
  for (_i = 0, _len = args.length; _i < _len; _i++) {
    arg = args[_i];
    _results.push(dump(arg, 1));
  }
  return _results;
};
fs = require('fs');
atbar = require('atbar');
exports.log = function(path, msg) {
  return atbar.run('trace', function() {
    var fd;
    fd = null;
    msg = ('' + new Date).slice(0, 24) + '  ' + msg + '\n';
    this._(function() {
      '_.log';      return fs.open(path, 'a', this.$());
    });
    this._(function(_throw, d) {
      fd = d;
      return fs.write(fd, msg, null, null, this.$());
    });
    this._(function(_throw) {
      return fs.close(fd);
    });
    return this._('catch', function(err) {
      return console.log('underscore.inspector.log err: ' + err);
    });
  });
};