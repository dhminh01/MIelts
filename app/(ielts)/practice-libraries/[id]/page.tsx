"use client";

import { SkipForward, SkipBack } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const TestPage = ({ params }) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({}); // Store user answers
  const { id: selectedTestId } = params; // Use id from params as selectedTestId

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 10
      );
    }
  };

  const handleForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration,
        audioRef.current.currentTime + 10
      );
    }
  };

  useEffect(() => {
    const fetchTest = async () => {
      const response = await fetch(
        `/api/ielts/tests?id=${encodeURIComponent(selectedTestId)}`
      );

      if (response.ok) {
        const data = await response.json();
        setTest(data.test);
      } else {
        console.error("Failed to fetch test");
      }
      setLoading(false);
    };

    fetchTest();
  }, [selectedTestId]);

  // Handle input change for user answers
  const handleInputChange = (questionId, answer) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  // Submit the user's answers
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that user answers are in the correct format
    const response = await fetch("/api/ielts/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        testId: selectedTestId, // Use the selected test ID
        userAnswers: userAnswers, // Use the userAnswers state directly
      }),
    });

    // Log the response status
    console.log("Response status:", response.status);

    // Check if the response is okay
    if (!response.ok) {
      console.error("Error with submission:", response.statusText);
      return; // Exit the function if the response is not OK
    }

    // Attempt to parse the response as JSON
    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Failed to parse response JSON:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!test) return <div>Test not found.</div>;

  return (
    <div>
      <h1>{test.title}</h1>
      <h2>Sections</h2>
      {test.sections.map((section) => (
        <div key={section.id}>
          <strong>{section.sectionTitle}</strong>
          <div className="flex bg-gray-100 rounded-full">
            <button onClick={handleBackward} className="p-2">
              <SkipBack
                size={"35"}
                className="p-2 hover:rounded-full hover:bg-gray-200"
              />
            </button>
            <button onClick={handleForward} className="">
              <SkipForward
                size={"35"}
                className="p-2 hover:rounded-full hover:bg-gray-200"
              />
            </button>
            <audio controls ref={audioRef} className="w-full">
              <source src={section.audioURL} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
          <ul>
            {section.questions.map((question) => (
              <li key={question.id}>
                <div>
                  <strong>{question.questionTitle}</strong>
                  <h4>{question.description}</h4>
                  <strong>Question {question.questionNum}:</strong>{" "}
                  {question.questionText}
                </div>

                {/* Render question types accordingly */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.answer?.options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={option.label}
                            onChange={() =>
                              handleInputChange(question.id, option.label)
                            }
                            className="mr-2"
                          />
                          <span className="mr-2 font-semibold">
                            {option.label}.
                          </span>
                          {option.imageUrl && (
                            <img
                              src={option.imageUrl}
                              alt={`Option ${option.label}`}
                              className="object-contain w-32 h-32 mr-4"
                            />
                          )}
                        </label>
                      </div>
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
                        className="p-1 mt-2 border border-gray-300 rounded"
                        onChange={(e) =>
                          handleInputChange(question.id, e.target.value)
                        }
                      />
                    </label>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Submit button for saving test history */}
      <button
        onClick={handleSubmit}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default TestPage;
