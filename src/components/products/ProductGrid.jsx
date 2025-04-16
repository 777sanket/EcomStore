import React from "react";
import ProductCard from "./ProductCard";
import Loader from "../common/Loader";

const ProductGrid = ({ products, loading, error }) => {
  if (loading) {
    return <Loader fullPage />;
  }

  if (error) {
    return (
      <div className="my-8 text-center">
        <h3 className="text-lg font-medium text-red-500">
          Error loading products
        </h3>
        <p className="mt-1 text-gray-500">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="my-8 text-center">
        <h3 className="text-lg font-medium text-gray-900">No products found</h3>
        <p className="mt-1 text-gray-500">Try changing your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
