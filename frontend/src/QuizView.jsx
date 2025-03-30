// 它是像單字卡一樣一張一題，總共10題，
// 然後是利用sentence_generator.py生出的句子進行挖空出題，會有ABCD四個選項然後使用者點選選項來作答
//每一題下面會有previous跟next的按鈕可以選擇你要作答的題目，最後一題顯示成績。
import React, { useState, useEffect } from "react";

function QuizView() {
  const [quiz, setQuiz] = useState([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch("/get_quiz")
      .then(res => res.json())
      .then(data => setQuiz(data.result));
  }, []);

  const handleAnswer = (choice) => {
    setAnswers(prev => ({ ...prev, [index]: choice }));
  };

  const handleNext = () => {
    if (index === quiz.length - 1) {
      setShowResult(true);
    } else {
      setIndex(i => i + 1);
    }
  };

  const handlePrev = () => {
    if (index > 0) setIndex(i => i - 1);
  };

  const getScore = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.word) score++;
    });
    return score;
  };

  if (showResult) {
    return (
      <div className="card">
        <h3 style={{ fontSize: "20px", fontWeight: "bold" }}>🎉 Quiz Results</h3>
        <p>You got {getScore()} / {quiz.length} correct</p>
        <ul>
          {quiz.map((q, i) => (
            <li key={i} style={{ marginBottom: "1rem" }}>
              <strong>Q{i + 1}:</strong> {q.question.replace(q.word, "____")}<br />
              <span>Your answer: <strong>{answers[i] || "None"}</strong></span><br />
              <span>Correct answer: <strong>{q.word}</strong></span><br />
              <span style={{ color: answers[i] === q.word ? "green" : "red" }}>
                {answers[i] === q.word ? "✔ Correct" : "✘ Incorrect"}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const current = quiz[index];

  return (
    <div className="card">
      {current ? (
        <div>
          <p style={{ fontWeight: "bold", fontSize: "18px" }}>
            {current.question.replace(current.word, "____")}
          </p>
          <div>
            {current.options.map((opt, i) => (
              <button
                key={i}
                className="option"
                onClick={() => handleAnswer(opt)}
                style={{
                  backgroundColor: answers[index] === opt ? "#dcd0ff" : "#fff",
                  fontWeight: answers[index] === opt ? "bold" : "normal"
                }}
              >
                {opt}
              </button>
            ))}
          </div>
          <div className="quiz-buttons">
            <button onClick={handlePrev}>Previous</button>
            <button onClick={handleNext}>
              {index === quiz.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      ) : (
        <p>Loading quiz...</p>
      )}
    </div>
  );
}

export default QuizView;
