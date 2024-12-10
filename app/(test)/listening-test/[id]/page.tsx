"use client";

import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const TestDetails = ({ params }) => {
  const { data: session, status } = useSession();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState({});
  const [notification, setNotification] = useState("");
  const { id } = params;
  const [selectedSectionIndex, setSelectedSectionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
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
    const response = await fetch("/api/ielts/listening-test/submit", {
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

      setTimeout(() => {
        router.push("/user-profile/practice-history");
      }, 1000);
    } else {
      console.error("Error submitting answers");
      setNotification(
        "There was an error submitting your answers. Please try again."
      );
    }
  };

  if (loading) return <div>Loading...</div>;

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
      <h1 className="mb-6 text-4xl font-bold">{test.title}</h1>

      <div>
        {test.sections[selectedSectionIndex] && (
          <div className="mb-6">
            <h2 className="text-xl font-bold">
              {test.sections[selectedSectionIndex].sectionTitle}
            </h2>
            <audio
              controls
              className="w-full my-4"
              key={test.sections[selectedSectionIndex].audioURL} // Key ensures the element updates
            >
              <source
                src={test.sections[selectedSectionIndex].audioURL}
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>

            <ul className="pl-5 list-disc">
              {test.sections[selectedSectionIndex].questions.map((question) => (
                <li key={question.id} className="my-2">
                  <strong>Question {question.questionNum}:</strong>{" "}
                  {question.questionText}
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
        )}
      </div>

      <div className="flex justify-between p-4">
        <Button
          onClick={() => {
            if (selectedSectionIndex > 0) {
              setSelectedSectionIndex(selectedSectionIndex - 1);
            }
          }}
          className="px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600"
          disabled={selectedSectionIndex === 0}
        >
          Previous Section
        </Button>

        <Button
          onClick={() => {
            if (selectedSectionIndex < test.sections.length - 1) {
              setSelectedSectionIndex(selectedSectionIndex + 1);
            }
          }}
          className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          disabled={selectedSectionIndex === test.sections.length - 1}
        >
          Next Section
        </Button>
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={handleSubmit}
          className="px-6 py-3 text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </div>

      {notification && (
        <div className="mt-6 text-xl text-center text-green-600">
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
};

export default TestDetails;
