import InstructorRegistrationForm from "@/components/InstructorRegistrationForm";

const InstructorRegistrationPage = () => {
  return (
    <div className="max-w-xl p-4 mx-auto mt-10 border rounded shadow">
      <h1 className="mb-4 text-2xl font-semibold text-center">
        Instructor Registration
      </h1>
      <InstructorRegistrationForm />
    </div>
  );
};

export default InstructorRegistrationPage;
