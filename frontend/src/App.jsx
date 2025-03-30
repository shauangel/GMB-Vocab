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
<div className="flex h-screen w-full">
  {/* Sidebar: 2/7 of screen width */}
  <div className="w-1/4 p-4 border-r border-gray-300 bg-[#F7E7CE] flex flex-col gap-4">
    <button className="px-4 py-2 border border-gray-300 bg-white font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition" onClick={() => setView("home")}>
      Home
    </button>
    <button className="px-4 py-2 border border-gray-300 bg-white font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition" onClick={() => setView("list")}>
      My Word List
    </button>
    <button className="px-4 py-2 border border-gray-300 bg-white font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition" onClick={() => setView("insert")}>
      Add New Word
    </button>
    <button className="px-4 py-2 border border-gray-300 bg-white font-bold rounded-full hover:bg-gray-100 hover:scale-105 transition" onClick={() => setView("quiz")}>
      Take a Quizzz
    </button>
  </div>

  {/* Main content: 5/7 of screen width, centered content */}
  <div className="w-3/4 flex justify-center items-center p-8 overflow-y-auto">
    <div className="w-full max-w-3xl bg-white border-4 border-purple-600 rounded-xl p-8 min-h-[500px]">
      {renderContent()}
    </div>
  </div>
</div>
  );
}

