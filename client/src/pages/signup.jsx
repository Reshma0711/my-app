import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      alert(data.message);
      setFormData({ username: "", email: "", password: "", role: "user" });
      navigate("/login"); // Redirect to login page
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Something went wrong";
      alert(errorMessage);
      if (errorMessage.includes("already exists")) {
        navigate("/login"); // Redirect if account already exists
      }
    },
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="user">User</option>
          <option value="manager">Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          className="w-full bg-gray-900 text-white p-2 rounded hover:bg-green-600"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account? <span className="text-blue-500 font-bold underline cursor-pointer hover:text-blue-700" onClick={() => navigate("/login")}>Login</span>
      </p>
    </div>
  );
};

export default Signup;
