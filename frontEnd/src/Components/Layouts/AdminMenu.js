import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex -mb-px overflow-x-scroll">
        <li className="me-2">
          <NavLink
            to="/dashboard/admin/"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/dashboard/admin/create-product"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            Create Product
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/dashboard/admin/products"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            Products
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/dashboard/admin/admin-orders"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            Admin Order Management
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;