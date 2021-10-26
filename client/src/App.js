
import React from 'react';
import './App.css';
import TextEditor from './components/TextEditor.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Text Editor</h1>
      </header>
       <div className="editor">
         <TextEditor/>
       </div>
    </div>
  );
}

export default App;
