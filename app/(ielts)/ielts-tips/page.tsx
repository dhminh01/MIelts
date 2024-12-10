"use client";

import React, { useEffect, useState } from "react";

type IeltsTip = {
  id: string;
  skill: string;
  title: string;
  description: string | null;
  content: string;
};

export default function IeltsTipsPage() {
  const [tips, setTips] = useState<IeltsTip[]>([]);
  const [groupedTips, setGroupedTips] = useState<{ [key: string]: IeltsTip[] }>(
    {}
  );
  const [visibleSkill, setVisibleSkill] = useState<string | null>(null); // state để theo dõi kỹ năng đang hiển thị tips

  // Định nghĩa màu nền cho từng kỹ năng
  const skillBackgrounds: { [key: string]: string } = {
    LISTENING: "bg-blue-400",
    READING: "bg-green-400",
    WRITING: "bg-yellow-400",
    SPEAKING: "bg-red-400",
  };

  useEffect(() => {
    // Fetch data from the API route
    const fetchTips = async () => {
      try {
        const response = await fetch("/api/ielts-tips");
        if (response.ok) {
          const data = await response.json();
          setTips(data);

          // Group tips by skill
          const grouped = data.reduce(
            (acc: { [key: string]: IeltsTip[] }, tip: IeltsTip) => {
              if (!acc[tip.skill]) {
                acc[tip.skill] = [];
              }
              acc[tip.skill].push(tip);
              return acc;
            },
            {}
          );

          setGroupedTips(grouped);
        } else {
          console.error("Failed to fetch IELTS tips");
        }
      } catch (error) {
        console.error("Error fetching IELTS tips:", error);
      }
    };

    fetchTips();
  }, []);

  const handleSkillClick = (skill: string) => {
    setVisibleSkill(visibleSkill === skill ? null : skill); // Toggle hiển thị khi click vào kỹ năng
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold text-slate-600">
        ~~~ IELTS Tips & Tricks ~~~
      </h1>
      <div className="w-full py-5 space-y-6">
        {Object.keys(groupedTips).map((skill) => (
          <div key={skill} className="w-full">
            {/* Tạo tiêu đề với màu nền tương ứng cho kỹ năng và thêm sự kiện click */}
            <h2
              className={`text-2xl font-semibold mb-4 p-3 rounded-lg ${skillBackgrounds[skill]} text-white cursor-pointer`}
              onClick={() => handleSkillClick(skill)} // Khi click vào kỹ năng
            >
              {skill}
            </h2>

            {/* Hiển thị các tips của kỹ năng nếu kỹ năng này được chọn */}
            {visibleSkill === skill && (
              <div className="space-y-4">
                {groupedTips[skill].map((tip) => (
                  <div
                    key={tip.id}
                    className="p-4 bg-white border border-gray-300 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold">{tip.title}</h3>
                    {tip.description && (
                      <p className="text-sm italic text-gray-500">
                        {tip.description}
                      </p>
                    )}
                    <p className="mt-2">{tip.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
