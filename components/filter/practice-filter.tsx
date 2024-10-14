import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import {
  BookHeadphones,
  BookOpenText,
  Home,
  MicVocal,
  PenTool,
} from "lucide-react";

export default async function PracticesFilter() {
  return (
    <div className="flex items-center h-5 p-10 space-x-4 text-xl">
      {/* Static button for ALL SKILLS */}
      <Button variant={"ghost"} className="hover:bg-sky-300">
        <Home size={"30px"} className="pr-2" />
        <Link href={`/practice-libraries/filter/all-skills`}>ALL SKILLS</Link>
      </Button>

      <Button variant={"ghost"} className="hover:bg-purple-300">
        <BookHeadphones size={"30px"} className="pr-2" />
        <Link href={`/practice-libraries/filter/listening`}>LISTENING</Link>
      </Button>

      <Button variant={"ghost"} className="hover:bg-green-300">
        <BookOpenText size={"30px"} className="pr-2" />
        <Link href={`/practice-libraries/filter/reading`}>READING</Link>
      </Button>

      <Button variant={"ghost"} className="hover:bg-orange-200">
        <PenTool size={"30px"} className="pr-2" />
        <Link href={`/practice-libraries/filter/writing`}>WRITING</Link>
      </Button>

      <Button variant={"ghost"} className="hover:bg-slate-300">
        <MicVocal size={"30px"} className="pr-2" />
        <Link href={`/practice-libraries/filter/speaking`}>SPEAKING</Link>
      </Button>
    </div>
  );
}
