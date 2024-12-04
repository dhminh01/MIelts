"use client";

import { useEffect, useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { FaMicrophone, FaPause, FaStop } from "react-icons/fa"; // Import microphone icons

const SpeakingTestPage = ({ params }: { params: { id: string } }) => {
  const { id } = params; // Test ID from URL params
  const { status } = useSession(); // Session status
  const [test, setTest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Recording-related states and refs
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0); // Time elapsed in seconds
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]); // For storing audio data
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Interval for updating time elapsed

  useEffect(() => {
    console.log("Params:", params); // Log the params to check
    const fetchTest = async () => {
      try {
        const response = await fetch(`/api/ielts/showSpeakingTest?id=${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || "Error fetching test data.");
        } else {
          setTest(data.test);
        }
      } catch (err) {
        setError("Failed to fetch the Speaking test.");
      } finally {
        setLoading(false);
      }
    };

    fetchTest();
  }, [id, params]);

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/mp3",
        });
        const audioFile = new File([audioBlob], `recording-${Date.now()}.mp3`, {
          type: "audio/mp3",
        });

        // Save to public/save_audio
        const formData = new FormData();
        formData.append("audio", audioFile);

        const response = await fetch("/api/ielts/upload-audio", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setAudioURL(data.audioPath);
          alert("Recording saved successfully!");
        } else {
          alert("Error saving recording.");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimeElapsed(0); // Reset the timer when starting a new recording

      // Start the timer
      intervalRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1); // Increment time each second
      }, 1000);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert(
        "Error accessing microphone. Please check your device permissions."
      );
    }
  };

  const handlePauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume();
        setIsPaused(false);
        // Restart the timer
        intervalRef.current = setInterval(() => {
          setTimeElapsed((prevTime) => prevTime + 1); // Continue incrementing time
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        // Stop the timer
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      // Stop the timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  };

  const handleSubmitRecording = async () => {
    if (audioURL) {
      const testHistoryData = {
        userId: status === "authenticated" ? "user-id" : "", // Replace with actual user ID
        testId: id, // Use 'testId' here, not 'id'
        audioURL: audioURL, // Path to the saved audio
        userAnswers: JSON.stringify({
          response: "User's recorded answer here", // Replace with actual answers
        }),
      };

      try {
        const response = await fetch("/api/ielts/speaking-test/save", {
          method: "POST",
          body: JSON.stringify(testHistoryData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          alert("Test history saved successfully!");
        } else {
          alert("Error saving test history.");
        }
      } catch (err) {
        console.error("Error saving test history:", err);
        alert("Error saving test history.");
      }
    }
  };
  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  if (loading) return <div>Loading...</div>;

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!test) {
    return <div>Speaking test not found.</div>;
  }

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">{test.title}</h1>

      {/* Display timing guidelines */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Timing Guidelines</h2>
        <ul className="pl-5 mt-2 list-disc">
          {Object.entries(test.timingGuidelines).map(([part, timing]) => (
            <li key={part}>
              <strong>{part}:</strong> {timing}
            </li>
          ))}
        </ul>
      </div>

      {/* Display common topics */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Common Topics</h2>
        <ul className="pl-5 mt-2 list-disc">
          {test.topics.map((topic: string, index: number) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>

      {/* Display questions */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Questions</h2>
        <ul className="pl-5 list-disc">
          {test.questions.map((question: any) => (
            <li key={question.id} className="mb-4">
              <p>{question.questionText}</p>
              <p>
                <strong>Response Type:</strong> {question.responseType}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Recording functionality */}
      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">Record Your Answer</h2>
        <div className="flex gap-4">
          <button
            onClick={handleStartRecording}
            disabled={isRecording}
            className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600 disabled:bg-gray-400"
          >
            <FaMicrophone size={24} />
          </button>
          <button
            onClick={handlePauseRecording}
            disabled={!isRecording}
            className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600 disabled:bg-gray-400"
          >
            {isPaused ? <FaMicrophone size={24} /> : <FaPause size={24} />}
          </button>
          <button
            onClick={handleStopRecording}
            disabled={!isRecording}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-gray-400"
          >
            <FaStop size={24} />
          </button>
        </div>

        {/* Recording time */}
        <div className="mt-6">
          <div className="mb-2 text-lg font-semibold">
            Recording Time: {formatTime(timeElapsed)}
          </div>
        </div>

        {audioURL && (
          <div className="mt-4">
            <p className="font-semibold text-green-500">Audio Recorded!</p>
            <audio controls src={audioURL}></audio>
          </div>
        )}
      </div>

      {/* Submit button */}
      <div className="mt-6">
        <button
          onClick={handleSubmitRecording}
          disabled={!audioURL}
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default SpeakingTestPage;
