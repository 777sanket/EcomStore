import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAllProducts, fetchAllCategories } from "../api";
import ProductGrid from "../components/products/ProductGrid";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          fetchAllProducts(8), // Limit to 8 products for featured section
          fetchAllCategories(),
        ]);

        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load homepage data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loader fullPage />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-extrabold text-red-600">Error</h2>
        <p className="mt-4 text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Online shopping"
            className="w-full h-full object-center object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            E-Shop
          </h1>
          <p className="mt-6 text-xl text-white max-w-3xl">
            Discover our wide range of products at unbeatable prices. Shop now
            and enjoy fast delivery!
          </p>
          <div className="mt-10">
            <div
              as={Link}
              to="/products"
              onClick={() => navigate("/products")}
              className="inline-flex items-center border border-transparent text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 px-8 py-3"
            >
              Shop Now
            </div>
          </div>
        </div>
      </div>

      {/* Featured categories */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Shop by Category
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative">
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 h-60">
                <img
                  src={
                    category.image ||
                    `https://source.unsplash.com/random/300x300/?${category.name}`
                  }
                  alt={category.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <Link to={`/category/${category.id}`}>
                  <span className="absolute inset-0" />
                  {category.name}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-gray-500">Explore products</p>
            </div>
          ))}
        </div>
      </div>

      {/* Featured products */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View all<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="mt-6">
          <ProductGrid products={featuredProducts} />
        </div>
      </div>

      {/* Promotion banner */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-600">Start shopping today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Button
                as={Link}
                to="/products"
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Shop Now
              </Button>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Button
                as={Link}
                to="/categories"
                variant="outline"
                onClick={() => navigate("/categories")}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Browse Categories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
