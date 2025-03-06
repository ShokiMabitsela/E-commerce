import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-[#a37f4f] text-white p-6">
      <h2 className="text-2xl font-bold">Admin Panel</h2>
      <nav className="mt-6">
        <NavLink to="/admin" className="block py-2 hover:bg-gray-700 rounded px-3">
          Dashboard
        </NavLink>
        <NavLink to="/admin/all-products" className="block py-2 hover:bg-gray-700 rounded px-3">
          All Products
        </NavLink>
        <NavLink to="/admin/orders" className="block py-2 hover:bg-gray-700 rounded px-3">
          Order List
        </NavLink>
        <NavLink to="/admin/categories" className="block py-2 hover:bg-gray-700 rounded px-3">
          Categories
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
