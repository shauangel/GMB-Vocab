import React, { useState, useEffect } from "react";
import {get_list} from "../api";

function ListView() {
  const [wordList, setWordList] = useState([]);
//   const [selectedWord, setSelectedWord] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await get_list('');
        setWordList(result.result);
        console.log(result);
      } catch (error) {
        console.error("Failed to fetch list:", error);
      }
    }

    fetchData();
  }, []);

  return (

    <div className="space-y-4">
      {wordList.map((record, idx) => (
        <div key={idx} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-indigo-600">{record.word}</h2>
          <p className="text-sm text-gray-500 italic mb-2">Type: {record.type}</p>
          <ul className="list-disc list-inside text-gray-700">
            {record.sentences.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ListView;