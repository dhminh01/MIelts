"use client";

import { useEffect, useState } from "react";
import UserAnswersByTestHistory from "@/components/test-history-booking/ShowHistoryPage";
import { useSession } from "next-auth/react"; // Import useSession from NextAuth

interface RequestInfo {
  id: string;
  userId: string;
  testHistoryId: string;
  status: string;
}

interface UserInfo {
  [key: string]: string; // Map userId to userName
}

const UserRequestPage = () => {
  const { data: session } = useSession(); // Get session data to get logged-in user
  const [requests, setRequests] = useState<RequestInfo[]>([]);
  const [name, setName] = useState<UserInfo>({});
  const [email, setEmail] = useState<UserInfo>({});
  const [expandedRequest, setExpandedRequest] = useState<string | null>(null);
  const [updatedScore, setUpdatedScore] = useState<number | null>(null); // State to track score updates
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State to show success message
  const [commentContent, setCommentContent] = useState<string>(""); // State for comment content
  const [commentSuccess, setCommentSuccess] = useState<boolean>(false); // State for comment success

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch("/api/instructor/get-requests");
        const data = await response.json();
        setRequests(data);

        // Fetch user names for each request
        const userIds = data.map((request: RequestInfo) => request.userId);
        const userResponse = await fetch("/api/instructor/get-user-name", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userIds }),
        });
        const userData = await userResponse.json();

        setName(userData);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/instructor/update-request-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update request status.");
      }

      const updatedRequest = await response.json();

      // Update the request in the local state
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === updatedRequest.id ? updatedRequest : request
        )
      );

      // Set success message
      setSuccessMessage("Request status updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handleScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedScore(Number(e.target.value)); // Update score value
  };

  const submitScoreUpdate = async (
    requestId: string,
    testHistoryId: string
  ) => {
    try {
      // Ensure updatedScore is provided
      if (updatedScore === null) {
        console.error("Score is not provided");
        return;
      }

      const response = await fetch("/api/instructor/update-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          testHistoryId: testHistoryId, // Send the testHistoryId
          score: updatedScore, // Include the updated score
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update score.");
      }

      // Update the score in the requests list
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, score: updatedScore } // Update score in local state
            : request
        )
      );

      // Set success message
      setSuccessMessage("Score updated successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Error submitting score update:", error);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value); // Update comment content
  };

  const submitComment = async (requestId: string, testHistoryId: string) => {
    try {
      // Ensure session data is available (logged-in instructor)
      if (!session || !session.user) {
        console.error("No instructor is logged in");
        return;
      }

      const response = await fetch("/api/instructor/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testHistoryId: testHistoryId,
          comment: commentContent,
          instructorId: session.user.id, // Use logged-in instructor ID
          instructorEmail: session.user.email, // Use logged-in instructor email
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit comment.");
      }

      // Set comment success state
      setCommentSuccess(true);
      setSuccessMessage("Comment successfully!");

      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        setCommentSuccess(false);
      }, 3000);

      // Optionally clear comment input after success
      setCommentContent("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <main className="flex flex-col p-6">
      <div className="flex items-center justify-center py-5 text-3xl font-bold text-gray-800">
        User requests:
      </div>

      <div>
        {requests.length === 0 ? (
          <p className="text-center text-gray-600">No requests available</p>
        ) : (
          <ul>
            {requests.map((request) => (
              <li key={request.id} className="p-4 border-b border-gray-200">
                <div className="font-semibold">
                  User Name: {name[request.userId] || "Unknown"}
                </div>
                {/* <div className="text-gray-500">
                  Test History ID: {request.testHistoryId}
                </div> */}
                <div className="text-gray-600">Status: {request.status}</div>

                {/* Accept/Decline Buttons */}
                {request.status === "PENDING" && (
                  <div className="mt-2">
                    <button
                      className="px-4 py-2 mr-4 text-white bg-green-500 rounded hover:bg-green-600"
                      onClick={() =>
                        updateRequestStatus(request.id, "ACCEPTED")
                      }
                    >
                      Accept
                    </button>
                    <button
                      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                      onClick={() =>
                        updateRequestStatus(request.id, "DECLINED")
                      }
                    >
                      Decline
                    </button>
                  </div>
                )}

                {request.status === "ACCEPTED" && (
                  <button
                    className="mt-2 text-blue-500 hover:text-blue-700"
                    onClick={() =>
                      setExpandedRequest((prev) =>
                        prev === request.testHistoryId
                          ? null
                          : request.testHistoryId
                      )
                    }
                  >
                    {expandedRequest === request.testHistoryId
                      ? "Hide Answers"
                      : "Show Answers"}
                  </button>
                )}

                {/* Conditionally Render UserAnswersByTestHistory */}
                {expandedRequest === request.testHistoryId &&
                  request.status === "ACCEPTED" && (
                    <div className="mt-4">
                      <UserAnswersByTestHistory
                        testHistoryId={request.testHistoryId}
                      />
                      <div className="mt-4">
                        {/* Success Message */}
                        {successMessage && (
                          <div className="p-4 mb-4 text-green-500 bg-green-100 rounded">
                            {successMessage}
                          </div>
                        )}
                        <div className="mt-4">
                          <h3 className="font-semibold">Instructor Comment:</h3>
                          <textarea
                            value={commentContent}
                            onChange={handleCommentChange}
                            placeholder="Add your comment here"
                            className="w-full p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 "
                            onClick={() =>
                              submitComment(request.id, request.testHistoryId)
                            }
                          >
                            Submit Comment
                          </button>
                        </div>
                        <label className="block mt-4">Score (out of 9):</label>
                        <input
                          type="number"
                          value={updatedScore ?? ""}
                          min={0}
                          max={9}
                          onChange={handleScoreChange}
                          className="p-2 mb-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-sm hover:bg-blue-600 "
                          onClick={() =>
                            submitScoreUpdate(request.id, request.testHistoryId)
                          }
                        >
                          Update Score
                        </button>
                      </div>
                    </div>
                  )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};

export default UserRequestPage;
