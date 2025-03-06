import Sidebar from "../Components/Sidebar";
import AdminNavbar from "../Components/AdminNavbar";

const AdminDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100">
        <AdminNavbar />
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Home &gt; Dashboard</p>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          {["All Products", "Total Orders", "Active Orders", "Completed Orders"].map((title, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="text-2xl font-bold">₹126.500</p>
              <span className="text-sm text-green-600">34.7% Compared to last month</span>
            </div>
          ))}
        </div>

        {/* Sale Graph & Best Sellers */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Sales Graph</h3>
            <p>Weekly | Monthly | Yearly</p>
            {/* Insert Graph Component Here */}
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Best Sellers</h3>
            <p>Product list...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
