import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../api";
import ProductGrid from "../components/products/ProductGrid";
import ProductFilters from "../components/products/ProductFilters";
import Loader from "../components/common/Loader";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
  });

  // Fetch all products
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchAllProducts(50); // limit to 50 products for better performance
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  // Apply filters whenever filters change
  useEffect(() => {
    if (products.length > 0) {
      const result = products.filter((product) => {
        // Filter by category
        const categoryMatch =
          filters.categories.length === 0 ||
          (product.category &&
            filters.categories.includes(product.category.id));

        // Filter by price
        const priceMatch =
          product.price >= filters.priceRange.min &&
          product.price <= filters.priceRange.max;

        return categoryMatch && priceMatch;
      });

      setFilteredProducts(result);
    }
  }, [filters, products]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        All Products
      </h1>

      <div className="mt-8 lg:grid lg:grid-cols-4 lg:gap-x-8">
        {/* Filters */}
        <div className="hidden lg:block">
          <ProductFilters
            onFilterChange={handleFilterChange}
            initialFilters={filters}
          />
        </div>

        {/* Products */}
        <div className="mt-6 lg:mt-0 lg:col-span-3">
          {loading ? (
            <Loader />
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          ) : (
            <>
              <div className="mb-6 lg:hidden">
                <ProductFilters
                  onFilterChange={handleFilterChange}
                  initialFilters={filters}
                />
              </div>

              <div className="mb-4 text-sm text-gray-500">
                Showing {filteredProducts.length} results
              </div>

              <ProductGrid products={filteredProducts} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
