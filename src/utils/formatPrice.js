/**
 * Format a price with currency symbol
 * @param {number} price - The price to format
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted price
 */
export const formatPrice = (price, currency = "USD") => {
  if (typeof price !== "number" || isNaN(price)) {
    return "$0.00";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
};
