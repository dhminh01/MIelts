"use client"; // This makes the component a Client Component

import React from "react";
import { Button } from "../ui/button";
import {
  BookHeadphones,
  BookOpenText,
  Home,
  MicVocal,
  PenTool,
} from "lucide-react";

export default function PracticesFilter() {
  return (
    <div className="flex flex-col items-center justify-center p-2 space-y-4 text-xl bg-gray-100 rounded-lg sm:flex-row sm:space-x-4 sm:space-y-0">
      {/* Static button for ALL SKILLS */}
      <Button
        variant={"ghost"}
        className="w-full hover:bg-sky-300 sm:w-auto"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/all-skills`)
        } // Ensures a full reload
      >
        <Home size={"30px"} className="pr-2" />
        ALL SKILLS
      </Button>

      <Button
        variant={"ghost"}
        className="w-full hover:bg-purple-300 sm:w-auto"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/listening`)
        } // Ensures a full reload
      >
        <BookHeadphones size={"30px"} className="pr-2" />
        LISTENING
      </Button>

      <Button
        variant={"ghost"}
        className="w-full hover:bg-green-300 sm:w-auto"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/reading`)
        } // Ensures a full reload
      >
        <BookOpenText size={"30px"} className="pr-2" />
        READING
      </Button>

      <Button
        variant={"ghost"}
        className="w-full hover:bg-orange-200 sm:w-auto"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/writing`)
        } // Ensures a full reload
      >
        <PenTool size={"30px"} className="pr-2" />
        WRITING
      </Button>

      <Button
        variant={"ghost"}
        className="w-full hover:bg-slate-300 sm:w-auto"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/speaking`)
        } // Ensures a full reload
      >
        <MicVocal size={"30px"} className="pr-2" />
        SPEAKING
      </Button>
    </div>
  );
}
