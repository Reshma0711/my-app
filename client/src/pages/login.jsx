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



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {api} from "../utils/axios" // Import Axios instance

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const loginMutation = useMutation(async (userData) => {
    const response = await api.post("/login", userData); // Use axiosInstance
    console.log("Login-response",response.data)
    return response.data;
  }, {
    onSuccess: (data) => {
        console.log("SuccessData",data)
        // here i am getting an object
      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (error) => {
      console.error(error.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        {loginMutation.isError && (
          <p className="text-red-500 text-center">{loginMutation.error.message}</p>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-green-600"
            disabled={loginMutation.isLoading}
          >
            {loginMutation.isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
