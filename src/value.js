Ibis.Value = (function () {
  var exports = function () {
    return {
      True: True,
      False: False,
      createInt: createInt,
      createClosure: createClosure,
      createSubr: createSubr
    };
  };
  
  var True = {
    tag: "True",
    toString: function () {
      return "true";
    }
  };
  
  var False = {
    tag: "False",
    toString: function () {
      return "false";
    }
  }
  
  function Int(intValue) {
    this.tag = "Int";
    this.intValue = intValue;
  }
  Int.prototype.toString = function () {
    return this.intValue.toString();
  }
  function createInt(intValue) {
    return new Int(intValue);
  }
  
  function Closure(env, varName, bodyExpr) {
    this.tag = "Closure";
    this.env = env;
    this.varName = varName;
    this.bodyExpr = bodyExpr;
  }
  Closure.prototype.toString = function () {
    return "<closure>";
  }
  function createClosure(env, varName, bodyExpr) {
    return new Closure(env, varName, bodyExpr);
  }
  
  function Subr(subrValue) {
    this.tag = "Subr";
    this.subrValue = subrValue;
  }
  Subr.prototype.toString = function () {
    return "<subr>";
  }
  function createSubr(subrValue) {
    return new Subr(subrValue);
  }
  
  return exports();
})();
