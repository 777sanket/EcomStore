import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Button from "../common/Button";

const CartSummary = () => {
  const { totalItems, totalPrice } = useCart();

  const navigate = useNavigate();

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

  return (
    <div className="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Subtotal ({totalItems} items)</p>
          <p className="text-sm font-medium text-gray-900">
            ${totalPrice.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-600">Shipping estimate</p>
          <p className="text-sm font-medium text-gray-900">
            {shipping === 0 ? "Free" : `${shipping.toFixed(2)}`}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">Tax estimate</p>
          <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <p className="text-base font-medium text-gray-900">Order total</p>
          <p className="text-base font-medium text-gray-900">
            ${orderTotal.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <Button
          as={Link}
          to="/checkout"
          fullWidth
          disabled={totalItems === 0}
          onClick={() => navigate("/checkout")}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          Checkout
        </Button>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          or{" "}
          <Link
            to="/"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Continue Shopping
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
