
// import { FaCartPlus } from "react-icons/fa"; // Cart icon
// import { CiSearch } from "react-icons/ci";
// import { FaRegUserCircle } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
// import {  useState,  } from "react";
import {assets} from '../assets/assets';
import { useState } from "react";
// import { ShopContext } from "../Context/ShopContext"; // Import Shop context
// import { AuthContext } from "../Context/AuthContext"; // Import Auth context

const NavBar = () => {
 
  // const { cart } = useContext(ShopContext); // Get cart from context
  // const { user, isLoggedIn, logout, checkAuthStatus } = useContext(AuthContext); // Get auth state
const [visible, setVisible ]= useState(false);

  // const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total items

  // useEffect(() => {
  //   checkAuthStatus(); // Ensure authentication state persists on reload
  // }, []);

  // const handleLogout = () => {
  //   logout(); // Call logout method from context
  // };

  return (
    <nav className="flex justify-between  bg-[#b0764d] p-4 text-white">
      {/* Logo */}
      <NavLink className='relative'  to="/">
      {/* <div className=" border border-white w- ">
      </div> */}
        <h1 className="absolute inset-0 w-[7rem] px-0 mt-2 h-8 send-flowers-regular text-2xl   bg-[#b0764d]" >
          Celia Styled</h1>
          <p className="text-[7px]  text-center w-[5rem]  pt-10 pb-1 antialiased leading-relaxed font-serif ml-4 border border-white"></p>
        </NavLink>
        <div className=" flex gap-5  " >

          <NavLink className=" hidden sm:block" to='/shop'>SHOP</NavLink>
          <NavLink className="hidden sm:block" to='/'>CONTACTS</NavLink>
        </div>
        
      {/* Search Bar */}
      <div className="flex  items-center gap-6">
        <img src={assets.search_icon} className="w-5  cursor-point" alt="" />
        <div className="group relative">
          <img className="w-5 cursor-pointer" src={assets.profile_icon} alt="" />
          <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded">
            <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
              
            </div>
          </div>
        </div>
        <Link to='/cart' className='relative'>
        <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
        <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 border aspect-square text-[8px] bg-black border-[#b0764d] text-[#b0764d] rounded-full k">10</p>
        </Link>
        <img onClick={() => setVisible(true)} src={assets.menu_icon} className="w-5 cursor-pointer sm:hidden "alt="" />
      </div>
      {/* sidebar menu for small screen */}
      <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ?' w-full' : 'w-0'}`}>
        <div className="flex flex-col text-gray-600">
          <div onClick={() => setVisible(false)} className="flex item-center gap-4 p-3">
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>
          <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to='/shop'>SHOP</NavLink>
          <NavLink onClick={()=> setVisible(false)} className="py-2 pl-6 border" to='/'>CONTACTS</NavLink>
        </div>
      </div>
      {/* <div className="flex items-center bg-white text-black px-2 rounded-lg">
        <CiSearch className="text-gray-500 h-6 w-6" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none px-2 py-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
        {/* Optionally show a loading spinner or search suggestions here 
      </div> */}

      {/* Navigation Links */}
      {/* <div className="flex space-x-6 items-center">
        <NavLink to="/shop" className="hover:text-black">Shop</NavLink>
        <NavLink to="/about" className="hover:text-black">About</NavLink>

        {/* User Icon + Login/Logout */}
        {/* <div className="flex items-center space-x-2">
          <FaRegUserCircle className="h-6 w-6" />
          {isLoggedIn ? (
            <div className="flex items-center">
              <span className="text-sm">{user?.name}</span> {/* Optionally show user name 
                onClick={handleLogout}
                className="cursor-pointer hover:text-black"
              >
                Logout
              </p>
            </div>
          ) : (
            <NavLink to="/login">
              <p className="cursor-pointer hover:text-black">Login</p>
            </NavLink>
          )}
        </div>  */}

        {/* Cart Icon (only if logged in) */}
        {/* {isLoggedIn && (
          <div className="relative">
            <NavLink to="/cart">
              <FaCartPlus className="text-white h-8 w-8 cursor-pointer" />
              {cartItemCount > 0 && (
                <span className="absolute top-[-5px] right-[-5px] bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </div>
        )} */}
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
