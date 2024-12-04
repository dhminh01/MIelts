"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns"; // Ensure you install date-fns: npm install date-fns
import { Button } from "@/components/ui/button";
import { useCurrentRole } from "@/hooks/use-current-role";
import { ROLE } from "@prisma/client";

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorName: "",
    authorEmail: "",
  });
  const [comments, setComments] = useState({});
  const [commentData, setCommentData] = useState({});
  const [selectedPostId, setSelectedPostId] = useState(null);
  const role = useCurrentRole();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);

      const initialComments = {};
      data.forEach((post) => {
        initialComments[post.id] = post.comments || [];
      });
      setComments(initialComments);
    }
    fetchPosts();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "PPP p"); // Format: Nov 29, 2024 at 12:34 PM
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentChange = (postId, e) => {
    const { name, value } = e.target;
    setCommentData((prev) => ({
      ...prev,
      [postId]: {
        ...prev[postId],
        [name]: value,
      },
    }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmitComment = async (postId, e) => {
    e.preventDefault();
    const { content, authorName, authorEmail } = commentData[postId] || {};

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, content, authorName, authorEmail }),
      });
      const newComment = await res.json();

      setComments((prev) => ({
        ...prev,
        [postId]: [...prev[postId], newComment],
      }));

      setCommentData((prev) => ({
        ...prev,
        [postId]: { content: "", authorName: "", authorEmail: "" },
      }));
      setSelectedPostId(null); // Close the comment form after submission
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId, postId) => {
    if (!commentId) {
      console.error("Invalid comment ID");
      return;
    }

    try {
      const res = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Update the state to remove the deleted comment
        setComments((prev) => ({
          ...prev,
          [postId]: prev[postId].filter((comment) => comment.id !== commentId),
        }));
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center text-slate-600">
        ~~~ Blog ~~~
      </h1>
      <div className="flex justify-center mb-6">
        <Button
          onClick={() => setShowForm((prev) => !prev)}
          className="px-6 py-2 text-white"
        >
          {showForm ? "Ẩn Form" : "Tạo Bài Viết"}
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmitPost}
          className="p-6 mb-6 space-y-4 bg-white rounded shadow-lg"
        >
          <input
            type="text"
            name="title"
            placeholder="Tiêu đề"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <textarea
            name="content"
            placeholder="Nội dung"
            value={formData.content}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg"
          ></textarea>
          <input
            type="text"
            name="authorName"
            placeholder="Tên tác giả"
            value={formData.authorName}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="authorEmail"
            placeholder="Email"
            value={formData.authorEmail}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <Button
            type="submit"
            className="px-6 py-2 bg-green-300 rounded-lg text-slate-600 "
          >
            Đăng Bài
          </Button>
        </form>
      )}

      <div className="space-y-6">
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">Không có bài viết nào.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-6 bg-white border rounded shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-800">{post.title}</h2>
              <p className="mt-4 text-gray-700">{post.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                {post.authorName} - {post.authorEmail}
              </p>
              <p className="text-xs text-gray-400">
                Đăng vào: {formatDate(post.createdAt)}
              </p>
              <div className="mt-6">
                <h3 className="text-lg font-bold text-gray-800">Bình luận:</h3>
                {comments[post.id]?.length === 0 ? (
                  <p className="text-gray-600">Chưa có bình luận nào.</p>
                ) : (
                  comments[post.id]?.map((comment) => (
                    <div key={comment.id} className="pb-2 mt-2 border-b">
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-sm text-gray-500">
                        {comment.authorName} - {comment.authorEmail}
                      </p>
                      <p className="text-xs text-gray-400">
                        Đăng vào: {formatDate(comment.createdAt)}
                      </p>
                      {role === ROLE.ADMIN && (
                        <button
                          onClick={() =>
                            handleDeleteComment(comment.id, post.id)
                          }
                          className="mt-2 text-red-500 hover:underline"
                        >
                          Xóa bình luận
                        </button>
                      )}
                    </div>
                  ))
                )}

                {selectedPostId === post.id ? (
                  <form
                    onSubmit={(e) => handleSubmitComment(post.id, e)}
                    className="mt-4 space-y-3"
                  >
                    <textarea
                      name="content"
                      placeholder="Viết bình luận..."
                      value={commentData[post.id]?.content || ""}
                      onChange={(e) => handleCommentChange(post.id, e)}
                      required
                      className="w-full p-3 border rounded-lg"
                    ></textarea>
                    <input
                      type="text"
                      name="authorName"
                      placeholder="Tên"
                      value={commentData[post.id]?.authorName || ""}
                      onChange={(e) => handleCommentChange(post.id, e)}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                    <input
                      type="email"
                      name="authorEmail"
                      placeholder="Email"
                      value={commentData[post.id]?.authorEmail || ""}
                      onChange={(e) => handleCommentChange(post.id, e)}
                      required
                      className="w-full p-3 border rounded-lg"
                    />
                    <Button
                      type="submit"
                      className="px-6 py-2 text-white rounded-lg"
                    >
                      Gửi bình luận
                    </Button>
                    <Button
                      variant="ghost"
                      type="button"
                      onClick={() => setSelectedPostId(null)}
                      className="ml-4 text-gray-600 hover:underline"
                    >
                      Hủy
                    </Button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSelectedPostId(post.id)}
                    className="mt-4 text-blue-500 hover:underline"
                  >
                    Thêm bình luận
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
