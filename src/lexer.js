Ibis.Lexer = (function () {
  var Stream = Ibis.Stream;
  
  var exports = {
    ofString: ofString,
    advance: advance,
    token: token,
    value: value
  }
  
  function ofString(string) {
    return {
      stream: Stream.ofString(string),
      token: null,
      value: null
    };
  }
  
  function advance(lexer) {
    skipWhiteSpace(lexer);
    var c = Stream.peek(lexer.stream);
    if (c == "") {
      return false;
    }
    lexToken(lexer);
    return true;
  }
  
  function token(lexer) {
    return lexer.token;
  }
  
  function value(lexer) {
    return lexer.value;
  }
  
  function lexToken(lexer) {
    var c = Stream.peek(lexer.stream);
    if (c.match(/[+*\/()]/)) {
      lexer.token = Stream.next(lexer.stream);
    } else if (c == "-") {
      Stream.junk(lexer.stream);
      c = Stream.peek(lexer.stream);
      if (c == ">") {
        lexer.token = "->";
        Stream.junk(lexer.stream);
      } else {
        lexer.token = "-";
      }
    } else if (c.match(/\d/)) {
      lexInt(lexer);
    } else {
      throw "unknown character: " + c;
    }
  }
  
  function lexInt(lexer) {
    var n = parseInt(Stream.next(lexer.stream));
    var c = Stream.peek(lexer.stream);
    while (c.match(/\d/)) {
      n = n * 10 + parseInt(Stream.next(lexer.stream));
      c = Stream.peek(lexer.stream);
    }
    lexer.token = "INT";
    lexer.value = n;
  }
  
  function skipWhiteSpace(lexer) {
    var c = Stream.peek(lexer.stream);
    while (c.match(/\s/)) {
      Stream.junk(lexer.stream);
      c = Stream.peek(lexer.stream);
    }
  }
  
  return exports;
})();