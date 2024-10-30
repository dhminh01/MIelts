"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { FormSchema } from "@/schemas";
import { startTransition, useEffect } from "react";
import { addTest } from "@/actions/add-test";

export function QuestionForm() {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const [questions, setQuestions] = useState([
    {
      questionTitle: "",
      questionType: "MULTIPLE_CHOICE",
      questionText: "",
      options: [{ optionText: "" }],
      correctAnswer: "",
    },
  ]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      skill: "Listening",
    },
  });

  const { register, handleSubmit, setValue, watch } = form;

  const onSubmit = (values: any) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addTest({ ...values, questions }).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionTitle: "",
        questionType: "MULTIPLE_CHOICE",
        questionText: "",
        options: [{ optionText: "" }],
        correctAnswer: "",
      },
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleAddOption = (questionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.push({ optionText: "" });
    setQuestions(newQuestions);
  };

  const handleRemoveOption = (questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <input
        {...register("title")}
        placeholder="Test Title"
        className="input"
      />

      <select {...register("skill")} className="select">
        <option value="Listening">Listening</option>
        <option value="Reading">Reading</option>
        <option value="Writing">Writing</option>
        <option value="Speaking">Speaking</option>
      </select>

      {questions.map((question, questionIndex) => (
        <div key={questionIndex} className="flex flex-col gap-4 question-group">
          <h2 className="text-xl font-bold">Question {questionIndex + 1}</h2>
          <input
            value={question.questionTitle}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].questionTitle = e.target.value;
              setQuestions(newQuestions);
            }}
            placeholder="Question Title"
            className="input"
          />

          <select
            value={question.questionType}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].questionType = e.target.value;
              setQuestions(newQuestions);
            }}
            className="select"
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="FILL_IN_THE_BLANK">Fill in the Blank</option>
          </select>

          <input
            value={question.questionText}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].questionText = e.target.value;
              setQuestions(newQuestions);
            }}
            placeholder="Question Text"
            className="input"
          />

          {question.questionType === "MULTIPLE_CHOICE" && (
            <div className="flex flex-col gap-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center gap-2">
                  <input
                    value={option.optionText}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].options[
                        optionIndex
                      ].optionText = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="flex-grow input"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveOption(questionIndex, optionIndex)
                    }
                    className="text-red-500 button"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddOption(questionIndex)}
                className="mt-2 button"
              >
                Add Option
              </button>
            </div>
          )}

          <input
            value={question.correctAnswer}
            onChange={(e) => {
              const newQuestions = [...questions];
              newQuestions[questionIndex].correctAnswer = e.target.value;
              setQuestions(newQuestions);
            }}
            placeholder="Correct Answer"
            className="input"
          />

          <button
            type="button"
            onClick={() => handleRemoveQuestion(questionIndex)}
            className="text-red-500 button"
          >
            Remove Question
          </button>
        </div>
      ))}

      <button type="button" onClick={handleAddQuestion} className="mt-4 button">
        Add Question
      </button>

      <button type="submit" className="mt-4 button">
        Submit
      </button>

      {success && <p className="text-green-500">{success}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
