import React from "react";
import SignupForm from "../components/auth/SignupForm";

const SignupPage = () => {
  return (
    <div className="relative bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt=""
      />
      <div className="z-1 p-4 sm:p-6 lg:p-8">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
