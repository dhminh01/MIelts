"use client"; // This marks the component as a Client Component

import React, { useState } from "react";
import Link from "next/link";

interface Test {
  id: string;
  title: string;
}

interface AllSkillsListProps {
  listeningTests: Test[];
  readingTests: Test[];
  writingTests: Test[];
  speakingTests: Test[];
}

export default function AllSkillsList({
  listeningTests,
  readingTests,
  writingTests,
  speakingTests,
}: AllSkillsListProps) {
  // Initialize state for each test category to show more tests
  const [listeningVisible, setListeningVisible] = useState(8);
  const [readingVisible, setReadingVisible] = useState(8);
  const [writingVisible, setWritingVisible] = useState(8);
  const [speakingVisible, setSpeakingVisible] = useState(8);

  // Initialize state to track the visibility toggle for each category
  const [listeningExpanded, setListeningExpanded] = useState(false);
  const [readingExpanded, setReadingExpanded] = useState(false);
  const [writingExpanded, setWritingExpanded] = useState(false);
  const [speakingExpanded, setSpeakingExpanded] = useState(false);

  // Function to load more tests
  const loadMore = (category: string) => {
    if (category === "listening") {
      setListeningVisible(listeningTests.length);
      setListeningExpanded(true);
    } else if (category === "reading") {
      setReadingVisible(readingTests.length);
      setReadingExpanded(true);
    } else if (category === "writing") {
      setWritingVisible(writingTests.length);
      setWritingExpanded(true);
    } else if (category === "speaking") {
      setSpeakingVisible(speakingTests.length);
      setSpeakingExpanded(true);
    }
  };

  // Function to hide the extra tests
  const hideTests = (category: string) => {
    if (category === "listening") {
      setListeningVisible(8);
      setListeningExpanded(false);
    } else if (category === "reading") {
      setReadingVisible(8);
      setReadingExpanded(false);
    } else if (category === "writing") {
      setWritingVisible(8);
      setWritingExpanded(false);
    } else if (category === "speaking") {
      setSpeakingVisible(8);
      setSpeakingExpanded(false);
    }
  };

  return (
    <main className="flex flex-col items-center px-4 pt-4 text-center gap-y-5 sm:px-6 lg:px-8">
      {/* Listening Tests Section */}
      <section className="w-full p-6 rounded-lg shadow-lg bg-blue-50">
        <h2 className="mb-4 text-2xl font-semibold text-blue-700">Listening</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {listeningTests.slice(0, listeningVisible).map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-blue-500"
            >
              <Link
                href={`/listening-test/${test.id}`}
                className="text-lg font-semibold text-blue-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
        {listeningTests.length > listeningVisible && !listeningExpanded && (
          <button
            onClick={() => loadMore("listening")}
            className="px-4 py-2 mt-4 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
          >
            Load More
          </button>
        )}
        {listeningExpanded && (
          <button
            onClick={() => hideTests("listening")}
            className="px-4 py-2 mt-4 text-blue-600 bg-blue-100 rounded-md hover:bg-blue-200"
          >
            Hide
          </button>
        )}
      </section>

      {/* Reading Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-green-50">
        <h2 className="mb-4 text-2xl font-semibold text-green-700">Reading</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {readingTests.slice(0, readingVisible).map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-green-500"
            >
              <Link
                href={`/reading-test/${test.id}`}
                className="text-lg font-semibold text-green-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
        {readingTests.length > readingVisible && !readingExpanded && (
          <button
            onClick={() => loadMore("reading")}
            className="px-4 py-2 mt-4 text-green-600 bg-green-100 rounded-md hover:bg-green-200"
          >
            Load More
          </button>
        )}
        {readingExpanded && (
          <button
            onClick={() => hideTests("reading")}
            className="px-4 py-2 mt-4 text-green-600 bg-green-100 rounded-md hover:bg-green-200"
          >
            Hide
          </button>
        )}
      </section>

      {/* Writing Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-yellow-50">
        <h2 className="mb-4 text-2xl font-semibold text-yellow-700">Writing</h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {writingTests.slice(0, writingVisible).map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-yellow-500"
            >
              <Link
                href={`/writing-test/${test.id}`}
                className="text-lg font-semibold text-yellow-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
        {writingTests.length > writingVisible && !writingExpanded && (
          <button
            onClick={() => loadMore("writing")}
            className="px-4 py-2 mt-4 text-yellow-600 bg-yellow-100 rounded-md hover:bg-yellow-200"
          >
            Load More
          </button>
        )}
        {writingExpanded && (
          <button
            onClick={() => hideTests("writing")}
            className="px-4 py-2 mt-4 text-yellow-600 bg-yellow-100 rounded-md hover:bg-yellow-200"
          >
            Hide
          </button>
        )}
      </section>

      {/* Speaking Tests Section */}
      <section className="w-full p-6 mt-10 rounded-lg shadow-lg bg-purple-50">
        <h2 className="mb-4 text-2xl font-semibold text-purple-700">
          Speaking
        </h2>
        <ul className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {speakingTests.slice(0, speakingVisible).map((test) => (
            <li
              key={test.id}
              className="p-4 transition-shadow border rounded-lg shadow-md hover:shadow-lg hover:border-purple-500"
            >
              <Link
                href={`/speaking-test/${test.id}`}
                className="text-lg font-semibold text-purple-600"
              >
                {test.title}
              </Link>
            </li>
          ))}
        </ul>
        {speakingTests.length > speakingVisible && !speakingExpanded && (
          <button
            onClick={() => loadMore("speaking")}
            className="px-4 py-2 mt-4 text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200"
          >
            Load More
          </button>
        )}
        {speakingExpanded && (
          <button
            onClick={() => hideTests("speaking")}
            className="px-4 py-2 mt-4 text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200"
          >
            Hide
          </button>
        )}
      </section>
    </main>
  );
}
