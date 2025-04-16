import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import UserDetailsForm from "../components/profile/UserDetailsForm";
import OrderHistory from "../components/profile/OrderHistory";
import { getStorageItem } from "../utils/localStorage";

const ProfilePage = () => {
  const { currentUser, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load user orders from localStorage
    if (currentUser) {
      const userOrders = getStorageItem(`orders_${currentUser.id}`, []);
      setOrders(userOrders);
    }
  }, [currentUser]);

  // Redirect to login if not authenticated
  if (!loading && !currentUser) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">My Account</h1>

      {/* Navigation tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`${
              activeTab === "profile"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Profile Details
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`${
              activeTab === "orders"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Order History
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === "profile" ? (
          <UserDetailsForm user={currentUser} />
        ) : (
          <OrderHistory orders={orders} />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
