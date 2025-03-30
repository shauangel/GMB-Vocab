import React, { useState, useEffect } from "react";

function InsertView({ onAdd }) {
  const [word, setWord] = useState("");
  const [type, setType] = useState("noun");

  const types = [
    "noun", "pronoun", "verb", "adjective", "adverb",
    "preposition", "conjunction", "interjection"
  ];

  const handleAdd = () => {
    fetch("/add_word", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ word, type })
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
          {types.map((t) => (
            <option key={t} value={t}>({t})</option>
          ))}
        </select>
      </div>
      <button onClick={handleAdd} className="primary">add</button>
    </div>
  );
}

export default InsertView;