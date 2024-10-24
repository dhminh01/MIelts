"use client";

import { revalidatePath } from "next/cache";
import { useState, useEffect } from "react";

export default function AdminImportDataPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [tests, setTests] = useState([]);

  // Hàm để lấy danh sách bài thi từ API
  const fetchTests = async () => {
    const response = await fetch("/api/admin/tests");
    const data = await response.json();
    if (response.ok) {
      setTests(data.tests);
    } else {
      setMessage("Failed to fetch tests.");
    }
  };

  // Gọi hàm lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchTests();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage("Please select a file first.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        const existingTestTitles = tests.map((test) => test.title); // Lấy danh sách tiêu đề bài thi hiện có

        const testsToImport = jsonData.tests.filter(
          (test) => !existingTestTitles.includes(test.title)
        ); // Kiểm tra bài thi chưa tồn tại

        if (testsToImport.length === 0) {
          setMessage("All tests already exist in the database.");
          return;
        }

        // Nếu có bài thi mới để nhập
        const response = await fetch("/api/admin/import-test", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tests: testsToImport }), // Gửi chỉ các bài thi mới
        });

        const result = await response.json();

        if (response.ok) {
          setMessage(result.message);
          setSelectedFile(null); // Reset the selected file to null
          fetchTests(); // Làm mới danh sách bài thi sau khi nhập thành công
        } else {
          setMessage("Failed to import data.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Error parsing the JSON file.");
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleDelete = async (id: string) => {
    const response = await fetch("/api/admin/delete-test", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage(result.message);
      fetchTests(); // Làm mới danh sách bài thi sau khi xóa thành công
    } else {
      setMessage("Failed to delete test.");
    }
  };

  return (
    <div>
      <h1>Admin - Import Data</h1>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {message && <p>{message}</p>}

      <h2>Test List</h2>
      <ul>
        {tests.map((test) => (
          <li key={test.id}>
            {test.title}
            <button onClick={() => handleDelete(test.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
