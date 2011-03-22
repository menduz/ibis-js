Ibis.Expr = (function () {
  var exports = {
    createConst: createConst,
    createVar: createVar,
    createAbs: createAbs,
    createApp: createApp
  };
  
  function Const(value) {
    this.tag = "Const";
    this.value = value;
  }
  Const.prototype.toString = function () {
    return "(Const " + this.value + ")";
  }
  function createConst(value) {
    return new Const(value);
  }
  
  function Var(varName) {
    this.tag = "Var";
    this.varName = varName;
  }
  Var.prototype.toString = function () {
    return "(Var " + this.varName + ")";
  }
  function createVar(varName) {
    return new Var(varName);
  }
  
  function Abs(varName, bodyExpr) {
    this.tag = "Abs";
    this.varName = varName;
    this.bodyExpr = bodyExpr;
  }
  Abs.prototype.toString = function () {
    return "(Abs " + this.varName + " " + this.bodyExpr + ")";
  }
  function createAbs(varName, bodyExpr) {
    return new Abs(varName, bodyExpr);
  }
  
  function App(funExpr, argExpr) {
    this.tag = "App";
    this.funExpr = funExpr;
    this.argExpr = argExpr;
  }
  App.prototype.toString = function () {
    return "(App " + this.funExpr + " " + this.argExpr + ")";
  }
  function createApp(funExpr, argExpr) {
    return new App(funExpr, argExpr);
  }
  
  return exports;
})();
