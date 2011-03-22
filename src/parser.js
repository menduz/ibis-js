Ibis.Parser = (function () {
  var Lexer = Ibis.Lexer;
  var Expr = Ibis.Expr;
  
  var exports = {
    ofString: ofString,
    parse: parse
  };
  
  function ofString(string) {
    return {
      lexer: Lexer.ofString(string),
      headToken: null
    }
  }
  
  function parse(parser) {
    lookAhead(parser);
    if (parser.headToken == "EOF") {
      return null;
    }
    return parseStmt(parser);
  }
  
  function lookAhead(parser) {
    if (Lexer.advance(parser.lexer)) {
      parser.headToken = Lexer.token(parser.lexer);
    } else {
      parser.headToken = "EOF";
    }
  }
  
  function parseStmt(parser) {
    var expr = parseExpr(parser);
    switch (parser.headToken) {
    case "EOF":
      break;
    default:
      throw expected(parser, "EOF");
    }
    return expr;
  }
  
  function parseExpr(parser) {
    return parsePrimExpr(parser);
  }
  
  function parsePrimExpr(parser) {
    var expr = parseAtom(parser);
    while (parser.headToken == "INT" ||
           parser.headToken == "IDENT" ||
           parser.headToken == "fun") {
      expr = Expr.createApp(expr, parseAtom(parser));
    }
    return expr;
  }
  
  function parseAtom(parser) {
    var expr = null;
    switch (parser.headToken) {
    case "INT":
      expr = parseInt(parser);
      break;
    case "IDENT":
      expr = parseIdent(parser);
      break;
    case "fun":
      expr = parseAbs(parser);
      break;
    default:
      throw unexpected(parser);
    }
    return expr;
  }
  
  function parseInt(parser) {
    var expr = Expr.createConst(Lexer.value(parser.lexer));
    lookAhead(parser);
    return expr;
  }
  
  function parseIdent(parser) {
    var expr = Expr.createVar(Lexer.value(parser.lexer));
    lookAhead(parser);
    return expr;
  }
  
  function parseAbs(parser) {
    lookAhead(parser);
    if (parser.headToken != "IDENT") {
      throw expected(parser, "IDENT");
    }
    var varName = Lexer.value(parser.lexer);
    lookAhead(parser);
    if (parser.headToken != "->") {
      throw expected(parser, "->");
    }
    lookAhead(parser);
    var bodyExpr = parseExpr(parser);
    return Expr.createAbs(varName, bodyExpr);
  }
  
  function expected(parser, expectedToken) {
    return "unexpected " + parser.headToken + ", expected " + expectedToken;
  }
  
  function unexpected(parser) {
    return "unexpected " + parser.headToken
  }
  
  return exports;
})();