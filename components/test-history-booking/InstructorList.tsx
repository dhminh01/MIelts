"use client";

import { useState } from "react";

interface Instructor {
  id: string;
  name: string;
  email: string;
}

interface InstructorListProps {
  instructors: Instructor[];
  testHistoryId: string;
  requestStatus: string | null; // Include the request status as a prop
}

export default function InstructorList({
  instructors = [],
  testHistoryId,
  requestStatus,
}: InstructorListProps) {
  const [showInstructors, setShowInstructors] = useState(false);

  const handleRequestReview = async (instructorId: string) => {
    try {
      if (requestStatus) {
        alert("You have already requested a review for this test.");
        return;
      }

      const response = await fetch("/api/request-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ instructorId, testHistoryId }), // Include instructorId in the body
      });

      if (!response.ok) {
        throw new Error("Failed to create request");
      }

      alert("Request sent successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }
  };

  return (
    <div className="mt-6">
      {requestStatus && (
        <div className="p-4 mb-4 text-center text-white bg-gray-800 rounded-md">
          <p>
            You have already requested a review for this test. Current status:{" "}
            <span
              className={
                requestStatus === "PENDING"
                  ? "text-yellow-400"
                  : requestStatus === "ACCEPTED"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {requestStatus}
            </span>
          </p>
        </div>
      )}

      <button
        onClick={() => setShowInstructors(!showInstructors)}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        {showInstructors ? "Hide Instructor List" : "Show Instructor List"}
      </button>

      {showInstructors && (
        <div className="mt-4">
          <ul className="space-y-4">
            {instructors.map((instructor) => (
              <li
                key={instructor.id}
                className="p-4 bg-gray-100 rounded-md shadow"
              >
                <h4 className="text-lg font-bold">{instructor.name}</h4>
                <p className="text-sm text-gray-600">{instructor.email}</p>
                <button
                  className="px-3 py-2 mt-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600"
                  onClick={() => handleRequestReview(instructor.id)}
                  disabled={!!requestStatus} // Disable button if a request already exists
                >
                  {requestStatus ? "Already Requested" : "Request"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}