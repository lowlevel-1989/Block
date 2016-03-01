// Generated by CoffeeScript 1.10.0
(function() {
  var BASE, Block, SUPPORT_IMMUTABLE, SUPPORT_IMMUTABLE_BLOCK, SUPPORT_MUTABLE, SUPPORT_MUTABLE_BLOCK, i, j, k, l, len, len1, len2, len3, prop;

  SUPPORT_MUTABLE_BLOCK = ['push', 'unshift'];

  SUPPORT_MUTABLE = ['pop', 'shift', 'splice', 'sort', 'reverse'];

  SUPPORT_IMMUTABLE_BLOCK = ['concat'];

  SUPPORT_IMMUTABLE = ['map', 'filter', 'forEach'];

  Block = function(obj) {
    if (obj == null) {
      obj = [];
    }
    this._objects = obj.json ? Object.freeze(obj.json()) : Object.freeze(obj);
    this._support = SUPPORT_MUTABLE.concat(SUPPORT_IMMUTABLE.concat(['json']));
    this._support_block = SUPPORT_MUTABLE_BLOCK.concat(SUPPORT_IMMUTABLE_BLOCK.concat(['equals']));
    this._extend();
    return this;
  };

  Block.prototype = {
    _extend: function() {},
    json: function(unique) {
      var _obj, keys;
      if (unique == null) {
        unique = false;
      }
      _obj = JSON.parse(JSON.stringify(this._objects));
      if (unique === true) {
        keys = Object.keys(_obj);
        if (keys.length === 0) {
          _obj = null;
        } else if (keys.length === 1) {
          _obj = _obj[keys[0]];
        }
      }
      return _obj;
    },
    equals: function(obj, self) {
      var i, key, len, ref, type, x;
      if (obj == null) {
        obj = {};
      }
      self = self || this.json();
      x = obj.json ? obj.json() : obj;
      if (x === null || x === void 0) {
        return false;
      }
      if (Object.keys(self).length !== Object.keys(x).length) {
        return false;
      }
      ref = Object.keys(self);
      for (i = 0, len = ref.length; i < len; i++) {
        key = ref[i];
        if (self.hasOwnProperty(key)) {
          if (!x.hasOwnProperty(key)) {
            return false;
          }
          type = typeof self[key];
          if (type === 'function') {
            return false;
          } else if (type === 'object') {
            if (!this.equals(x[key], self[key])) {
              return false;
            }
          } else {
            if (self[key] !== x[key]) {
              return false;
            }
          }
        }
      }
      return true;
    }
  };

  BASE = function(_prop, _immutable, block) {
    if (_immutable == null) {
      _immutable = false;
    }
    if (block == null) {
      block = true;
    }
    return function() {
      var _args, _obj, i, index, item, j, key, len, len1, ref, ref1;
      _obj = this.json();
      if (block === true) {
        _args = [];
        ref = Object.keys(arguments);
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          item = arguments[key];
          if (item.json) {
            item = item.json();
            ref1 = Object.keys(item);
            for (j = 0, len1 = ref1.length; j < len1; j++) {
              index = ref1[j];
              _args.push(item[index]);
            }
          } else {
            _args.push(item);
          }
        }
      } else {
        _args = arguments;
      }
      if (_immutable) {
        _obj = _obj[_prop].apply(_obj, _args);
      } else {
        _obj[_prop].apply(_obj, _args);
      }
      return new Block(_obj);
    };
  };

  for (i = 0, len = SUPPORT_MUTABLE_BLOCK.length; i < len; i++) {
    prop = SUPPORT_MUTABLE_BLOCK[i];
    Block.prototype[prop] = BASE(prop, false, true);
  }

  for (j = 0, len1 = SUPPORT_MUTABLE.length; j < len1; j++) {
    prop = SUPPORT_MUTABLE[j];
    Block.prototype[prop] = BASE(prop, false, false);
  }

  for (k = 0, len2 = SUPPORT_IMMUTABLE_BLOCK.length; k < len2; k++) {
    prop = SUPPORT_IMMUTABLE_BLOCK[k];
    Block.prototype[prop] = BASE(prop, true, true);
  }

  for (l = 0, len3 = SUPPORT_IMMUTABLE.length; l < len3; l++) {
    prop = SUPPORT_IMMUTABLE[l];
    Block.prototype[prop] = BASE(prop, true, false);
  }

  module.exports = Block;

}).call(this);