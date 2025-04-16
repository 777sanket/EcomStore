import React, { useState } from "react";
import { formatPrice } from "../../utils/formatPrice";

const OrderHistory = ({ orders }) => {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-12 bg-white shadow sm:rounded-lg px-4">
        <h3 className="text-lg font-medium text-gray-900">No orders yet</h3>
        <p className="mt-2 text-sm text-gray-500">
          When you place orders, they will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow sm:rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">
          Your Order History
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View details of all your previous orders
        </p>
      </div>

      <div className="border-t border-gray-200 divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="px-4 py-5 sm:px-6">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleOrder(order.id)}
            >
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Order #{order.id}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Placed on {new Date(order.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {order.status}
                </span>
                <button className="ml-4 text-gray-400 hover:text-gray-500">
                  <svg
                    className={`h-5 w-5 transform ${
                      expandedOrder === order.id ? "rotate-180" : ""
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4">
                {/* Order Details */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Order Summary
                  </h4>
                  <dl className="mt-2 divide-y divide-gray-200">
                    <div className="py-2 flex justify-between text-sm">
                      <dt className="text-gray-500">Subtotal</dt>
                      <dd className="text-gray-900">
                        {formatPrice(order.subtotal)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm">
                      <dt className="text-gray-500">Shipping</dt>
                      <dd className="text-gray-900">
                        {order.shipping === 0
                          ? "Free"
                          : formatPrice(order.shipping)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm">
                      <dt className="text-gray-500">Tax</dt>
                      <dd className="text-gray-900">
                        {formatPrice(order.tax)}
                      </dd>
                    </div>
                    <div className="py-2 flex justify-between text-sm font-medium">
                      <dt className="text-gray-900">Total</dt>
                      <dd className="text-blue-600">
                        {formatPrice(order.total)}
                      </dd>
                    </div>
                  </dl>
                </div>

                {/* Items in the order */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900">Items</h4>
                  <ul className="mt-2 divide-y divide-gray-200">
                    {order.items.map((item) => (
                      <li key={item.id} className="py-3 flex">
                        <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden">
                          <img
                            src={item.image || "https://placehold.co/100x100"}
                            alt={item.title}
                            className="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-1 flex flex-col">
                          <div>
                            <div className="flex justify-between text-sm font-medium text-gray-900">
                              <h5>{item.title}</h5>
                              <p className="ml-4">{formatPrice(item.price)}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              Qty {item.quantity}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Information */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Shipping Information
                  </h4>
                  <address className="mt-2 not-italic text-sm text-gray-500">
                    <p>{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city},{" "}
                      {order.shippingAddress.state}{" "}
                      {order.shippingAddress.postalCode}
                    </p>
                    <p>{order.shippingAddress.country}</p>
                  </address>
                </div>

                {/* Payment Information */}
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-medium text-gray-900">
                    Payment Information
                  </h4>
                  <div className="mt-2 text-sm text-gray-500">
                    <p>Payment Method: {order.paymentMethod}</p>
                    {order.paymentMethod === "Credit Card" && (
                      <p>Card ending in {order.paymentDetails.cardLast4}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
