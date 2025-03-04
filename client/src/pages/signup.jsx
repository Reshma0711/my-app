import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/utils/axios";
import { useForm } from "react-hook-form";

const Signup = () => {
  const navigate = useNavigate();
 

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  
  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await api.post("/signup", data);
      return response.data;
    },
    onSuccess: (data) => {
      alert(data.message);  
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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const onSubmit = (data) => {
   console.log("Responseeeee.....",data)
    mutation.mutate(data);
  };

  return (
     /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
     <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded">
     <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       {/* Username Field */}
       <input
         type="text"
         placeholder="Username"
         {...register("username", { required: "Username is required" })}
         className="w-full p-2 border rounded"
       />
       {errors.username && <p className="text-red-500">{errors.username.message}</p>}

       {/* Email Field */}
       <input
         type="email"
         placeholder="Email"
         {...register("email", {
           required: "Email is required",
           pattern: {
             value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
             message: "Invalid email format",
           },
         })}
         className="w-full p-2 border rounded"
       />
       {errors.email && <p className="text-red-500">{errors.email.message}</p>}

       {/* Password Field */}
       <input
         type="password"
         placeholder="Password"
         {...register("password", { required: "Password is required", minLength: { value: 5, message: "Must be at least 5 characters" } })}
         className="w-full p-2 border rounded"
       />
       {errors.password && <p className="text-red-500">{errors.password.message}</p>}

       {/* Role Selection */}
       <select {...register("role")} className="w-full p-2 border rounded">
         <option value="user">User</option>
         <option value="manager">Manager</option>
         <option value="admin">Admin</option>
       </select>

       {/* Submit Button */}
       <button
         type="submit"
         className="w-full bg-gray-900 text-white p-2 rounded hover:bg-green-600"
         disabled={mutation.isLoading || isSubmitting}
       >
         {mutation.isLoading || isSubmitting ? "Signing Up..." : "Sign Up"}
       </button>
     </form>

     <p className="mt-4 text-center">
       Already have an account?{" "}
       <span className="text-blue-500 font-bold underline cursor-pointer hover:text-blue-700" onClick={() => navigate("/login")}>
         Login
       </span>
     </p>
   </div>
  );
};

export default Signup;
