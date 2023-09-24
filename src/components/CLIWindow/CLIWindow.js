// CLIWindow.js
import React, { useState, useRef } from 'react';
import { tokenize } from '../../interpreter/lexer';
import { parseExpression, printSyntaxTree } from '../../interpreter/parser';
import { executeSyntaxTree } from '../../interpreter/executor';
import './CLIWindow.css';
import LineNumberedTextArea from './LineNumberedTextArea/LineNumberedTextArea';

function CLIWindow() {
  // State to manage the expansion/collapse of the terminal
  const [isExpanded, setIsExpanded] = useState(false);
  const [tokens, setTokens] = useState([]);

  const containerRef = useRef(null);

  const toggleTerminal = (e) => {
    setIsExpanded(!isExpanded);
    e.stopPropagation();
  };

  const handleExecute = (text) => {
    // Call the tokenize function and set the result in the state
    console.log("text:", text.trim());
    const tokens = tokenize(text.trim());
    setTokens(tokens);
    console.log('Tokens:', tokens);
    const syntaxTree = parseExpression(tokens);
    printSyntaxTree(syntaxTree);
    console.log("Result", executeSyntaxTree(syntaxTree));
  };

  return (
    <div className={`terminal ${isExpanded ? 'expanded' : ''}`}>
      <button onClick={toggleTerminal}>
        {isExpanded ? '-' : '+'}
      </button>
      <div
        ref={containerRef}
        className="text-area-container"
        style={{ height: '300px', overflowY: 'auto' }}
      >
        <style>
          {`
            /* Custom scrollbar styles */
            .text-area-container::-webkit-scrollbar {
              width: 12px;
            }

            .text-area-container::-webkit-scrollbar-thumb {
              background-color: green; /* Scroll thumb color */
              border: 2px solid black; /* Scroll thumb border color */
            }

            .text-area-container::-webkit-scrollbar-track {
              background-color: black; /* Scroll track color */
            }
          `}
        </style>
        <LineNumberedTextArea onTokenize={handleExecute}/>
      </div>
      
    </div>
  );
}

export default CLIWindow;