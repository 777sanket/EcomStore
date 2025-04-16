// src/api/index.js
const API_URL = "https://api.escuelajs.co/api/v1";

// Generic fetch function with error handling
const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, options);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};

// Product API methods
export const fetchAllProducts = (limit = 20, offset = 0) => {
  return fetchData(`/products?limit=${limit}&offset=${offset}`);
};

export const fetchProductById = (id) => {
  return fetchData(`/products/${id}`);
};

export const fetchProductsByCategory = (categoryId, limit = 20, offset = 0) => {
  return fetchData(
    `/categories/${categoryId}/products?limit=${limit}&offset=${offset}`
  );
};

export const searchProducts = (query) => {
  return fetchData(`/products/?title=${query}`);
};

// Category API methods
export const fetchAllCategories = () => {
  return fetchData("/categories");
};

export const fetchCategoryById = (id) => {
  return fetchData(`/categories/${id}`);
};

// User API methods
export const loginUser = (email, password) => {
  return fetchData("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const registerUser = (
  name,
  email,
  password,
  avatar = "https://picsum.photos/800"
) => {
  return fetchData("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      avatar,
    }),
  });
};

export const getUserProfile = (token) => {
  return fetchData("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
