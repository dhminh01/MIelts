"use client";

import { useState, useEffect } from "react";

const TestDetails = ({ params }) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({}); // To store the user's answers
  const { id } = params; // Get test ID from URL params

  useEffect(() => {
    // Fetch the test data for the given ID
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/ielts/showListeningTest?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setTest(data.test);
        } else {
          console.error("Failed to fetch test details");
        }
      } catch (error) {
        console.error("Error fetching test data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id]);

  const handleInputChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    // Submit the answers to the server or process them as needed
    console.log("User answers:", userAnswers);
    // Example: Send user answers to API
    const response = await fetch("/api/ielts/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testId: id,
        userAnswers,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("Submit result:", result);
    } else {
      console.error("Error submitting answers");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!test) return <div>Test not found.</div>;

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-4xl font-bold">{test.title}</h1>

      {test.sections.map((section) => (
        <div key={section.id} className="mb-6">
          <h2 className="text-xl font-bold">{section.sectionTitle}</h2>
          <audio controls className="w-full my-4">
            <source src={section.audioURL} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>

          <ul className="pl-5 list-disc">
            {section.questions.map((question) => (
              <li key={question.id} className="my-2">
                <strong>Question {question.questionNum}:</strong>{" "}
                {question.questionText}
                {/* Render input for user answer based on question type */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <div className="mt-4 space-y-2">
                    {question.answer?.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.label}
                          onChange={() =>
                            handleInputChange(question.id, option.label)
                          }
                          checked={userAnswers[question.id] === option.label}
                          className="mr-2"
                        />
                        <span className="text-lg">{option.label}.</span>
                        <span className="text-lg">{option.option}</span>
                        {option.imageUrl && (
                          <img
                            src={option.imageUrl}
                            alt={`Option ${option.label}`}
                            className="object-contain w-32 h-32 mt-2"
                          />
                        )}
                      </label>
                    ))}
                  </div>
                )}
                {question.type === "FILL_IN_THE_BLANK" && (
                  <div>
                    <label>
                      <input
                        type="text"
                        name={`question-${question.id}`}
                        placeholder="Enter your answer"
                        value={userAnswers[question.id] || ""}
                        onChange={(e) =>
                          handleInputChange(question.id, e.target.value)
                        }
                        className="p-1 mt-2 border border-gray-300 rounded"
                      />
                    </label>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default TestDetails;
