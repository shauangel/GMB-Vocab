import React from "react";
import { useState, useEffect } from "react";

export default function VocabApp() {
  const [view, setView] = useState("home");
  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  useEffect(() => {
    if (view === "list") {
      fetch("/api/words")
        .then((res) => res.json())
        .then((data) => setWordList(data));
    }
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case "home":
        return <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Welcome to GMB-Vocabs</h2>;
      case "list":
        return (
          <div>
            {selectedWord ? (
              <div className="card">
                <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Word: {selectedWord.word}</h3>
                <p>Type: {selectedWord.type}</p>
                <ul>
                  {selectedWord.sentences.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
                <button style={{ marginTop: '1rem' }} onClick={() => setSelectedWord(null)}>
                  Back to list
                </button>
              </div>
            ) : (
              <div>
                {wordList.map((word) => (
                  <button
                    key={word.word}
                    className="option"
                    onClick={() => setSelectedWord(word)}
                  >
                    {word.word}
                  </button>
                ))}
              </div>
            )}
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
        <button onClick={() => setView("home")}>home</button>
        <button onClick={() => setView("list")}>list</button>
        <button onClick={() => setView("insert")}>insert</button>
        <button onClick={() => setView("quiz")}>quiz</button>
      </div>
      <div className="main">
        {renderContent()}
      </div>
    </div>
  );
}

function InsertView({ onAdd }) {
  const [word, setWord] = useState("");
  const [type, setType] = useState("noun");
  const [sentences, setSentences] = useState([]);
  const [loading, setLoading] = useState(false);

  const types = [
    "noun", "pronoun", "verb", "adjective", "adverb",
    "preposition", "conjunction", "interjection"
  ];

  const generateSentences = () => {
    setLoading(true);
    fetch(`/api/generate?word=${word}`)
      .then((res) => res.json())
      .then((data) => setSentences(data))
      .finally(() => setLoading(false));
  };

  const handleAdd = () => {
    const newEntry = { word, type, sentences };
    fetch("/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    }).then(() => onAdd());
  };

  return (
    <div className="card">
      <div>
        <label>New word:</label>
        <input value={word} onChange={(e) => setWord(e.target.value)} />
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {types.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <button onClick={generateSentences} disabled={loading}>
          Generate Sentences
        </button>
        <ul>
          {sentences.map((s, idx) => <li key={idx}>{s}</li>)}
        </ul>
      </div>
      <button onClick={handleAdd} className="primary">add</button>
    </div>
  );
}

function QuizView() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/api/quiz")
      .then((res) => res.json())
      .then((data) => setQuiz(data));
  }, []);

  const current = quiz[index];

  return (
    <div className="card">
      {current ? (
        <div>
          <p>{current.question.replace(current.word, "____")}</p>
          <div>
            {current.options.map((opt, i) => (
              <button key={i} className="option">{opt}</button>
            ))}
          </div>
          <div className="quiz-buttons">
            <button onClick={() => setIndex((i) => Math.max(0, i - 1))}>Previous</button>
            <button onClick={() => setIndex((i) => Math.min(quiz.length - 1, i + 1))}>Next</button>
          </div>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
}
