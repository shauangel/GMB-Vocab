import React, { useState, useEffect } from "react";
import QuizView from "./QuizView";
import InsertView from "./InsertView";

import catImage from './meow_hackpsu.jpg';


export default function VocabApp() {
  const [view, setView] = useState("home");
  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    if (view === "list") {
      fetch("/get_words")
        .then((res) => res.json())
        .then((data) => {
          const sorted = data.result.sort((a, b) => a.word.localeCompare(b.word));
          setWordList(sorted);
        });
    }
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case "home":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "1rem" }}>
              Welcome to GMB-Vocabs
            </h2>
            <img
              src={catImage}
              alt="HackPSU Cat"
              style={{
                width: "300px",
                height: "auto",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                marginBottom: "1rem"
              }}
            />
          </div>
        );

      case "list":
        return selectedWord ? (
          <div className="card">
            <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>Word: {selectedWord.word}</h3>
            <p>Type: {selectedWord.type}</p>
            <ul>
              {selectedWord.sentences.map((s, idx) => (
                <li key={idx}>{s}</li>
              ))}
            </ul>
            <button style={{ marginTop: "1rem" }} onClick={() => setSelectedWord(null)}>
              Back to list
            </button>
          </div>
        ) : (
          <div>
            {wordList.map((word) => (
              <button
                key={word.word}
                className="option"
                onClick={() => {
                  fetch(`/search?w=${word.word}`)
                    .then(res => res.json())
                    .then(data => setSelectedWord(data.result));
                }}
              >
                {word.word}
              </button>
            ))}
          </div>
        );

      case "insert":
        return <InsertView onAdd={() => setView("list")} />;

      case "quiz":
        return <QuizView />;

      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <button onClick={() => { setView("home"); setSelectedWord(null); }}>home</button>
        <button onClick={() => { setView("list"); setSelectedWord(null); }}>list</button>
        <button onClick={() => setView("insert")}>insert</button>
        <button onClick={() => setView("quiz")}>quiz</button>
      </div>
      <div className="main">
        {renderContent()}
      </div>
    </div>
  );
}

