import React from "react";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <SignupForm />
    </div>
  );
};

export default SignupPage;
