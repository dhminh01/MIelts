"use client";

import { useState } from "react";

export default function ListeningPractice({
  practiceData,
}: {
  practiceData: any;
}) {
  const [answers, setAnswers] = useState<any>({});

  const handleOptionChange = (questionId: string, selectedOption: string) => {
    setAnswers({ ...answers, [questionId]: selectedOption });
  };

  const handleTextChange = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    console.log("User's Answers:", answers);
    // Compare user answers with the correct answers and calculate the score here
  };

  return (
    <div>
      <h1>{practiceData.title}</h1>
      <audio controls src={practiceData.audioUrl}></audio>
      <p>{practiceData.content}</p>

      {practiceData.questions.map((question: any) => (
        <div key={question.id}>
          <p>{question.text}</p>
          {question.type === "multiple-choice" ? (
            question.options.map((option: any) => (
              <label key={option.label}>
                <input
                  type="radio"
                  name={question.id}
                  value={option.label}
                  onChange={() => handleOptionChange(question.id, option.label)}
                />
                {option.label}: {option.text}
              </label>
            ))
          ) : (
            <input
              type="text"
              placeholder="Your answer"
              onChange={(e) => handleTextChange(question.id, e.target.value)}
            />
          )}
        </div>
      ))}

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
