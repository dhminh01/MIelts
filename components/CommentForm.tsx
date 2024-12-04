import { useState } from "react";

export default function CommentForm({ postId }) {
  const [formData, setFormData] = useState({
    content: "",
    authorName: "",
    authorEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, postId }),
      });
      alert("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <textarea
        name="content"
        placeholder="Nội dung bình luận"
        value={formData.content}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
      ></textarea>
      <input
        type="text"
        name="authorName"
        placeholder="Tên"
        value={formData.authorName}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="authorEmail"
        placeholder="Email"
        value={formData.authorEmail}
        onChange={handleInputChange}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        Gửi Bình Luận
      </button>
    </form>
  );
}
