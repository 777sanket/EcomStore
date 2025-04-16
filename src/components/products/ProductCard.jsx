import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";
import Button from "../common/Button";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  // Use the first image if available, or fallback to a placeholder
  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://placehold.co/300x300";

  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-w-3 aspect-h-4 bg-gray-200 sm:aspect-none h-60 relative">
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-full object-cover sm:w-full sm:h-full transition duration-300 ease-in-out group-hover:opacity-75"
          />
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-900 truncate">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 truncate">
            {product.category?.name || "Category"}
          </p>
          <p className="mt-2 text-base font-semibold text-gray-900">
            ${product.price?.toFixed(2) || "0.00"}
          </p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button onClick={handleAddToCart} fullWidth className="mt-2">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
