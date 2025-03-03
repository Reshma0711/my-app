import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <nav className="bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Brand */}
            <div className="flex-shrink-0">
              <Link href="/">
                <a className="text-xl font-bold color-Whitesmoke text-[#F5F5F5]">MyApp</a>
              </Link>
            </div>
            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-white" : "text-gray-500"
          } hover:text-white`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/products"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-white" : "text-gray-500"
          } hover:text-white`
        }
      >
        Products
      </NavLink>
      <NavLink
        to="/pagination"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-white" : "text-gray-500"
          } hover:text-white`
        }
      >
       Pagination
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          `px-3 py-2 rounded-md text-sm font-medium ${
            isActive ? "text-white" : "text-gray-500"
          } hover:text-white`
        }
      >
       Gallery
      </NavLink>
                
                {/* <Link href="/about">
                  <a className="text-gray-500 hover:text-[#F5F5F5] px-3 py-2 rounded-md text-sm text-sky-500 font-medium">
                   Login
                  </a>
                </Link>
                <Link href="/about">
                  <a className="text-gray-500 hover:text-[#F5F5F5] px-3 py-2 rounded-md text-sm  text-sky-500 font-medium">
                   Signup
                  </a>
                </Link> */}

               
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
