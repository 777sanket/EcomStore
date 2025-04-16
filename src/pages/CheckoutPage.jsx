import React from "react";
import Checkout from "../components/cart/Checkout";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="bg-white">
      <Checkout />
    </div>
  );
};

export default CheckoutPage;
