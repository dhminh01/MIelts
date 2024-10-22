"use client";

import { useEffect, useState } from "react";

const TestPage = ({ params }) => {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = params;

  useEffect(() => {
    const fetchTest = async () => {
      const response = await fetch(
        `/api/admin/tests?id=${encodeURIComponent(id)}`
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
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!test) return <div>Test not found.</div>;

  return (
    <div>
      <h1>{test.title}</h1>
      <h2>Sections</h2>
      {test.sections.map((section) => (
        <div key={section.id}>
          <h3>{section.title}</h3>
          {section.audioURL && (
            <audio controls>
              <source src={section.audioURL} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}
          <h4>Questions</h4>
          <ul>
            {section.questions.map((question) => (
              <li key={question.id}>
                <div>
                  <strong>Question {question.questionNum}:</strong>{" "}
                  {question.questionText}
                </div>

                {/* Check the question type and render accordingly */}
                {question.type === "MULTIPLE_CHOICE" && (
                  <div>
                    {question.answer?.options.map((option, index) => (
                      <div key={index}>
                        <label>
                          <input
                            type="checkbox"
                            name={`question-${question.questionNum}`}
                            value={option}
                          />
                          {option}
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
                        name={`question-${question.questionNum}`}
                        placeholder="Enter your answer"
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
    </div>
  );
};

export default TestPage;
