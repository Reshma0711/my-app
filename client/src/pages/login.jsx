// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";

// const Login = () => {
//  const [loginData,setloginData]=useState({
//     "email":"",
//     "password":""
//  })
//   const navigate = useNavigate();

//   const loginMutation = useMutation(async (userData) => {
//     const response = await fetch("http://localhost:5000/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(userData),
//     });

//     const data = await response.json();
//     if (!response.ok) {
//       throw new Error(data.message || "Login failed");
//     }
//     return data;
//   }, {
//     onSuccess: (data) => {
//       localStorage.setItem("token", data.token);
//       navigate("/");
//     },
//     onError: (error) => {
//       console.error(error);
//     }
//   });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     loginMutation.mutate(loginData);
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
//         {loginMutation.isError && <p className="text-red-500 text-center">{loginMutation.error.message}</p>}
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               value={loginData.email}
//               onChange={(e) => setloginData({ ...loginData, email: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               value={loginData.password}
//               onChange={(e) => setloginData({ ...loginData, password: e.target.value })}
//               className="w-full p-2 border rounded-lg"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-green-600"
//             disabled={loginMutation.isLoading}
//           >
//             {loginMutation.isLoading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//         <p className="text-center mt-4">
//           Don't have an account?
//           <button
//             onClick={() => navigate("/signup")}
//             className="text-blue-500 font-bold underline cursor-pointer hover:text-blue-700"
//           >
//             Signup
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/axios"; // Axios instance
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // useForm hook for form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // Mutation for login request
  const loginMutation = useMutation(
    async (userData) => {
      const response = await api.post("/login", userData);
      return response.data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token); // Store token
        queryClient.setQueryData(["authStatus"], true); // Update auth status
        navigate("/"); // Redirect to home
      },
      onError: (error) => {
        console.error(error.response?.data?.message || "Login failed");
      },
    }
  );

  // Form submission handler
  const onSubmit = (data) => {
    console.log("loginnnnnnnnnn",data)
    loginMutation.mutate(data);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

        {loginMutation.isError && (
          <p className="text-red-500 text-center">{loginMutation.error.message}</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-green-600"
            disabled={loginMutation.isLoading || isSubmitting}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-500 font-bold underline cursor-pointer hover:text-blue-700"
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;

