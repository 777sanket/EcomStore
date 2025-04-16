import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const UserDetailsForm = ({ user }) => {
  const { updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    avatar: user?.avatar || "",
  });

  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear success and error messages when form is changed
    setSuccessMessage("");
    setError("");
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      setError("Name and email are required");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Password validation (if changing password)
    if (showPasswordFields) {
      if (!formData.currentPassword) {
        setError("Current password is required to change password");
        return false;
      }

      if (formData.newPassword) {
        if (formData.newPassword.length < 6) {
          setError("New password must be at least 6 characters");
          return false;
        }

        if (formData.newPassword !== formData.confirmPassword) {
          setError("New passwords do not match");
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      // Check if email is available if it has been changed
      // if (formData.email !== user.email) {
      //   const emailAvailability = await checkEmailAvailability(formData.email);
      //   console.log("Email availability response:", emailAvailability);
      //   if (!emailAvailability.isAvailable) {
      //     setError("Email is already in use by another account");
      //     setLoading(false);
      //     return;
      //   }
      // }

      // Prepare update data
      const updateData = {
        name: formData.name,
        email: formData.email,
      };

      // Add password if changing password
      if (showPasswordFields && formData.newPassword) {
        updateData.password = formData.newPassword;
      }

      // Add avatar if changed
      if (formData.avatar && formData.avatar !== user.avatar) {
        updateData.avatar = formData.avatar;
      }

      // Call API to update profile
      await updateUserProfile(updateData, formData.currentPassword);

      setSuccessMessage("Profile updated successfully");

      // Clear password fields after successful update
      setFormData((prevData) => ({
        ...prevData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setShowPasswordFields(false);
    } catch (err) {
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to check if email is available
  // const checkEmailAvailability = async (email) => {
  //   try {
  //     const response = await fetch(
  //       "https://api.escuelajs.co/api/v1/users/is-available",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to check email availability");
  //     }

  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error checking email availability:", error);
  //     throw error;
  //   }
  // };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          Personal Information
        </h2>

        {successMessage && (
          <div className="mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-md">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* User avatar */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Profile Picture
            </label>
            <div className="mt-2 flex items-center">
              <span className="h-16 w-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                <img
                  src={formData.avatar || "https://picsum.photos/800"}
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </span>
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-700"
                >
                  Avatar URL
                </label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="https://example.com/avatar.jpg"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter a URL for your profile picture
                </p>
              </div>
            </div>
          </div>

          {/* Name field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Email field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Toggle password change */}
          <div>
            <button
              type="button"
              onClick={() => setShowPasswordFields(!showPasswordFields)}
              className="text-sm text-blue-600 hover:text-blue-500 font-medium"
            >
              {showPasswordFields
                ? "Cancel Password Change"
                : "Change Password"}
            </button>
          </div>

          {/* Password fields */}
          {showPasswordFields && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required={showPasswordFields}
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required={showPasswordFields}
                  minLength={6}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Minimum 6 characters
                </p>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required={showPasswordFields}
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserDetailsForm;
