import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiLogOut, FiUser, FiUserCheck } from "react-icons/fi";
import { useAuth } from "./context/auth";
import { toast } from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "./context/cart";

const Header = () => {
  const categories = useCategory();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [item] = useCart([]);
  const [hidden, setHidden] = useState(true);
  const [searchHidden, setSearchHidden] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedDashboard, setSelectedDashboard] = useState("Dashboard");

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    localStorage.removeItem("auth");
    toast.success("Logout successfully");
  };

  const toggleSearch = () => {
    setSearchHidden(!searchHidden);
    if (!hidden) setHidden(true);
  };

  const toggleMenu = () => {
    setHidden(!hidden);
    if (!searchHidden) setSearchHidden(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigateToDashboard = (role) => {
    if (role === "admin") {
      navigate("/dashboard/admin");
      setSelectedDashboard("Admin Dashboard");
    } else {
      navigate("/dashboard/user");
      setSelectedDashboard("User Dashboard");
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 border border-b-slate-300 dark:border-gray-700 sticky top-0 z-50">
        <div className="flex flex-wrap items-center justify-around p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              className="h-8"
              alt="Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Empower Her
            </span>
          </Link>
          <div className="hidden md:block flex-1 ps-4">
            <SearchInput className="block w-full" />
          </div>
          <div className="flex md:order-2">
            <button
              type="button"
              onClick={toggleSearch}
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded={!hidden}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`items-center justify-between ${hidden ? "hidden" : "flex"} w-full md:flex md:w-auto md:order-1`}
            id="navbar-search"
          >
            <ul className="flex flex-col flex-wrap m-0 md:p-0 font-medium rounded-lg bg-gray-50 md:flex-row md:border-0 md:bg-white md:dark:bg-gray-900 w-full items-stretch">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 w-full"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                  to="/lms-home"
                >
                  LMS
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                  to="/cart"
                >
                  Cart{`(${item.length})`}
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                      : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              {auth?.user ? (
                <>
                  <li className="relative">
                    <button
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 flex items-center"
                      onClick={toggleDropdown}
                    >
                      {selectedDashboard}
                      <svg
                        className="w-4 h-4 ml-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m5 7 5 5 5-5"
                        />
                      </svg>
                    </button>
                    <div
                      className={`absolute right-0 z-10 mt-2 w-44 bg-white rounded-md shadow-lg dark:bg-gray-700 ${dropdownOpen ? "block" : "hidden"}`}
                    >
                      <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
                            onClick={() => navigateToDashboard("user")}
                          >
                            <FiUser className="mr-2" />
                            User Dashboard
                          </button>
                        </li>
                        <li>
                          <button
                            className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center"
                            onClick={() => navigateToDashboard("admin")}
                          >
                            <FiUserCheck className="mr-2" />
                            Admin Dashboard
                          </button>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <button
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      onClick={handleLogout}
                    >
                      <FiLogOut className="h-5 w-5" />
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                          : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "block py-2 px-3 bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                          : "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className={`md:hidden ${searchHidden ? "hidden" : "block"} p-4`}>
        <SearchInput className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
      </div>
    </>
  );
};

export default Header;
