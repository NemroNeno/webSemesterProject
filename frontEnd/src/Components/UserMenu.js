import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex -mb-px overflow-x-scroll">
        <li className="me-2">
          <NavLink
            to="/dashboard/user/profile"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            Manage Profile
          </NavLink>
        </li>
        <li className="me-2">
          <NavLink
            to="/dashboard/user/orders"
            className={({ isActive }) =>
              isActive
                ? "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                : "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
            }
          >
            View Orders
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;