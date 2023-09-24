// executeSyntaxTree.js
const { Node } = require('./parser');

// Function to execute a syntax tree
function executeSyntaxTree(node) {
    

    if (node === null) {
      throw new Error('Syntax error: Empty expression.');
    }
  
    switch (node.type) {
      case 'NUMBER':
        return parseFloat(node.value); // Assuming 'value' property stores the numeric value
      case 'PLUS':
        return executeSyntaxTree(node.left) + executeSyntaxTree(node.right);
      case 'MINUS':
        return executeSyntaxTree(node.left) - executeSyntaxTree(node.right);
      case 'TIMES':
        return executeSyntaxTree(node.left) * executeSyntaxTree(node.right);
      case 'DIVIDE':
        return executeSyntaxTree(node.left) / executeSyntaxTree(node.right);
      // Add more cases for other operators as needed
      default:
        throw new Error(`Syntax error: Unknown node type: ${node.type}`);
    }
  }
  
  module.exports = {
    executeSyntaxTree,
  };