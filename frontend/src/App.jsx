import { Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import Products from "./Pages/Products";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import AdminDashboard from "./Pages/AdminDashboard";
import AddProduct from "./Pages/AddProduct";
import OrderDetails from "./Pages/OrderDetails";
import AllProducts from "./Pages/AllProducts"; // Import AllProducts Page
import OrderList from "./Pages/OrderList";
import ShopContextProvider from "./Context/ShopContext";
import AuthContextProvider from "./Context/AuthContext";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null); // Set initial data state as null
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched Data:", data);
        setData(data);
      } catch (error) {
        console.error("Fetch Error:", error);
        setError(`Failed to load data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    // Call fetchData when the component mounts
    fetchData();
  }, []); 

  return (
    <div>
      {/* Display loading or error state */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display the fetched data if it's available */}
      {data && (
        <div className="p-4">
          <h2 className="text-lg font-bold">Fetched Data:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre> {/* Display JSON data */}
        </div>
      )}

      <AuthContextProvider>
        <ShopContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/products/:productId" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/all-products" element={<AllProducts />} />
            <Route path="/admin/orders/:orderId" element={<OrderDetails />} />
            <Route path="/admin/orders-list" element={<OrderList />} />
          </Routes>
        </ShopContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
