// textProcessor.js

function tokenize(text) {
    const tokens = [];
    let currentToken = '';

    const { TokenType } = require('./parser');
  
    const isNumber = (str) => /^\d+(\.\d+)?$/.test(str); // Check if a string is a number

    const operatorMap = {
      '+': TokenType.PLUS,
      '-': TokenType.MINUS,
      '*': TokenType.TIMES,
      '/': TokenType.DIVIDE,
      '(': TokenType.OPEN_PAREN,
      ')': TokenType.CLOSE_PAREN
    };
  
    for (let char of text) {
      if (/\s/.test(char) || /[.,;?!]/.test(char)) {
        // If whitespace or punctuation is encountered, push the current token (if any) to the tokens array.
        if (currentToken) {
          if (isNumber(currentToken)) {
            tokens.push({ type: TokenType.NUMBER, value: parseFloat(currentToken) });
          } else if (operatorMap[currentToken]) {
            tokens.push({ type: operatorMap[currentToken], value: currentToken });
          } else {
            tokens.push({ type: TokenType.WORD, value: currentToken });
          }
          currentToken = '';
        }
  
        // If the character is punctuation, add it as a separate token.
        if (/[.,;?!]/.test(char)) {
          tokens.push({ type: 'PUNCTUATION', value: char });
        }
      } else {
        // Otherwise, append the character to the current token.
        currentToken += char;
      }
    }
  
    // Push any remaining token (if any) to the tokens array.
    if (currentToken) {
      if (isNumber(currentToken)) {
        tokens.push({ type: TokenType.NUMBER, value: parseFloat(currentToken) });
      } else if (operatorMap[currentToken]) {
        tokens.push({ type: operatorMap[currentToken], value: currentToken });
      } else {
        tokens.push({ type: TokenType.WORD, value: currentToken });
      }
    }
  
    return tokens;
  }
  
  module.exports = {
    tokenize
  };