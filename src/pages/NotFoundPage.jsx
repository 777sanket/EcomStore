import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/common/Button";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Page not found
          </h2>
          <p className="mt-2 text-base text-gray-500">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Go back home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
