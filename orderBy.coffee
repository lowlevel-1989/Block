setting = require './setting'

orderBy = () ->
  _obj = new Block( @_self.global.init( @_self.json() ) || @_self )
  _obj = new Block( @init( _obj.json() ) || _obj )
  _obj = new Block( @_self.global.finish( _obj.json() ) || _obj )
  _obj = new Block( @finish( _obj.json() ) || _obj )

  _obj = setting _obj, @_self

  return _obj

module.exports = orderBy
