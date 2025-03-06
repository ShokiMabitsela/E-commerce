import React, { useState } from 'react';

const ordersData = [
  { product: 'Lorem Ipsum', orderId: '#25426', date: 'Nov 8th, 2023', customer: 'Kavin', status: 'Delivered', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25425', date: 'Nov 7th, 2023', customer: 'Komael', status: 'Canceled', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25424', date: 'Nov 6th, 2023', customer: 'Nikhil', status: 'In transit', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25423', date: 'Nov 5th, 2023', customer: 'Shivam', status: 'Canceled', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25422', date: 'Nov 4th, 2023', customer: 'Shadab', status: 'Delivered', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25421', date: 'Nov 2nd, 2023', customer: 'Yogesh', status: 'Delivered', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25423', date: 'Nov 1st, 2023', customer: 'Sunita', status: 'Canceled', amount: 'R200.00' },
  { product: 'Lorem Ipsum', orderId: '#25421', date: 'Nov 1st, 2023', customer: 'Priyanka', status: 'Delivered', amount: 'R200.00' },
];

const OrderList = () => {
  const [orders, setOrders] = useState(ordersData);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 4;

  // Handle status change
  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order =>
      order.orderId === orderId ? { ...order, status: newStatus } : order
    ));
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle pagination click
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Order List</h1>
      <p className="mb-4">Feb 16, 2022 - Feb 20, 2022</p>
      <table className="min-w-full table-auto border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 border border-gray-300">Product</th>
            <th className="px-4 py-2 border border-gray-300">Order ID</th>
            <th className="px-4 py-2 border border-gray-300">Date</th>
            <th className="px-4 py-2 border border-gray-300">Customer Name</th>
            <th className="px-4 py-2 border border-gray-300">Status</th>
            <th className="px-4 py-2 border border-gray-300">Amount</th>
            <th className="px-4 py-2 border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map(order => (
            <tr key={order.orderId}>
              <td className="px-4 py-2 border border-gray-300">{order.product}</td>
              <td className="px-4 py-2 border border-gray-300">{order.orderId}</td>
              <td className="px-4 py-2 border border-gray-300">{order.date}</td>
              <td className="px-4 py-2 border border-gray-300">{order.customer}</td>
              <td className="px-4 py-2 border border-gray-300">{order.status}</td>
              <td className="px-4 py-2 border border-gray-300">{order.amount}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button
                  onClick={() => handleStatusChange(order.orderId, 'Delivered')}
                  className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={() => handleStatusChange(order.orderId, 'Canceled')}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 ml-2"
                >
                  Mark as Canceled
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
        >
          Prev
        </button>
        {[...Array(Math.ceil(orders.length / ordersPerPage))].map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-4 py-2 rounded-md ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default OrderList;