"use client";

import Link from "next/link";
import { useState } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (value: string) => {
    if (value.trim() === "") {
      setResults([]);
      return;
    }

    try {
      const response = await fetch(
        `/api/ielts/search?title=${encodeURIComponent(value)}`
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className="">
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a test..."
          className="w-full p-2 border border-gray-300 rounded-lg"
        />
      </div>

      <div>
        {results.length > 0 ? (
          <ul className="pl-5 list-disc">
            {results.map((test) => (
              <li
                key={test.id}
                className="flex items-center justify-between px-5"
              >
                <Link
                  href={`/practice-libraries/${test.skill.toLowerCase()}/${
                    test.id
                  }`}
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
