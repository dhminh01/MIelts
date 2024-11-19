"use client";

import { useState } from "react";

const CreateWritingTest = () => {
  const [selectedFileTask1, setSelectedFileTask1] = useState<File | null>(null);
  const [selectedFileTask2, setSelectedFileTask2] = useState<File | null>(null);
  const [imageURLTask1, setImageURLTask1] = useState<string | null>(null);
  const [imageURLTask2, setImageURLTask2] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    task1Title: "",
    task2Title: "",
    task1_description: "",
    task2_description: "",
    task1_image: null, // Store file object
    task2_image: null, // Store file object
    task1_word_limit: 250,
    task2_word_limit: 250,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    task: string
  ) => {
    const file = event.target.files?.[0] || null;
    if (task === "task1") {
      setSelectedFileTask1(file);
      if (file) {
        const url = URL.createObjectURL(file);
        setImageURLTask1(url);
      }
    } else if (task === "task2") {
      setSelectedFileTask2(file);
      if (file) {
        const url = URL.createObjectURL(file);
        setImageURLTask2(url);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data to be sent with file upload
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("task1Title", formData.task1Title);
    formDataToSend.append("task2Title", formData.task2Title);
    formDataToSend.append("task1_description", formData.task1_description);
    formDataToSend.append("task2_description", formData.task2_description);
    formDataToSend.append(
      "task1_word_limit",
      formData.task1_word_limit.toString()
    );
    formDataToSend.append(
      "task2_word_limit",
      formData.task2_word_limit.toString()
    );

    if (selectedFileTask1)
      formDataToSend.append("task1_image", selectedFileTask1);
    if (selectedFileTask2)
      formDataToSend.append("task2_image", selectedFileTask2);

    try {
      const res = await fetch("/api/admin/create-writing-test", {
        method: "POST",
        body: formDataToSend,
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
          task1_image: null,
          task2_image: null,
          task1_word_limit: 250,
          task2_word_limit: 250,
        });
        setSelectedFileTask1(null);
        setSelectedFileTask2(null);
        setImageURLTask1(null);
        setImageURLTask2(null);
      }
    } catch (error) {
      alert("Error creating test: " + error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      className="space-y-4"
    >
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

      {/* File Upload Inputs */}
      <input
        type="file"
        onChange={(e) => handleFileChange(e, "task1")}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {imageURLTask1 && (
        <img src={imageURLTask1} alt="Task 1 preview" className="mt-2" />
      )}

      <input
        type="file"
        onChange={(e) => handleFileChange(e, "task2")}
        className="w-full p-2 border border-gray-300 rounded-md"
      />
      {imageURLTask2 && (
        <img src={imageURLTask2} alt="Task 2 preview" className="mt-2" />
      )}

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
        className="px-4 py-2 text-white bg-blue-500 rounded-md"
      >
        Create Test
      </button>
    </form>
  );
};

export default CreateWritingTest;
