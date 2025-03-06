import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Heart } from "lucide-react"; // Import heart icon from lucide-react

const Products = () => {
  const { productId } = useParams();
  const { products } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("XS");
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false); // Track like status

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-2 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.9%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(item)}
                alt={`Product ${index}`}
              />
            ))}
          </div>
        </div>
        <div className="w-full sm:w-[80%]">
          <img className="w-full h-auto" src={image} alt="Selected Product" />
        </div>
      </div>

      {/* Product Details */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{productData.name}</h2>
          {/* Like Button */}
          <button onClick={() => setIsLiked(!isLiked)}>
            <Heart
              className="w-7 h-7 cursor-pointer transition-all"
              color={isLiked ? "red" : "black"} // Change color when clicked
              fill={isLiked ? "red" : "transparent"} // Fill red when liked
            />
          </button>
        </div>
        <p className="text-gray-600">Category: {productData.category}</p>
        <p className="text-gray-600 text-sm">
          4 interest-free payments of {productData.price / 4}.{" "}
          <span className="text-blue-500 cursor-pointer">Learn more</span>
        </p>
        <p className="mt-3 text-gray-700">
          {productData.description}
        </p>

        {/* Color Selection (Placeholder) */}
        <p className="mt-4 text-gray-700 font-semibold">Color</p>
        <div className="w-8 h-8 border rounded-full bg-gray-400 cursor-pointer"></div>

        {/* Size Selection */}
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Size</p>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="border border-gray-400 p-2 rounded-md w-full sm:w-48"
          >
            {["XS", "S", "M", "L", "XL", "XXL", "3XL"].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">Height of model: 189 cm / 6′ 2″ (Size 41)</p>
        </div>

        {/* Quantity Selection */}
        <div className="mt-4">
          <p className="text-gray-700 font-semibold">Quantity</p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="border border-gray-400 p-2 rounded-md w-20 text-center"
          />
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 w-full sm:w-64 bg-black text-white py-3 rounded-md text-lg hover:bg-gray-800 transition">
          Add to Cart - R{productData.price}
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-600 mt-10">Product not found</div> // Fallback message
  );
};

export default Products;
