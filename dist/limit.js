// Generated by CoffeeScript 1.10.0
(function() {
  var Block, setting;

  Block = require('./core');

  setting = require('./setting');

  module.exports = function(offset, limit) {
    var _obj, i, index, out, ref, ref1;
    if (offset == null) {
      offset = 1;
    }
    if (limit == null) {
      limit = false;
    }
    _obj = new Block(this._self.global.before(this._self.json()) || this._self);
    _obj = new Block(this.before(_obj.json()) || _obj);
    offset--;
    if (false === limit) {
      limit = offset + 1;
      offset = 0;
    } else {
      limit += offset;
    }
    _obj = _obj.json();
    limit = limit > Object.keys(_obj).length ? Object.keys(_obj).length : limit;
    out = [];
    for (index = i = ref = offset, ref1 = limit; ref <= ref1 ? i < ref1 : i > ref1; index = ref <= ref1 ? ++i : --i) {
      out.push(_obj[index]);
    }
    _obj = out;
    _obj = new Block(this._self.global.after(_obj) || _obj);
    _obj = new Block(this.after(_obj.json()) || _obj);
    _obj = setting(_obj, this._self);
    return _obj;
  };

}).call(this);