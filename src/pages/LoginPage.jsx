import React from "react";
import LoginForm from "../components/auth/LoginForm";

const LoginPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
