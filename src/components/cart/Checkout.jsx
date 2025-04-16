import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import Button from "../common/Button";

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const { currentUser, saveOrder } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: currentUser?.email || "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    paymentMethod: "credit",
    cardName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is being edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required fields
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "address",
      "city",
      "state",
      "postalCode",
      "country",
      "cardName",
      "cardNumber",
      "expirationDate",
      "cvv",
    ];

    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = "This field is required";
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Card number validation (16 digits)
    if (
      formData.cardNumber &&
      !/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ""))
    ) {
      newErrors.cardNumber = "Please enter a valid 16-digit card number";
    }

    // Expiration date (MM/YY)
    if (
      formData.expirationDate &&
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expirationDate)
    ) {
      newErrors.expirationDate = "Please use MM/YY format";
    }

    // CVV (3-4 digits)
    if (formData.cvv && !/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "Please enter a valid CVV";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    // Calculate shipping based on order total
    const shipping = totalPrice > 100 ? 0 : 10;
    const tax = totalPrice * 0.05; // 5% tax rate
    const orderTotal = totalPrice + shipping + tax;

    // Prepare items data
    const items = cart.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.images && item.images.length > 0 ? item.images[0] : null,
    }));

    // Prepare shipping address
    const shippingAddress = {
      name: `${formData.firstName} ${formData.lastName}`,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      postalCode: formData.postalCode,
      country: formData.country,
    };

    // Prepare payment details
    const paymentDetails = {
      method: formData.paymentMethod,
      cardLast4: formData.cardNumber.slice(-4),
    };

    // Create order object
    const orderData = {
      items,
      subtotal: totalPrice,
      shipping,
      tax,
      total: orderTotal,
      shippingAddress,
      paymentMethod: "Credit Card",
      paymentDetails,
    };

    // Save order to local storage
    try {
      const savedOrder = saveOrder(orderData);
      setOrderId(savedOrder.id);

      // Clear cart after successful order
      clearCart();
      setOrderCompleted(true);
    } catch (error) {
      console.error("Failed to save order:", error);
      setErrors({ form: "Failed to complete your order. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  // Calculate shipping based on order total
  const calculateShipping = () => {
    if (totalPrice > 100) {
      return 0; // Free shipping for orders over $100
    }
    return 10; // Standard shipping fee
  };

  const shipping = calculateShipping();
  const tax = totalPrice * 0.05; // 5% tax rate
  const orderTotal = totalPrice + shipping + tax;

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Your cart is empty
          </h1>
          <p className="mt-2 text-base text-gray-500">
            You don't have any items in your cart.
          </p>
          <div className="mt-6">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Order Completed!
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Thank you for your purchase. Your order #{orderId} has been
            processed successfully.
          </p>
          <p className="mt-2 text-base text-gray-500">
            A confirmation email has been sent to {formData.email}
          </p>
          <div className="mt-6 space-y-4">
            <Button
              onClick={() => navigate("/")}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              variant="outline"
              className="ml-4"
            >
              View Order in Profile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        Checkout
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start"
      >
        <div className="lg:col-span-7">
          {/* Shipping Information */}
          <div className="border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">
              Shipping information
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.firstName ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.firstName && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.lastName ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.lastName && (
                  <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.email ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.address ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.city ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.city && (
                  <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State / Province
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.state ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.state && (
                  <p className="mt-2 text-sm text-red-600">{errors.state}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.postalCode ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                {errors.postalCode && (
                  <p className="mt-2 text-sm text-red-600">
                    {errors.postalCode}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`mt-1 block w-full border ${
                    errors.country ? "border-red-300" : "border-gray-300"
                  } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                >
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="MX">Mexico</option>
                  <option value="UK">United Kingdom</option>
                </select>
                {errors.country && (
                  <p className="mt-2 text-sm text-red-600">{errors.country}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-10 border-t border-gray-200 pt-10">
            <h2 className="text-lg font-medium text-gray-900">Payment</h2>

            <div className="mt-4">
              <div className="flex items-center">
                <input
                  id="credit-card"
                  name="paymentMethod"
                  type="radio"
                  checked={formData.paymentMethod === "credit"}
                  onChange={() =>
                    setFormData({ ...formData, paymentMethod: "credit" })
                  }
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="credit-card"
                  className="ml-3 block text-sm font-medium text-gray-700"
                >
                  Credit Card
                </label>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.cardName ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.cardName && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.cardName}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.cardNumber ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.cardNumber && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.cardNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="expirationDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <input
                    type="text"
                    id="expirationDate"
                    name="expirationDate"
                    value={formData.expirationDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    className={`mt-1 block w-full border ${
                      errors.expirationDate
                        ? "border-red-300"
                        : "border-gray-300"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.expirationDate && (
                    <p className="mt-2 text-sm text-red-600">
                      {errors.expirationDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    className={`mt-1 block w-full border ${
                      errors.cvv ? "border-red-300" : "border-gray-300"
                    } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                  {errors.cvv && (
                    <p className="mt-2 text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-10 lg:mt-0 lg:col-span-5">
          <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-6 space-y-4">
              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </dd>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    {shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}
                  </dd>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Tax</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${tax.toFixed(2)}
                  </dd>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <dt className="text-base font-medium text-gray-900">
                    Order total
                  </dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${orderTotal.toFixed(2)}
                  </dd>
                </div>
              </div>
            </div>

            {errors.form && (
              <div className="mt-4 p-4 text-sm text-red-700 bg-red-100 rounded-md">
                {errors.form}
              </div>
            )}

            <div className="mt-6">
              <Button
                type="submit"
                fullWidth
                disabled={isProcessing}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isProcessing ? "Processing..." : "Place Order"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
