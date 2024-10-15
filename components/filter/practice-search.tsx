"use client";

import React, { useState } from "react";

export default function SearchPractices() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      // Search only if more than 2 characters are entered
      const res = await fetch(`/api/practices/search?query=${query}`);
      const data = await res.json();
      setResults(data);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search for a practice by title..."
        className="w-full p-2 border rounded"
      />

      <div className="results-container">
        {results.length > 0 ? (
          <ul className="results-list">
            {results.map((practice) => (
              <li key={practice.id} className="result-item">
                {practice.title}
              </li>
            ))}
          </ul>
        ) : (
          searchQuery.length > 2 && <p>No results found</p>
        )}
      </div>
    </div>
  );
}
