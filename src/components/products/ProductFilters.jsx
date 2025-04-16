import React, { useState, useEffect } from "react";
import { fetchAllCategories } from "../../api";

const ProductFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(
    initialFilters.priceRange || { min: 0, max: 1000 }
  );
  const [selectedCategories, setSelectedCategories] = useState(
    initialFilters.categories || []
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesData = await fetchAllCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);

    onFilterChange({
      categories: updatedCategories,
      priceRange,
    });
  };

  const handlePriceChange = (e, bound) => {
    // const value = parseInt(e.target.value) || 0;
    const value = e.target.value === "" ? "" : parseInt(e.target.value);

    const updatedRange = { ...priceRange, [bound]: value };

    setPriceRange(updatedRange);

    onFilterChange({
      categories: selectedCategories,
      priceRange: updatedRange,
    });
  };

  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-sm">
      <div className="px-4 py-5 sm:p-6">
        <button
          onClick={toggleFilters}
          className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900"
        >
          <span>Filters</span>
          <svg
            className={`h-5 w-5 transform ${isOpen ? "rotate-180" : ""}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="mt-6 space-y-6">
            {/* Categories filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      id={`category-${category.id}`}
                      name={`category-${category.id}`}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={`category-${category.id}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price range filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
              <div className="mt-2 grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="min-price"
                    className="block text-sm text-gray-600"
                  >
                    Min ($)
                  </label>
                  <input
                    type="number"
                    id="min-price"
                    value={priceRange.min}
                    onChange={(e) => handlePriceChange(e, "min")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="max-price"
                    className="block text-sm text-gray-600"
                  >
                    Max ($)
                  </label>
                  <input
                    type="number"
                    id="max-price"
                    value={priceRange.max}
                    onChange={(e) => handlePriceChange(e, "max")}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductFilters;
