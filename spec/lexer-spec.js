describe("Lexer", function() {
  var Lexer = Ibis.Lexer;
  
  it("can lex symbols", function() {
    var lexer = Lexer.ofString("+ - * / ( ) -> = , | ; ;; ^ < > <= >= <>");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("+");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("-");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("*");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("/");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("(");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(")");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("->");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("=");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(",");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("|");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(";");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(";;");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("^");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("<");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(">");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("<=");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual(">=");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("<>");
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
  
  it("can lex integers", function() {
    var lexer = Lexer.ofString("123 456");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("INT");
    expect(Lexer.value(lexer)).toEqual(123);
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("INT");
    expect(Lexer.value(lexer)).toEqual(456);
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
  
  it("can lex identifiers", function() {
    var lexer = Lexer.ofString("abc efg");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("IDENT");
    expect(Lexer.value(lexer)).toEqual("abc");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("IDENT");
    expect(Lexer.value(lexer)).toEqual("efg");
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
  
  it("can lex strings", function() {
    var lexer = Lexer.ofString("\"abc\" \"def\"");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("STRING");
    expect(Lexer.value(lexer)).toEqual("abc");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("STRING");
    expect(Lexer.value(lexer)).toEqual("def");
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
  
  it("can lex reserved words", function() {
    var lexer = Lexer.ofString("fun let rec if then else type of case mod");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("fun");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("let");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("rec");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("if");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("then");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("else");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("type");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("of");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("case");
    expect(Lexer.advance(lexer)).toBeTruthy();
    expect(Lexer.token(lexer)).toEqual("mod");
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
  
  it("can skip comments", function() {
    var lexer = Lexer.ofString("(* This is a comment. *) (*(*(*nested*)*)*)");
    expect(Lexer.advance(lexer)).toBeFalsy();
  });
});
