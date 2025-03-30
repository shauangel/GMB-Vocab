import React from 'react';
import ReactDOM from 'react-dom/client';
import VocabApp from './App.jsx';   // 👈 確認這行是 VocabApp，不是 App
import './index.css';


console.log("main loaded");

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <VocabApp />
  </React.StrictMode>
);
