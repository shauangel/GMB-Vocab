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
  {/* Sidebar: 1/4 of screen width */}
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

  {/* Main content: 3/4 of screen width, centered content */}
  <div className="flex-1 flex justify-center items-center bg-[#FAF4D3] p-8">
    <div className="bg-white border-4 border-purple-500 rounded-xl w-full max-w-2xl min-h-[500px] max-h-[80vh] overflow-y-auto p-6">
      {renderContent()}
    </div>
  </div>
</div>
  );
}

