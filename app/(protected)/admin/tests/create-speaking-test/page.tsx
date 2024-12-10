"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const CreateSpeakingTest = () => {
  const [formData, setFormData] = useState({
    title: "",
    parts: [
      {
        title: "",
        description: "",
        questions: [
          {
            questionText: "",
            responseType: "AUDIO",
          },
        ],
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    partIndex: number,
    questionIndex?: number
  ) => {
    const { name, value } = e.target;
    const updatedParts = [...formData.parts];

    if (questionIndex !== undefined) {
      updatedParts[partIndex].questions[questionIndex][name] = value;
    } else {
      updatedParts[partIndex][name] = value;
    }

    setFormData((prevData) => ({ ...prevData, parts: updatedParts }));
  };

  const handleAddPart = () => {
    setFormData((prevData) => ({
      ...prevData,
      parts: [
        ...prevData.parts,
        {
          title: "",
          description: "",
          questions: [
            {
              questionText: "",
              responseType: "AUDIO",
            },
          ],
        },
      ],
    }));
  };

  const handleAddQuestion = (partIndex: number) => {
    const updatedParts = [...formData.parts];
    updatedParts[partIndex].questions.push({
      questionText: "",
      responseType: "AUDIO",
    });
    setFormData((prevData) => ({ ...prevData, parts: updatedParts }));
  };

  const handleDeletePart = (partIndex: number) => {
    const updatedParts = formData.parts.filter((_, index) => index !== partIndex);
    setFormData((prevData) => ({ ...prevData, parts: updatedParts }));
  };

  const handleDeleteQuestion = (partIndex: number, questionIndex: number) => {
    const updatedParts = [...formData.parts];
    updatedParts[partIndex].questions = updatedParts[partIndex].questions.filter(
      (_, index) => index !== questionIndex
    );
    setFormData((prevData) => ({ ...prevData, parts: updatedParts }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/create-speaking-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Test created successfully!");
      }
    } catch (error) {
      alert("Error creating test: " + (error as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Test Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {formData.parts.map((part, partIndex) => (
        <div key={partIndex} className="space-y-4">
          <span className="py-3 text-lg font-semibold">Part {partIndex + 1}</span>
          <input
            type="text"
            name="title"
            value={part.title}
            onChange={(e) => handleChange(e, partIndex)}
            placeholder="Part Title (e.g., Part 1)"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="description"
            value={part.description}
            onChange={(e) => handleChange(e, partIndex)}
            placeholder="Part Description"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Button
            type="button"
            onClick={() => handleDeletePart(partIndex)}
            className="text-white bg-red-500 hover:bg-red-400"
          >
            Delete Part
          </Button>
          {part.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <span className="py-3 text-lg font-semibold">
                Question {questionIndex + 1}
              </span>
              <textarea
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleChange(e, partIndex, questionIndex)}
                placeholder="Question Text"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <select
                name="responseType"
                value={question.responseType}
                onChange={(e) => handleChange(e, partIndex, questionIndex)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="AUDIO">Audio</option>
                <option value="TEXT">Text</option>
              </select>
              <Button
                type="button"
                onClick={() => handleDeleteQuestion(partIndex, questionIndex)}
                className="text-white bg-red-500 hover:bg-red-400"
              >
                Delete Question
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => handleAddQuestion(partIndex)}
            className="text-white bg-green-500 hover:bg-green-400"
          >
            Add Question
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAddPart}
        className="text-white bg-green-500 hover:bg-green-400"
      >
        Add Part
      </Button>
      <Button
        type="submit"
        className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500"
      >
        Submit
      </Button>
    </form>
  );
};

export default CreateSpeakingTest;
