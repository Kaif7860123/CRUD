import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

 function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
const navigate=useNavigate()
 
 

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    alert(data.msg);

    if (data.msg === "logged in successfully") {
      // Save token in localStorage
      localStorage.setItem("token", data.token);

      setEmail("");
      setPassword("");
      navigate("/admin_dash");
    } else {
      setEmail("");
      setPassword("");
      navigate("/admin_login");
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 md:p-8">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">
          Admin Login
        </h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          Please sign in to admin dashboard
        </p>

        {/* Login Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 mt-1 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
           
            className="w-full py-2 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Extra */}
        <p className="text-xs text-gray-500 text-center mt-6">
          © {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </p>
      </div>
    </div>
  );
}
export default AdminLogin
