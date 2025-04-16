/**
 * Get data from localStorage
 * @param {string} key - The key to fetch
 * @param {*} defaultValue - Default value if key doesn't exist
 * @returns {*} The stored value or defaultValue
 */
export const getStorageItem = (key, defaultValue = null) => {
  if (typeof window === "undefined") {
    return defaultValue;
  }

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage item ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Set data in localStorage
 * @param {string} key - The key to set
 * @param {*} value - The value to store
 */
export const setStorageItem = (key, value) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting localStorage item ${key}:`, error);
  }
};

/**
 * Remove data from localStorage
 * @param {string} key - The key to remove
 */
export const removeStorageItem = (key) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage item ${key}:`, error);
  }
};
