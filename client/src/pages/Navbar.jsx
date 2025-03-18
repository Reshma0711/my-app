import { useQueryClient, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Use TanStack Query to check authentication status dynamically
  const { data: isAuthenticated, isLoading } = useQuery({
    queryKey: ["authStatus"],
    queryFn: () => (localStorage.getItem("token") ? true : false),
    // initialData: false,
  });
  console.log("issssssssssssssssssssssssssss", isAuthenticated);
  const handleLogout = () => {
    localStorage.removeItem("token");
    queryClient.setQueryData(["authStatus"], false); // Manually update state
    navigate("/login");
  };

  console.log("loadinggggggggggggg", isLoading);

  return (
    <nav className="bg-gray-900 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">My App</h1>
      <div>
        {!isAuthenticated ? (
          <>
            <Link to="/signup" className="mr-4">
              Sign Up
            </Link>
            <Link to="/login">Login</Link>
          </>
        ) : (
          <>
            <Link to="/">Home</Link>
            <Link to="/products" className="ml-4">
              Products
            </Link>
            <Link to="/pagination" className="ml-4">
              Pagination
            </Link>
            <Link to="/gallery" className="ml-4">
              Gallery
            </Link>
            <Link to="/infiniteScroll" className="ml-4">
             Infinite-Scroll
            </Link>
            <button
              onClick={handleLogout}
              className="ml-4 bg-red-500 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
