// syntaxTreeGenerator.js

// Define token types
const TokenType = {
    NUMBER: 'NUMBER',
    WORD: 'WORD',
    PLUS: 'PLUS',
    MINUS: 'MINUS',
    TIMES: 'TIMES',
    DIVIDE: 'DIVIDE',
    OPEN_PAREN: 'OPEN_PAREN',
    CLOSE_PAREN: 'CLOSE_PAREN'
  };
  
  // Define a class for nodes in the syntax tree
  class Node {
    constructor(value, type, left = null, right = null) {
      this.type = type;   // Node type (e.g., 'NUMBER', 'ADDITION', etc.)
      this.value = value; // Node value 
      this.left = left;   // Left child node
      this.right = right; // Right child node
    }
  }
  
  // Recursive descent parser for expressions
  function parseExpression(tokens) {
    let currentTokenIndex = 0;
  
    // Helper function to parse an expression with given precedence
    function parseWithPrecedence(precedence) {
      let left = parsePrimary(); // Parse the leftmost operand
  
      while (currentTokenIndex < tokens.length) {
        const token = tokens[currentTokenIndex];
        
        // Check operator precedence
        const tokenPrecedence = getOperatorPrecedence(token.type);
        if (tokenPrecedence < precedence) {
          return left; // Return the left operand if the operator has lower precedence
        }
  
        currentTokenIndex++;
  
        // Parse the right operand with higher precedence
        const right = parseWithPrecedence(tokenPrecedence);
        
        // Create a new node with the operator and operands
        left = new Node( token.value, token.type, left, right);
      }
  
      return left;
    }
  
    // Helper function to parse primary expressions (e.g., numbers)
    function parsePrimary() {
        const token = tokens[currentTokenIndex++];
        if (token.type === 'NUMBER') {
          return new Node( token.value, 'NUMBER', null, null);
        } else if (token.type === 'OPEN_PAREN') {
          // Handle expressions within parentheses
          const expressionWithinParentheses = parseWithPrecedence(0);
          if (tokens[currentTokenIndex].type !== 'CLOSE_PAREN') {
            throw new Error('Syntax error: Missing closing parenthesis.');
          }
          currentTokenIndex++; // Consume the closing parenthesis token
          return expressionWithinParentheses;
        }
        throw new Error('Syntax error: Expected a number or an opening parenthesis.');
    }
  
    // Define operator precedence (higher number means higher precedence)
    const operatorPrecedence = {
      'PLUS': 1,
      'MINUS': 1,
      'TIMES': 2,
      'DIVIDE': 2,
      'OPEN_PAREN': 3,
      'CLOSE_PAREN': 3,
      // Add more operators and precedence levels as needed
    };
  
    // Function to get operator precedence
    function getOperatorPrecedence(operator) {
      return operatorPrecedence[operator] || 0; // Default to 0 if not found
    }
  
    // Start parsing with the lowest precedence
    return parseWithPrecedence(0);
  }

  function printSyntaxTree(node, depth = 0) {
    if (node === null) {
      console.log(' '.repeat(depth * 2) + 'null');
      return;
    }
  
    console.log(' '.repeat(depth * 2) + node.type);
  
    if (node.left) {
      printSyntaxTree(node.left, depth + 1);
    }
  
    if (node.right) {
      printSyntaxTree(node.right, depth + 1);
    }
  }
  
  // Export the syntax tree generator function
  module.exports = {
    parseExpression, printSyntaxTree, TokenType, Node
  };