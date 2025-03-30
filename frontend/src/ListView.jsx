import React, { useState, useEffect } from "react";

function ListView({ onAdd }) {
  const [wordList, setWordList] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);

  const types = [
    "noun", "pronoun", "verb", "adjective", "adverb",
    "preposition", "conjunction", "interjection"
  ];

    const handleAdd = () => {
        fetch("/get_words").then(() => onAdd());
    };

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
}

export default ListView;