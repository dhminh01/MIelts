"use client";

import { useEffect, useState } from "react";

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch("/api/admin/get-instructor-register");
        if (!response.ok) {
          throw new Error("Failed to fetch instructors");
        }
        const data = await response.json();
        setInstructors(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchInstructors();
  }, []);

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  const openImage = (imageUrl: string) => setSelectedImage(imageUrl);
  const closeImage = () => setSelectedImage(null);

  return (
    <div className="container py-6 mx-auto">
      <h1 className="flex items-center justify-center mb-4 text-2xl font-bold ">
        Danh sách giảng viên đăng ký:
      </h1>
      {instructors.length === 0 ? (
        <p>No instructors found.</p>
      ) : (
        <>
          <table className="w-full border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border border-gray-300">Name</th>
                <th className="px-4 py-2 border border-gray-300">DOB</th>
                <th className="px-4 py-2 border border-gray-300">Phone</th>
                <th className="px-4 py-2 border border-gray-300">Hometown</th>
                <th className="px-4 py-2 border border-gray-300">Address</th>
                <th className="px-4 py-2 border border-gray-300">ID Card</th>
                <th className="px-4 py-2 border border-gray-300">
                  Certificate
                </th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {new Date(instructor.dob).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.phone}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.hometown}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.address}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.idCardImage ? (
                      <img
                        src={instructor.idCardImage}
                        alt="ID Card"
                        className="object-cover w-20 h-20 cursor-pointer"
                        onClick={() => openImage(instructor.idCardImage)}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {instructor.certProof ? (
                      <img
                        src={instructor.certProof}
                        alt="Certificate"
                        className="object-cover w-20 h-20 cursor-pointer"
                        onClick={() => openImage(instructor.certProof)}
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal hiển thị ảnh */}
          {selectedImage && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
              onClick={closeImage}
            >
              <img
                src={selectedImage}
                alt="Selected"
                className="max-w-full max-h-full border-4 border-white"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default InstructorList;
