"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(1, "Tên không được để trống"),
  dob: z.string().min(1, "Ngày sinh không được để trống"),
  phone: z.string().min(1, "Số điện thoại không được để trống"),
  hometown: z.string().min(1, "Quê quán không được để trống"),
  address: z.string().min(1, "Địa chỉ không được để trống"),
  idCardImage: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, "File phải nhỏ hơn 5MB"),
  ieltsProof: z
    .instanceof(File)
    .refine((file) => file.size < 5 * 1024 * 1024, "File phải nhỏ hơn 5MB"),
});

type FormData = z.infer<typeof registrationSchema>;

const InstructorRegistrationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registrationSchema),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [ieltsFile, setIeltsFile] = useState<File | null>(null);

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("dob", data.dob);
    formData.append("phone", data.phone);
    formData.append("hometown", data.hometown);
    formData.append("address", data.address);
    if (selectedFile) formData.append("idCardImage", selectedFile);
    if (ieltsFile) formData.append("ieltsProof", ieltsFile);

    // Send the form data to the backend
    const response = await fetch("/api/instructor-registration", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg p-6 mx-auto space-y-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-center">Đăng ký Giảng viên</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
            Họ và Tên
          </label>
          <input
            {...register("name")}
            type="text"
            id="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">
            Ngày sinh
          </label>
          <input
            {...register("dob")}
            type="date"
            id="dob"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.dob && <p className="text-sm text-red-500">{errors.dob.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
            Số điện thoại
          </label>
          <input
            {...register("phone")}
            type="text"
            id="phone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="hometown" className="block text-sm font-semibold text-gray-700">
            Quê quán
          </label>
          <input
            {...register("hometown")}
            type="text"
            id="hometown"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.hometown && <p className="text-sm text-red-500">{errors.hometown.message}</p>}
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-semibold text-gray-700">
            Địa chỉ thường trú
          </label>
          <input
            {...register("address")}
            type="text"
            id="address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.address && <p className="text-sm text-red-500">{errors.address.message}</p>}
        </div>

        <div>
          <label htmlFor="idCardImage" className="block text-sm font-semibold text-gray-700">
            Chứng minh thư nhân dân
          </label>
          <input
            {...register("idCardImage")}
            type="file"
            accept="image/*"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.idCardImage && <p className="text-sm text-red-500">{errors.idCardImage.message}</p>}
        </div>

        <div>
          <label htmlFor="ieltsProof" className="block text-sm font-semibold text-gray-700">
            Chứng chỉ IELTS
          </label>
          <input
            {...register("ieltsProof")}
            type="file"
            accept="image/*, application/pdf"
            onChange={(e) => setIeltsFile(e.target.files?.[0] || null)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.ieltsProof && <p className="text-sm text-red-500">{errors.ieltsProof.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Đăng ký
        </button>
      </div>
    </form>
  );
};

export default InstructorRegistrationForm;
