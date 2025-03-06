import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/p_img1.png"; // Make sure this path is correct

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // For Sign-Up
  const [name, setUsername] = useState(""); // For Sign-Up

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Handle form submission loading
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    console.log(email);
    if(email.includes("admin")){
      try {
        const response = await fetch("http://localhost:8080/api/user/admin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong. Please try again.");
        }
    
     
        navigate("/admin");
      } catch (err) {
        setError(err.message);
      } finally {
        setIsSubmitting(false);
      }
    }else{
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
  
   
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  }
  };
  

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
  
    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Something went wrong. Please try again.");
      }
  
      setIsSignUp(false); // Redirect to login after successful sign-up
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="flex h-screen">
      {/* Left Side - Image */}
      <div className="w-1/2 bg-[#f2f2f2] flex justify-center items-center">
        <img src={logoImage} alt="Logo" className="max-w-xs" />
      </div>

      {/* Right Side - Form */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-semibold mb-6">{isSignUp ? "Sign Up" : "Login"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="w-full max-w-md">
          {/* Username (Sign-Up Only) */}
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign-Up Only) */}
          {isSignUp && (
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none"
            disabled={isSubmitting} // Disable button while submitting
          >
            {isSubmitting ? "Submitting..." : isSignUp ? "Sign Up" : "Login"}
          </button>

          {/* Toggle between Login and Sign-Up */}
          <div className="text-center mt-4">
            {isSignUp ? (
              <p className="text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setIsSignUp(false)}
                  className="text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </p>
            ) : (
              <p className="text-sm">
                Do not have an account?{" "}
                <span
                  onClick={() => setIsSignUp(true)}
                  className="text-blue-500 cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <Link to="/forgot-password" className="text-blue-500 text-sm">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
