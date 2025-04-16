import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../../api";
import { useCart } from "../../hooks/useCart";
import Button from "../common/Button";
import Loader from "../common/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      navigate("/cart");
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  if (loading) {
    return <Loader fullPage />;
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold text-red-600">Error</h2>
        <p className="mt-4 text-gray-500">{error || "Product not found"}</p>
        <Button className="mt-8" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product images */}
        <div className="lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <img
              src={
                product.images && product.images.length > 0
                  ? product.images[selectedImage]
                  : "https://placehold.co/600x600"
              }
              alt={product.title}
              className="w-full h-full object-center object-cover"
            />
          </div>

          {/* Image selector */}
          {product.images && product.images.length > 1 && (
            <div className="mt-4 flex gap-4 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`relative rounded-md overflow-hidden h-16 w-16 border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} - view ${index + 1}`}
                    className="h-full w-full object-center object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {product.title}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">
              ${product.price?.toFixed(2) || "0.00"}
            </p>
          </div>

          {/* Category */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Category</h3>
            <p className="mt-1 text-sm text-gray-500">
              {product.category?.name || "Unknown"}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2 text-sm text-gray-500 space-y-2">
              <p>{product.description}</p>
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <div className="flex items-center">
              <h3 className="text-sm font-medium text-gray-900 mr-4">
                Quantity
              </h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="shadow-lg rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 w-20 text-center"
              />
            </div>
          </div>

          {/* Add to cart */}
          <div className="mt-8 flex sm:flex-col1">
            <Button
              onClick={handleAddToCart}
              className="max-w-xs flex-1 bg-blue-600"
              fullWidth
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
