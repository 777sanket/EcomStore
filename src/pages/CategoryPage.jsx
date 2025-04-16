import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryById, fetchProductsByCategory } from "../api";
import ProductGrid from "../components/products/ProductGrid";
import Loader from "../components/common/Loader";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch category and its products in parallel
        const [categoryData, productsData] = await Promise.all([
          fetchCategoryById(id),
          fetchProductsByCategory(id, 50),
        ]);

        setCategory(categoryData);
        setProducts(productsData);
      } catch (err) {
        setError("Failed to load category data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <Loader fullPage />;
  }

  if (error || !category) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold text-red-600">Error</h2>
        <p className="mt-4 text-gray-500">{error || "Category not found"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-4 text-gray-500">{category.description}</p>
        )}
      </div>

      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
