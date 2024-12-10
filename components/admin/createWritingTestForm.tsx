"use client";

import { useState } from "react";

const CreateWritingTest = () => {
  const [formData, setFormData] = useState({
    title: "",
    task1Title: "",
    task2Title: "",
    task1_description: "",
    task2_description: "",
    task1_image: "", // Store image URL as string
    task2_image: "", // Store image URL as string
    task1_word_limit: 150,
    task2_word_limit: 250,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const { name } = e.target;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/admin/create-writing-test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert("Writing test created successfully!");
        setFormData({
          title: "",
          task1Title: "",
          task2Title: "",
          task1_description: "",
          task2_description: "",
          task1_image: "",
          task2_image: "",
          task1_word_limit: 150,
          task2_word_limit: 250,
        });
      }
    } catch (error) {
      alert("Error creating test: " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Test Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="task1Title"
        value={formData.task1Title}
        onChange={handleChange}
        placeholder="Task 1 Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        name="task2Title"
        value={formData.task2Title}
        onChange={handleChange}
        placeholder="Task 2 Title"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="task1_description"
        value={formData.task1_description}
        onChange={handleChange}
        placeholder="Task 1 Description"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <textarea
        name="task2_description"
        value={formData.task2_description}
        onChange={handleChange}
        placeholder="Task 2 Description"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />

      {/* Image URL Inputs
      <input
        type="text"
        name="task1_image"
        value={formData.task1_image}
        onChange={handleChange}
        placeholder="Task 1 Image URL"
        className="w-full p-2 border border-gray-300 rounded-md"
      /> */}

      <div>
        <label className="block text-sm font-medium">Task 1 image:</label>
        <input
          type="file"
          name="task1_image"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
          required
        />
        {formData.task1_image && (
          <img
            src={formData.task1_image}
            alt="ID Preview"
            className="w-auto h-20 mt-2"
          />
        )}
      </div>

      {/* <input
        type="text"
        name="task2_image"
        value={formData.task2_image}
        onChange={handleChange}
        placeholder="Task 2 Image URL"
        className="w-full p-2 border border-gray-300 rounded-md"
      /> */}
      <div>
        <label className="block text-sm font-medium">Task 2 image:</label>
        <input
          type="file"
          name="task2_image"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
          required
        />
        {formData.task2_image && (
          <img
            src={formData.task2_image}
            alt="ID Preview"
            className="w-auto h-20 mt-2"
          />
        )}
      </div>

      <input
        type="number"
        name="task1_word_limit"
        value={formData.task1_word_limit}
        onChange={handleChange}
        placeholder="Task 1 Word Limit"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      <input
        type="number"
        name="task2_word_limit"
        value={formData.task2_word_limit}
        onChange={handleChange}
        placeholder="Task 2 Word Limit"
        required
        className="w-full p-2 border border-gray-300 rounded-md"
      />

      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-400"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateWritingTest;
