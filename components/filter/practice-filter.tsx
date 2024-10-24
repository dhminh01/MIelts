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
    <div className="flex items-center h-5 p-10 space-x-4 text-xl">
      {/* Static button for ALL SKILLS */}
      <Button
        variant={"ghost"}
        className="hover:bg-sky-300"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/all-skills`)
        } // Ensures a full reload
      >
        <Home size={"30px"} className="pr-2" />
        ALL SKILLS
      </Button>

      <Button
        variant={"ghost"}
        className="hover:bg-purple-300"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/listening`)
        } // Ensures a full reload
      >
        <BookHeadphones size={"30px"} className="pr-2" />
        LISTENING
      </Button>

      <Button
        variant={"ghost"}
        className="hover:bg-green-300"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/reading`)
        } // Ensures a full reload
      >
        <BookOpenText size={"30px"} className="pr-2" />
        READING
      </Button>

      <Button
        variant={"ghost"}
        className="hover:bg-orange-200"
        onClick={() =>
          (window.location.href = `/practice-libraries/filter/writing`)
        } // Ensures a full reload
      >
        <PenTool size={"30px"} className="pr-2" />
        WRITING
      </Button>

      <Button
        variant={"ghost"}
        className="hover:bg-slate-300"
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
