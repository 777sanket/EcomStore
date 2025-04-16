import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchProducts } from "../api";
import ProductGrid from "../components/products/ProductGrid";
import Loader from "../components/common/Loader";

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);

        if (query) {
          const results = await searchProducts(query);
          setProducts(results);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError("Failed to load search results.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <Loader fullPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
        {query ? `Search results for "${query}"` : "Search Results"}
      </h1>

      {error ? (
        <div className="mt-6 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      ) : (
        <div className="mt-8">
          {products.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-gray-500">
                Found {products.length} results
              </p>
              <ProductGrid products={products} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No products found matching your search. Try different keywords.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
