import CreateReadingTest from "@/components/admin/createReadingTestForm";
import React from "react";

const CreateReadingTestPage = () => {
  return (
    <div className="flex flex-col">
      <h1 className="flex items-center justify-center p-5 text-3xl font-bold text-slate-500">
        CREATE READING TEST:
      </h1>
      <CreateReadingTest />
    </div>
  );
};

export default CreateReadingTestPage;
