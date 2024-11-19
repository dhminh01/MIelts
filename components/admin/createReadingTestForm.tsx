"use client";

import { useState } from "react";
import { Button } from "../ui/button";

const CreateReadingTest = () => {
  const [formData, setFormData] = useState({
    title: "",
    passages: [
      {
        passageTitle: "",
        content: "",
        questions: [
          {
            questionTitle: "",
            questionDescription: "",
            questionText: "",
            type: "MULTIPLE_CHOICE",
            answer: { options: [{ label: "", content: "" }] },
            correctAnswer: "",
          },
        ],
      },
    ],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    passageIndex: number,
    questionIndex?: number,
    optionIndex?: number
  ) => {
    const { name, value } = e.target;
    const updatedPassages = [...formData.passages];

    if (questionIndex !== undefined) {
      if (name === "type" && value === "FILL_IN_THE_BLANK") {
        updatedPassages[passageIndex].questions[questionIndex].answer.options =
          [];
      }

      if (optionIndex !== undefined) {
        updatedPassages[passageIndex].questions[questionIndex].answer.options[
          optionIndex
        ][name] = value;
      } else {
        updatedPassages[passageIndex].questions[questionIndex][name] = value;
      }
    } else {
      updatedPassages[passageIndex][name] = value;
    }

    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleAddPassage = () => {
    setFormData((prevData) => ({
      ...prevData,
      passages: [
        ...prevData.passages,
        {
          passageTitle: "",
          content: "",
          questions: [
            {
              questionTitle: "",
              questionDescription: "",
              questionText: "",
              type: "MULTIPLE_CHOICE",
              answer: { options: [{ label: "", content: "" }] },
              correctAnswer: "",
            },
          ],
        },
      ],
    }));
  };

  const handleAddQuestion = (passageIndex: number) => {
    const updatedPassages = [...formData.passages];
    updatedPassages[passageIndex].questions.push({
      questionTitle: "",
      questionDescription: "",
      questionText: "",
      type: "MULTIPLE_CHOICE",
      answer: { options: [{ label: "", content: "" }] },
      correctAnswer: "",
    });
    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleAddOption = (passageIndex: number, questionIndex: number) => {
    const updatedPassages = [...formData.passages];
    updatedPassages[passageIndex].questions[questionIndex].answer.options.push({
      label: "",
      content: "",
    });
    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleDeletePassage = (passageIndex: number) => {
    const updatedPassages = formData.passages.filter(
      (_, index) => index !== passageIndex
    );
    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleDeleteQuestion = (
    passageIndex: number,
    questionIndex: number
  ) => {
    const updatedPassages = [...formData.passages];
    updatedPassages[passageIndex].questions = updatedPassages[
      passageIndex
    ].questions.filter((_, index) => index !== questionIndex);
    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleDeleteOption = (
    passageIndex: number,
    questionIndex: number,
    optionIndex: number
  ) => {
    const updatedPassages = [...formData.passages];
    updatedPassages[passageIndex].questions[questionIndex].answer.options =
      updatedPassages[passageIndex].questions[
        questionIndex
      ].answer.options.filter((_, index) => index !== optionIndex);
    setFormData((prevData) => ({ ...prevData, passages: updatedPassages }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/create-reading-test", {
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
      alert("Error creating test: " + error.message);
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
      {formData.passages.map((passage, passageIndex) => (
        <div key={passageIndex} className="space-y-4">
          <span className="py-3 text-lg font-semibold">
            Passage {passageIndex + 1}
          </span>
          <input
            type="text"
            name="passageTitle"
            value={passage.passageTitle}
            onChange={(e) => handleChange(e, passageIndex)}
            placeholder="Passage Title"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <textarea
            name="content"
            value={passage.content}
            onChange={(e) => handleChange(e, passageIndex)}
            placeholder="Passage Content"
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Button
            type="button"
            onClick={() => handleDeletePassage(passageIndex)}
            className="text-white bg-red-500 hover:bg-red-400"
          >
            Delete Passage
          </Button>
          {passage.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <span className="py-3 text-lg font-semibold">
                Question {questionIndex + 1}
              </span>
              {questionIndex === 0 && (
                <>
                  <div className="space-y-4">
                    <input
                      type="text"
                      name="questionTitle"
                      value={question.questionTitle}
                      onChange={(e) =>
                        handleChange(e, passageIndex, questionIndex)
                      }
                      placeholder="Question Title"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                    <textarea
                      name="questionDescription"
                      value={question.questionDescription}
                      onChange={(e) =>
                        handleChange(e, passageIndex, questionIndex)
                      }
                      placeholder="Question Description"
                      required
                      className="w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
              <input
                type="text"
                name="questionText"
                value={question.questionText}
                onChange={(e) => handleChange(e, passageIndex, questionIndex)}
                placeholder="Question Text"
                required
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <select
                name="type"
                value={question.type}
                onChange={(e) => handleChange(e, passageIndex, questionIndex)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
              </select>
              {question.type === "MULTIPLE_CHOICE" && (
                <>
                  {question.answer.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex space-x-4">
                      <div className="w-full py-2 sm:w-1/3">
                        <input
                          type="text"
                          name="label"
                          value={option.label}
                          onChange={(e) =>
                            handleChange(
                              e,
                              passageIndex,
                              questionIndex,
                              optionIndex
                            )
                          }
                          placeholder="Option Label"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="w-full p-2 sm:w-1/3">
                        <input
                          type="text"
                          name="content"
                          value={option.content}
                          onChange={(e) =>
                            handleChange(
                              e,
                              passageIndex,
                              questionIndex,
                              optionIndex
                            )
                          }
                          placeholder="Option Content"
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="w-full p-2 sm:w-1/3">
                        <Button
                          type="button"
                          onClick={() =>
                            handleDeleteOption(
                              passageIndex,
                              questionIndex,
                              optionIndex
                            )
                          }
                          className="text-white bg-red-500 hover:bg-red-400"
                        >
                          Delete Option
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={() => handleAddOption(passageIndex, questionIndex)}
                    className="text-white bg-green-500 hover:bg-green-400"
                  >
                    Add Option
                  </Button>
                </>
              )}
              <input
                type="text"
                name="correctAnswer"
                value={question.correctAnswer}
                onChange={(e) => handleChange(e, passageIndex, questionIndex)}
                placeholder="Correct Answer"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <Button
                type="button"
                onClick={() =>
                  handleDeleteQuestion(passageIndex, questionIndex)
                }
                className="text-white bg-red-500 hover:bg-red-400"
              >
                Delete Question
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => handleAddQuestion(passageIndex)}
            className="text-white bg-green-500 hover:bg-green-400"
          >
            Add Question
          </Button>
        </div>
      ))}
      <Button
        type="button"
        onClick={handleAddPassage}
        className="text-white bg-green-500 hover:bg-green-400"
      >
        Add Passage
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

export default CreateReadingTest;
