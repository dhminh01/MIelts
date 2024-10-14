import React from "react";
import { Input } from "../ui/input";
import DropdownSkillFilter from "../filter/dropdown-skills-filter";

export default function SearchPractices() {
  return (
    <div className="flex gap-10 px-5">
      <Input
        className="w-full"
        type="search"
        placeholder="Tìm kiếm bài luyện thi..."
      />
      <DropdownSkillFilter />
    </div>
  );
}
