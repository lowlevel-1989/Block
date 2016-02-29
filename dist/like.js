// Generated by CoffeeScript 1.10.0
(function() {
  var Block, like, setting;

  Block = require('./core');

  setting = require('./setting');

  like = function(obj, flags) {
    var _obj, i, item, j, key, len, len1, out, ref, valid;
    if (obj == null) {
      obj = false;
    }
    if (flags == null) {
      flags = '';
    }
    _obj = new Block(this._self.global.before(this._self.json()) || this._self);
    _obj = new Block(this.before(_obj.json()) || _obj).json();
    if (obj === false) {
      _obj = [];
    } else if (typeof obj === 'object') {
      out = [];
      for (i = 0, len = _obj.length; i < len; i++) {
        item = _obj[i];
        valid = false;
        ref = Object.keys(obj);
        for (j = 0, len1 = ref.length; j < len1; j++) {
          key = ref[j];
          valid = item[key].search(new RegExp(obj[key], flags));
          if (valid === -1) {
            break;
          }
        }
        if (valid !== -1) {
          out.push(item);
        }
      }
      _obj = out;
    }
    _obj = new Block(this._self.global.after(_obj) || _obj);
    _obj = new Block(this.after(_obj.json()) || _obj);
    _obj = setting(_obj, this._self);
    return _obj;
  };

  module.exports = like;

}).call(this);
