"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react"; // If using NextAuth.js for user sessions
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { useRouter } from "next/navigation";

const TestDetails = ({ params }) => {
  const { data: session, status } = useSession(); // Session will contain user data
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [userAnswers, setUserAnswers] = useState({
    task1_answer: "",
    task2_answer: "",
  }); // To store the user's answers for task1 and task2
  const { id } = params; // Get test ID from URL params
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // Fetch the test data for the given ID
      const fetchTest = async () => {
        try {
          const response = await fetch(`/api/ielts/showWritingTest?id=${id}`);
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

  const handleInputChange = (task, value) => {
    setUserAnswers((prev) => ({
      ...prev,
      [task]: value,
    }));
  };

  const handleSubmit = async () => {
    const userId = session?.user?.id; // Ensure this is the correct path to get the user ID
    const response = await fetch("/api/ielts/writing-test/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        writingTestId: id,
        task1Answer: userAnswers.task1_answer,
        task2Answer: userAnswers.task2_answer,
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
    <div className="container p-6 mx-auto">
      <h1 className="mb-8 text-4xl font-semibold">{test.title}</h1>

      {/* Task 1 */}
      <div className="mb-10 ">
        <h2 className="mb-4 text-2xl font-bold">{test.task1Title}</h2>
        <p className="mb-4">{test.task1_description}</p>
        {test.task1_imageURL && (
          <img
            src={test.task1_imageURL}
            alt="Task 1 image"
            className="h-auto mb-4 w-90"
          />
        )}
        <p>
          <strong>Word Limit:</strong> {test.task1_word_limit} words
        </p>
        <div className="mt-4">
          <textarea
            name="task1_answer"
            value={userAnswers.task1_answer || ""}
            onChange={(e) => handleInputChange("task1_answer", e.target.value)}
            placeholder="Enter your answer for Task 1"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>

      {/* Task 2 */}
      <div className="mb-10">
        <h2 className="mb-4 text-2xl font-bold">{test.task2Title}</h2>
        <p className="mb-4">{test.task2_description}</p>
        {test.task2_imageURL && (
          <img
            src={test.task2_imageURL}
            alt="Task 2 image"
            className="h-auto mb-4 w-90"
          />
        )}
        <p>
          <strong>Word Limit:</strong> {test.task2_word_limit} words
        </p>
        <div className="mt-4">
          <textarea
            name="task2_answer"
            value={userAnswers.task2_answer || ""}
            onChange={(e) => handleInputChange("task2_answer", e.target.value)}
            placeholder="Enter your answer for Task 2"
            rows={5}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
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

export default TestDetails;
