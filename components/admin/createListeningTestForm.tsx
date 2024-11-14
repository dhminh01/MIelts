"use client";

import { useState } from "react";
import { CldUploadButton } from "next-cloudinary";

export default function CreateListeningTestPage() {
  const [formData, setFormData] = useState({
    title: "",
    isTimed: false,
    transcript: "",
    sections: [
      {
        sectionTitle: "",
        audioURL: "",
        questions: [
          {
            questionText: "",
            type: "MULTIPLE_CHOICE",
            answer: { options: [{ label: "", option: "" }] },
            correctAnswer: "",
          },
        ],
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    sectionIndex: number,
    questionIndex?: number,
    optionIndex?: number
  ) => {
    const { name, value } = e.target;

    const updatedSections = [...formData.sections];
    if (questionIndex !== undefined) {
      if (optionIndex !== undefined) {
        updatedSections[sectionIndex].questions[questionIndex].answer.options[
          optionIndex
        ][name] = value;
      } else {
        updatedSections[sectionIndex].questions[questionIndex][name] = value;
      }
    } else {
      updatedSections[sectionIndex][name] = value;
    }
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleAddSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      sections: [
        ...prevData.sections,
        {
          sectionTitle: "",
          audioURL: "",
          questions: [
            {
              questionText: "",
              type: "MULTIPLE_CHOICE",
              answer: { options: [{ label: "", option: "" }] },
              correctAnswer: "",
            },
          ],
        },
      ],
    }));
  };

  const handleAddQuestion = (sectionIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions.push({
      questionText: "",
      type: "MULTIPLE_CHOICE",
      answer: { options: [{ label: "", option: "" }] },
      correctAnswer: "",
    });
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleAddOption = (sectionIndex: number, questionIndex: number) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions[questionIndex].answer.options.push({
      label: "",
      option: "",
    });
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleDeleteSection = (sectionIndex: number) => {
    const updatedSections = formData.sections.filter(
      (_, index) => index !== sectionIndex
    );
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleDeleteQuestion = (
    sectionIndex: number,
    questionIndex: number
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions = updatedSections[
      sectionIndex
    ].questions.filter((_, index) => index !== questionIndex);
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleDeleteOption = (
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedSections = [...formData.sections];
    updatedSections[sectionIndex].questions[questionIndex].answer.options =
      updatedSections[sectionIndex].questions[
        questionIndex
      ].answer.options.filter((_, index) => index !== optionIndex);
    setFormData((prevData) => ({ ...prevData, sections: updatedSections }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/admin/listening-test", {
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
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    sectionIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("audio", file);

      // Upload the file to the server
      fetch("/api/upload-audio", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.audioURL) {
            const updatedSections = [...formData.sections];
            updatedSections[sectionIndex].audioURL = data.audioURL; // Corrected here
            setFormData((prevData) => ({
              ...prevData,
              sections: updatedSections,
            }));
          }
        })
        .catch((error) => {
          console.error("Error uploading audio file:", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CldUploadButton uploadPreset="my-preset" />
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Test Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="transcript"
        value={formData.transcript}
        onChange={(e) =>
          setFormData({ ...formData, transcript: e.target.value })
        }
        placeholder="Transcript"
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {formData.sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <input
            type="text"
            name="sectionTitle"
            value={section.sectionTitle}
            onChange={(e) => handleChange(e, sectionIndex)}
            placeholder="Section Title"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => handleFileChange(e, sectionIndex)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {section.audioURL && <p>Audio uploaded: {section.audioURL}</p>}
          <button
            type="button"
            onClick={() => handleDeleteSection(sectionIndex)}
            className="text-red-500"
          >
            Delete Section
          </button>
          {section.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex)}
                placeholder="Question Text"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <select
                name="type"
                value={question.type}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
                <option value="SHORT_ANSWER">Short Answer</option>
              </select>
              {question.type === "MULTIPLE_CHOICE" && (
                <>
                  {question.answer.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex space-x-4">
                      <input
                        type="text"
                        name="label"
                        value={option.label}
                        onChange={(e) =>
                          handleChange(
                            e,
                            sectionIndex,
                            questionIndex,
                            optionIndex
                          )
                        }
                        placeholder="Option Label"
                        className="w-1/3 p-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="text"
                        name="option"
                        value={option.option}
                        onChange={(e) =>
                          handleChange(
                            e,
                            sectionIndex,
                            questionIndex,
                            optionIndex
                          )
                        }
                        placeholder="Option Text"
                        className="w-1/3 p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteOption(
                            sectionIndex,
                            questionIndex,
                            optionIndex
                          )
                        }
                        className="text-red-500"
                      >
                        Delete Option
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(sectionIndex, questionIndex)}
                    className="text-green-500"
                  >
                    Add Option
                  </button>
                </>
              )}
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleChange(e, sectionIndex, questionIndex)}
                placeholder="Correct Answer"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() =>
                  handleDeleteQuestion(sectionIndex, questionIndex)
                }
                className="text-red-500"
              >
                Delete Question
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddQuestion(sectionIndex)}
            className="text-green-500"
          >
            Add Question
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddSection}
        className="text-green-500"
      >
        Add Section
      </button>
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded-md"
      >
        Submit
      </button>
    </form>
  );
}
