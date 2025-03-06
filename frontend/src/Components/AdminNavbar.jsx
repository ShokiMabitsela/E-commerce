import { FaBell, FaUserCircle } from "react-icons/fa";

const AdminNavbar = () => {
  return (
    <div className="bg-white flex justify-between items-center p-4 shadow-md">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <FaBell className="text-gray-600 h-6 w-6 cursor-pointer" />
        <div className="relative group">
          <FaUserCircle className="text-gray-600 h-8 w-8 cursor-pointer" />
          <div className="hidden group-hover:block absolute right-0 bg-white text-black shadow-md py-2 w-40">
            <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Change Password</p>
            <p className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
