// LineNumberedTextArea.js
import React, { useState, useEffect, useRef } from 'react';
import './LineNumberedTextArea.css';

function LineNumberedTextArea({ isTerminalCollapsed, onTokenize }) {
  const [textContent, setTextContent] = useState(
    "Type here..."
  );

  const handleTokenizeClick = () => {
    // Call the onTokenize prop and pass the text content for tokenization
    if (onTokenize) {
      onTokenize(textContent);
    }
  };

  const textareaRef = useRef(null);

  useEffect(() => {
    // Update line numbers whenever the text content changes
    const updateLineNumbers = () => {
      if (textareaRef.current) {
        const lines = textareaRef.current.value.split('\n').length;
        setTextContent(textareaRef.current.value);
        setLineNumbers([...Array(lines).keys()].map((line) => line + 1));
      }
    };

    textareaRef.current.addEventListener('input', updateLineNumbers);

    // Initialize line numbers
    updateLineNumbers();

    // Cleanup event listener on unmount
    return () => {
      textareaRef.current.removeEventListener('input', updateLineNumbers);
    };
  }, []);

  const [lineNumbers, setLineNumbers] = useState([1]);

  useEffect(() => {
    // Scroll to the top when the terminal is collapsed
    if (isTerminalCollapsed && textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
  }, [isTerminalCollapsed]);

  const handleTextChange = (e) => {
    setTextContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent the default tab behavior (changing focus)
      const { selectionStart, selectionEnd } = e.target;
      const newContent =
        textContent.substring(0, selectionStart) +
        '\t' +
        textContent.substring(selectionEnd);
      setTextContent(newContent);
      // Move the cursor position after the inserted tab
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + 1;
    } else if (e.key === 'Enter') {
      e.preventDefault(); // Prevent the default Enter key behavior (new line)
      const { selectionStart, selectionEnd } = e.target;
      const textBeforeCursor = textContent.substring(0, selectionStart);
      const textAfterCursor = textContent.substring(selectionEnd);
      const linesBeforeCursor = textBeforeCursor.split('\n');
      const previousLine = linesBeforeCursor[linesBeforeCursor.length - 1];
      const tabsInPreviousLine = (previousLine.match(/^\t*/g) || [''])[0];
      const newLine = '\n' + tabsInPreviousLine; // Add tabs from the previous line
      const newContent = textBeforeCursor + newLine + textAfterCursor;
      setTextContent(newContent);
      // Move the cursor position to the end of the inserted line
      textareaRef.current.selectionStart = textareaRef.current.selectionEnd = selectionStart + newLine.length;
      // Expand the textarea by setting its height to its scroll height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="line-numbered-textarea">
      <div className="line-numbers">
        {lineNumbers.map((line, index) => (
          <div key={index} className="line-number">
            {line}
          </div>
        ))}
      </div>
      <textarea
        ref={textareaRef}
        className="text-area"
        value={textContent}
        onChange={handleTextChange}
        onKeyDown={handleKeyDown} // Handle Tab and Enter key press
        placeholder="Type here..."
      />
      <div className="text-area-buttons">
        <button onClick={handleTokenizeClick}>Execute</button>
      </div>
    </div>
  );
}

export default LineNumberedTextArea;