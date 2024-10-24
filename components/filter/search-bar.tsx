"use client";

import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  // Hàm để tìm kiếm dựa trên tiêu đề
  const handleSearch = async (value) => {
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `../../api/ielts/search?title=${encodeURIComponent(searchTerm)}`
      );
      if (response.ok) {
        const data = await response.json();
        setResults(data.tests);
      } else {
        console.error("Error fetching search results");
      }
    } catch (error) {
      console.error("Error during search:", error);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
    // Clear results if the input is empty
  };

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a test by title..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="p-2 ml-2 text-white bg-blue-500 rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Hiển thị kết quả tìm kiếm */}
      <div>
        {results.length > 0 ? (
          <ul className="pl-5 list-disc">
            {results.map((test) => (
              <li key={test.id}>
                <Link
                  href={`/practice-libraries/${test.id}`}
                  className="hover:text-primary/50"
                >
                  <strong>{test.title}</strong> - {test.skill}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          searchTerm && <p>No tests found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
