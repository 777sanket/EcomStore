import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      updateQuantity(item.id, value);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  // Use the first image if available, or fallback to a placeholder
  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0]
      : "https://placehold.co/100x100";

  return (
    <div className="py-6 flex items-center border-b border-gray-200">
      {/* Product image */}
      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
        <img
          src={imageUrl}
          alt={item.title}
          className="w-full h-full object-center object-cover"
        />
      </div>

      {/* Product details */}
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link to={`/product/${item.id}`}>{item.title}</Link>
            </h3>
            <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {item.category?.name || "Category"}
          </p>
        </div>
        <div className="flex-1 flex items-end justify-between text-sm">
          <div className="flex items-center">
            <label
              htmlFor={`quantity-${item.id}`}
              className="mr-2 text-gray-500"
            >
              Qty
            </label>
            <input
              id={`quantity-${item.id}`}
              name={`quantity-${item.id}`}
              type="number"
              min="1"
              value={item.quantity}
              onChange={handleQuantityChange}
              className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm w-16"
            />
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={handleRemove}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
