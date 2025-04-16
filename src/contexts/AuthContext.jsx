import React, { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api";
import { getStorageItem, setStorageItem } from "../utils/localStorage";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for saved auth token in localStorage
    const token = localStorage.getItem("authToken");
    if (token) {
      getUserProfile(token)
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Failed to get user profile:", err);
          localStorage.removeItem("authToken");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const response = await fetch(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.access_token);

      // Get user profile
      const userProfile = await getUserProfile(data.access_token);
      setCurrentUser(userProfile);
      return userProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const signup = async (name, email, password) => {
    try {
      setError(null);

      // First check if email is available
      // const emailCheckResponse = await fetch(
      //   "https://api.escuelajs.co/api/v1/users/is-available",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email }),
      //   }
      // );

      // console.log

      // if (!emailCheckResponse.ok) {
      //   throw new Error("Failed to check email availability");
      // }

      // const emailCheckData = await emailCheckResponse.json();

      // if (!emailCheckData.isAvailable) {
      //   throw new Error("Email is already in use");
      // }

      // If email is available, proceed with signup
      const response = await fetch("https://api.escuelajs.co/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          avatar: "https://picsum.photos/800",
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      // After signup, login the user
      return await login(email, password);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateUserProfile = async (userData) => {
    try {
      setError(null);
      const token = localStorage.getItem("authToken");

      if (!token || !currentUser) {
        throw new Error("You must be logged in to update your profile");
      }

      const response = await fetch(
        `https://api.escuelajs.co/api/v1/users/${currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedUser = await response.json();
      setCurrentUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setCurrentUser(null);
    toast.info("You have been logged out");
  };

  // Save an order to local storage
  const saveOrder = (orderData) => {
    if (!currentUser) return;

    // Generate a unique order ID
    const orderId = Date.now();
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      status: "Completed",
      userId: currentUser.id,
      ...orderData,
    };

    // Get existing orders and add new order
    const userOrdersKey = `orders_${currentUser.id}`;
    const existingOrders = getStorageItem(userOrdersKey, []);
    const updatedOrders = [order, ...existingOrders];

    // Save updated orders list
    setStorageItem(userOrdersKey, updatedOrders);

    return order;
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout,
    updateUserProfile,
    saveOrder,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
