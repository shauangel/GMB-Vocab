import React, { useState, useEffect } from "react";

function QuizView() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("/get_quiz")
      .then(res => res.json())
      .then(data => setQuiz(data.result));
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

export default QuizView;
