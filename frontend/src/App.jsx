import React, { useState, useEffect } from "react";
import HomeView from "./views/HomeView";
import QuizView from "./views/QuizView";
import InsertView from "./views/InsertView";
import ListView from "./views/ListView";

export default function VocabApp() {
  const [view, setView] = useState("home");

  const renderContent = () => {
    switch (view) {
      case "home":
          return <HomeView />;
      case "list":
          return <ListView/>;
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
        <button onClick={() => { setView("home"); }}>Home</button>
        <button onClick={() => { setView("list"); }}>My Word List</button>
        <button onClick={() => setView("insert")}>Add New Word</button>
        <button onClick={() => setView("quiz")}>Take a Quizzz</button>
      </div>
      <div className="main">
        {renderContent()}
      </div>
    </div>
  );
}

