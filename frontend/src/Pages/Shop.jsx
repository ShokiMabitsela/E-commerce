import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Shop = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [activeFilter, setActiveFilter] = useState("");
  const [sortOption, setSortOption] = useState("relevant");

  const filters = ["Sweaters", "Tops", "Jackets", "Bottom"];

  const handleFilterClick = (filter) => {
    setActiveFilter((prevFilter) => (prevFilter === filter ? "" : filter));
  };

  let filteredProducts = products.filter((product) =>
    activeFilter ? product.subCategory === activeFilter : true
  );

  // Sorting logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price;
    } else if (sortOption === "high-to-low") {
      return b.price - a.price;
    }
    return 0; // Default order (relevant)
  });

  return (
    <div className="sm:flex-row gap-10 pt-1 border-t">
      {/* Sorting Dropdown */}
      <div className="flex justify-between items-center my-4">
        <p
          className="text-xl cursor-pointer"
          onClick={() => setShowFilter(!showFilter)}
        >
          {showFilter ? "Hide Filters" : "Show Filters"}
        </p>
        <select
          className="border border-gray-400 p-2 rounded-md"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="relevant">Sort by Relevant</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Filter Options */}
      <div className="w-full">
        <div
          className={`px-6 py-3 mt-6 ${showFilter ? "block" : "hidden"} sm:block`}
        >
          <div className="flex flex-wrap gap-3 text-sm font-light">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-3 py-1 border border-black rounded-md transition-all ${
                  activeFilter === filter
                    ? "bg-[#a37f4f] text-white"
                    : "bg-transparent"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 p-10 gap-5">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Link to={`/products/${product._id}`} key={product._id}>
              <div className="p-4 h-[265px] w-[265px] cursor-pointer hover:shadow-lg transition">
                <img
                  className="h-32 w-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
                <p className="font-semibold mt-2">{product.name}</p>
                <p className="text-gray-600 text-sm">{product.size}</p>
                <p className="text-gray-600 font-bold">R {product.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center w-full col-span-4 text-black">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
