import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    category: "",
    brand: "",
    sku: "",
    stock: "",
    price: "",
    salePrice: "",
    tags: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#a37f4f] text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Pulstron</h2>
        <nav>
          <ul className="space-y-4">
            <li className="hover:text-black cursor-pointer">
              <Link to="/admin">Dashboard</Link>
            </li>
            <li className="hover:text-black cursor-pointer">All Products</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/admin" className="text-gray-500">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl font-bold">Add New Product</h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-2 gap-6">
            {/* Product Name */}
            <div>
              <label className="text-gray-700 font-semibold">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Type name here"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-gray-700 font-semibold">Category</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Type category here"
              />
            </div>

            {/* Description */}
            <div className="col-span-2">
              <label className="text-gray-700 font-semibold">Description</label>
              <textarea
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                rows="3"
                placeholder="Type description here"
              ></textarea>
            </div>

            {/* SKU */}
            <div>
              <label className="text-gray-700 font-semibold">SKU</label>
              <input
                type="text"
                name="sku"
                value={productData.sku}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Fox-3983"
              />
            </div>

            {/* Stock */}
            <div>
              <label className="text-gray-700 font-semibold">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="1258"
              />
            </div>

            {/* Image Upload */}
            <div className="col-span-2">
              <label className="text-gray-700 font-semibold">Product Gallery</label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 border rounded mt-1"
              />
            </div>

            {/* Regular Price */}
            <div>
              <label className="text-gray-700 font-semibold">Regular Price</label>
              <input
                type="text"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="₹1000"
              />
            </div>

            {/* Sale Price */}
            <div>
              <label className="text-gray-700 font-semibold">Sale Price</label>
              <input
                type="text"
                name="salePrice"
                value={productData.salePrice}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="₹450"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="text-gray-700 font-semibold">Tags</label>
              <input
                type="text"
                name="tags"
                value={productData.tags}
                onChange={handleInputChange}
                className="w-full p-2 border rounded mt-1"
                placeholder="Lorem"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end mt-6">
            <button className="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Add Product</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
