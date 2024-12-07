"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation"; // Import router
import { useSession } from "next-auth/react";
import { FaMicrophone, FaPause, FaStop } from "react-icons/fa";

const SpeakingTestPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { status } = useSession();
  const router = useRouter(); // Router for navigation
  const [test, setTest] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPart, setCurrentPart] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURLs, setAudioURLs] = useState<string[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [message, setMessage] = useState<string | null>(null); // Message state
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
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
  }, [id]);

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 3000);
  };

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

        const formData = new FormData();
        formData.append("audio", audioFile);

        const response = await fetch("/api/ielts/upload-audio", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          setAudioURLs((prev) => {
            const updatedAudioURLs = [...prev];
            updatedAudioURLs[currentPart] = data.audioPath;
            return updatedAudioURLs;
          });
          showMessage("Save audio successfully!");
        } else {
          showMessage("Error saving audio.");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setTimeElapsed(0);

      intervalRef.current = setInterval(() => {
        setTimeElapsed((prevTime) => prevTime + 1);
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
        intervalRef.current = setInterval(() => {
          setTimeElapsed((prevTime) => prevTime + 1);
        }, 1000);
      } else {
        mediaRecorderRef.current.pause();
        setIsPaused(true);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
  };

  const handleSubmitRecording = async () => {
    if (audioURLs[currentPart]) {
      const testHistoryData = {
        userId: status === "authenticated" ? "user-id" : "",
        testId: id,
        audioURL: audioURLs[currentPart],
        userAnswers: JSON.stringify({
          response: "User's recorded answer here",
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
          showMessage("Save test to history!");
          setTimeout(() => {
            router.push("/user-profile/practice-history");
          }, 2000); // Redirect after 2 seconds
        } else {
          showMessage("Error saving test history.");
        }
      } catch (err) {
        console.error("Error saving test history:", err);
        showMessage("Error saving test history.");
      }
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  const handlePreviousPart = () => {
    if (currentPart > 0) setCurrentPart(currentPart - 1);
  };

  const handleNextPart = () => {
    if (test && currentPart < test.SpeakingPart.length - 1)
      setCurrentPart(currentPart + 1);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!test) return <div>Speaking test not found.</div>;

  const currentSpeakingPart = test.SpeakingPart[currentPart];

  return (
    <div className="container py-10 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">{test.title}</h1>
      {message && (
        <div className="p-4 mb-4 text-white bg-green-500 rounded">
          {message}
        </div>
      )}
      <div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold">
            Part {currentPart + 1}: {currentSpeakingPart.title}
          </h3>
          <p className="italic">{currentSpeakingPart.description}</p>
          <ul className="pl-5 mt-4 list-decimal">
            {currentSpeakingPart.SpeakingQuestion.map((question: any) => (
              <li key={question.id} className="mb-4">
                <p>{question.questionText}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          {isRecording ? (
            <button
              className="px-4 py-2 text-white bg-red-500 rounded"
              onClick={handleStopRecording}
            >
              <FaStop className="inline-block mr-2" />
              Stop Recording
            </button>
          ) : (
            <button
              className="px-4 py-2 text-white bg-blue-500 rounded"
              onClick={handleStartRecording}
              disabled={audioURLs[currentPart] !== undefined}
            >
              <FaMicrophone className="inline-block mr-2" />
              Start Recording
            </button>
          )}
          {isRecording && (
            <button
              className="px-4 py-2 ml-4 text-white bg-yellow-500 rounded"
              onClick={handlePauseRecording}
            >
              <FaPause className="inline-block mr-2" />
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}
          <p className="mt-2 text-sm text-gray-600">
            Time elapsed: {formatTime(timeElapsed)}
          </p>
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 mr-4 text-black bg-gray-300 rounded"
            onClick={handlePreviousPart}
            disabled={currentPart === 0}
          >
            Previous Part
          </button>
          <button
            className="px-4 py-2 text-black bg-gray-300 rounded"
            onClick={handleNextPart}
            disabled={currentPart === test.SpeakingPart.length - 1}
          >
            Next Part
          </button>
        </div>

        <div className="mt-6">
          <button
            className="px-4 py-2 text-white bg-green-500 rounded"
            onClick={handleSubmitRecording}
            disabled={audioURLs.every((url) => url === undefined)}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpeakingTestPage;
