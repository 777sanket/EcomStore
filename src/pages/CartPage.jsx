import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/common/Button";

const CartPage = () => {
  const { cart, totalItems } = useCart();

  if (cart.length === 0) {
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
              as={Link}
              to="/"
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-24 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
