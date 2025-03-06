import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { NavLink } from "react-router-dom";


const products = [
  { name: "Lorem Ipsum", category: "Battery", price: "₹110.40", sales: 1269, remaining: 32 },
  { name: "Lorem Ipsum", category: "Battery", price: "₹110.40", sales: 1269, remaining: 21 },
  { name: "Lorem Ipsum", category: "Battery", price: "₹110.40", sales: 1269, remaining: 13 },
  { name: "Lorem Ipsum", category: "Battery", price: "₹110.40", sales: 1269, remaining: 14 },
  { name: "Lorem Ipsum", category: "Battery", price: "₹110.40", sales: 1269, remaining: 11 },
];

const AllProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 4;

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#a37f4f] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Pulstron</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-black cursor-pointer">Dashboard</li>
            <li className="hover:text-black cursor-pointer font-bold">All Products</li>
            <li className="hover:text-black cursor-pointer">Order List</li>
            <li className="hover:text-black cursor-pointer">Categories</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar */}
        <header className="bg-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-xl font-bold">All Products</h1>
          <NavLink to="/admin/add-product"className="bg-green-500 text-white px-4 py-2 flex items-center rounded shadow">
            <FaPlus className="mr-2" /> Add New Product
          </NavLink>
        </header>

        {/* Breadcrumbs */}
        <p className="text-gray-500 mt-2">Home &gt; All Products</p>

        {/* Product Cards */}
        <div className="grid grid-cols-4 gap-6 mt-6">
          {currentProducts.map((product, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-bold">{product.name}</h2>
              <p className="text-gray-500">{product.category}</p>
              <h3 className="font-bold">{product.price}</h3>
              <p className="text-green-500">Sales: {product.sales}</p>
              <p className="text-red-500">Remaining: {product.remaining}</p>
              <button className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page ? "bg-[#a37f4f] text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button onClick={() => setCurrentPage(currentPage + 1)} className="px-3 py-1 bg-gray-200 rounded">
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default AllProducts;
