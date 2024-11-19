"use client";

import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react"; // Assuming you are using next-auth
import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

const ReadingTestDetails = ({ params }) => {
  const { data: session, status } = useSession(); // Check user session
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [notification, setNotification] = useState(""); // For displaying regular notification
  const { id } = params;

  useEffect(() => {
    if (status === "authenticated") {
      // Fetch the test data for the given ID only if the user is authenticated
      const fetchTest = async () => {
        try {
          const response = await fetch(`/api/ielts/showReadingTest?id=${id}`);
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
    } else {
      setLoading(false);
    }
  }, [id, status]);

  const handleInputChange = (questionId, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("User answers:", userAnswers);
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
      setNotification("Your answers have been successfully submitted!");
    } else {
      console.error("Error submitting answers");
      setNotification(
        "There was an error submitting your answers. Please try again."
      );
    }
  };

  if (loading)
    return <div className="py-10 text-xl text-center">Loading...</div>;

  // Show login prompt if the user is not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="py-10 text-center">
        <p className="mb-4 text-2xl font-semibold">
          Bạn phải đăng nhập để xem nội dung này.
        </p>
        <Button>
          <LoginButton>
            <p>Đăng nhập</p>
          </LoginButton>
        </Button>
      </div>
    );
  }

  if (!test) return <div className="py-10 text-center">Test not found.</div>;

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-4xl font-semibold text-center">{test.title}</h1>
      <h2 className="mb-6 text-2xl font-semibold">Passages</h2>

      {test.passages.map((passage) => (
        <div key={passage.id} className="pt-4 mb-6 border-t-2">
          <h3 className="text-xl font-semibold">{passage.passageTitle}</h3>
          <p className="text-lg text-gray-700">{passage.content}</p>

          <ul className="pl-5 mt-4 space-y-4 list-disc">
            {passage.questions.map((question) => (
              <li key={question.id} className="my-4">
                <div className="font-medium">
                  <span>{question.questionTitle}</span>{" "}
                  {question.questionDescription}
                  <p>Question: {question.questionText}</p>
                </div>

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
                        <span className="text-lg">{option.label} </span>
                        <span>{option.content}</span>
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
                  <div className="mt-4">
                    <input
                      type="text"
                      name={`question-${question.id}`}
                      placeholder="Enter your answer"
                      value={userAnswers[question.id] || ""}
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {/* Regular notification message */}
      {notification && (
        <div className="mt-6 text-xl text-center text-green-600">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default ReadingTestDetails;
