"use client";

import { useState } from "react";

const InstructorRegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    phone: "",
    hometown: "",
    address: "",
    idCardImage: "",
    certProof: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("/api/instructor/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }

      setSuccessMessage("Instructor registration successful!");
      setFormData({
        name: "",
        dob: "",
        phone: "",
        hometown: "",
        address: "",
        idCardImage: "",
        certProof: "",
      });
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to submit form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Hometown</label>
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Address</label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium">ID Card Image</label>
        <input
          type="file"
          name="idCardImage"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
          required
        />
        {formData.idCardImage && (
          <img
            src={formData.idCardImage}
            alt="ID Preview"
            className="w-auto h-20 mt-2"
          />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium">Certification Proof</label>
        <input
          type="file"
          name="certProof"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full"
          required
        />
        {formData.certProof && (
          <img
            src={formData.certProof}
            alt="Certification Proof Preview"
            className="w-auto h-20 mt-2"
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Register"}
      </button>
      {successMessage && (
        <p className="mt-2 text-green-500">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-2 text-red-500">{errorMessage}</p>}
    </form>
  );
};

export default InstructorRegistrationForm;
