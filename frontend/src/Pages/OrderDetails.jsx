import React from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { orderId } = useParams(); // Get Order ID from URL

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold">Order Details</h2>
      <p className="text-gray-600">Home &gt; Order List &gt; Order Details</p>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold">Order ID: #{orderId}</h3>
        <span className="bg-yellow-300 text-black px-3 py-1 rounded-full text-sm">Pending</span>

        {/* Customer Info */}
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold">Customer</h4>
            <p><strong>Full Name:</strong> Shristi Singh</p>
            <p><strong>Email:</strong> shristi@gmail.com</p>
            <p><strong>Phone:</strong> +91 904 231 1212</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="text-md font-semibold">Shipping Info</h4>
            <p><strong>Address:</strong> Dharam Colony, Palam Vihar, Gurgaon</p>
            <p><strong>Shipping:</strong> Next Express</p>
            <p><strong>Status:</strong> Pending</p>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-gray-50 p-4 rounded-lg mt-4">
          <h4 className="text-md font-semibold">Payment Info</h4>
          <p><strong>Method:</strong> PayPal</p>
          <p><strong>Card:</strong> MasterCard **** **** 6557</p>
          <p><strong>Business Name:</strong> Shristi Singh</p>
        </div>

        {/* Product List */}
        <h4 className="text-lg font-semibold mt-6">Products</h4>
        <table className="w-full mt-2 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Product Name</th>
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Quantity</th>
              <th className="p-2 border">Total</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((_, index) => (
              <tr key={index} className="text-center border">
                <td className="p-2 border">Lorem Ipsum</td>
                <td className="p-2 border">#25421</td>
                <td className="p-2 border">2</td>
                <td className="p-2 border">R800.40</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Order Summary */}
        <div className="mt-6">
          <p><strong>Subtotal:</strong> R3,201.6</p>
          <p><strong>Tax (20%):</strong> R640.32</p>
          <p><strong>Discount:</strong> R0</p>
          <p><strong>Shipping Rate:</strong> R0</p>
          <h3 className="text-xl font-bold">Total: R3,841.92</h3>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
