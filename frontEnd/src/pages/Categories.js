import React from "react";
import Layout from "../Components/Layouts/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 text-center">
          Explore Our Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories?.map((c) => (
            <div
              key={c._id}
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 flex flex-col justify-between transition-transform transform hover:scale-105"
            >
              <div>
                <Link to={`/category/${c.slug}`}>
                  <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {c?.name}
                  </h5>
                </Link>
                <p className="mb-6 font-normal text-gray-700 dark:text-gray-400">
                  Discover a wide range of products in the {c?.name} category.
                </p>
              </div>
              <Link
                to={`/category/${c.slug}`}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 mt-auto"
              >
                Read more
                <svg
                  className="rtl:rotate-180 w-4 h-4 ms-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
