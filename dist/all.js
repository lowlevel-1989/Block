// Generated by CoffeeScript 1.10.0
(function() {
  var Block, all, setting;

  Block = require('./core');

  setting = require('./setting');

  all = function() {
    var _obj;
    _obj = new Block(this._self.global.before(this._self.json()) || this._self);
    _obj = new Block(this.before(_obj.json()) || _obj);
    _obj = new Block(this._self.global.after(_obj.json()) || _obj);
    _obj = new Block(this.after(_obj.json()) || _obj);
    _obj = setting(_obj, this._self);
    return _obj;
  };

  module.exports = all;

}).call(this);
