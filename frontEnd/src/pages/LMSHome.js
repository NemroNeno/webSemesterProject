import React, { useEffect, useState } from "react";
import axios from "axios";
import LMSHeader from "../Components/LMSComponents/LMSHeader";
import { useNavigate } from "react-router-dom";
import CoursesList from "../Components/LMSComponents/CoursesList";
import "./styles.css";
import beachBackground from "../resources/beachBackground.jpg";
import Footer from "../Components/Layouts/Footer";

const CardComponent = ({ name, icon }) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2">
      <svg
        className="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d={icon} />
      </svg>
      <a href="#">
        <h5 className="mb-2 font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
      </a>
      <p className="mb-3 p-0 font-normal text-sm text-gray-500 dark:text-gray-400">
        Explore courses in {name} and enhance your skills.
      </p>
      <a href="#" className="inline-flex font-medium items-center text-blue-600 hover:underline">
        See our courses
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </a>
    </div>
  );
};

const majors = [
  { name: "Information Technology", icon: "M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z" },
  { name: "Humanities", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14.93a8 8 0 1 1 0-9.86A8 8 0 0 1 13 16.93ZM12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" },
  { name: "Languages", icon: "M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm1 14.93a8 8 0 1 1 0-9.86A8 8 0 0 1 13 16.93ZM12 6a6 6 0 1 0 6 6 6 6 0 0 0-6-6Zm0 10a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z" }
];

const LMSHome = () => {
  const navigate = useNavigate();
  let auth;
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [viewAllCourses, setViewAllCourses] = useState(false);

  if (!auth) {
    let cuser = localStorage.getItem("auth");
    console.log(typeof cuser);
    try {
      auth = JSON.parse(cuser);
      console.log(auth);
    } catch (error) {
      console.error("Parsing error:", error);
    }
  }
  useEffect(() => {
    if (auth?.user?.role === 0) {
      alert("You are not authorized to view this page. Redirecting to home page.");
      navigate('/');
    }
  }, []);

  const handleSearch = async (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (query.length > 1) {
      try {
        const response = await axios.get(
          `https://localhost:5000/courses/search?q=${query}`
        );
        setResults(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setResults([]);
    }
  };

  return (
    <div className="flex flex-col bg-white">
      {/* Header */}
      <LMSHeader />

      {/* Main LMSHomepage area */}
      <div className="flex-col">
        {/* Explore Design */}
        {!viewAllCourses && (
          <>
            <div className="w-full">
              <div className="relative w-full h-fit">
                <img
                  src={beachBackground}
                  alt="Beach Background"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <div style={{ WebkitTextStroke: '1px white' }} className="h-fit mt-0 mb-4 text-7xl flex luckiest-guy-regular text-[#14243d] px-4 py-6 bg-opacity-50">
                    Explore
                  </div>
                </div>
                <svg
                  className="absolute bottom-0 w-full"
                  viewBox="0 0 1440 320"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff"
                    fillOpacity="1"
                    d="M0,256L48,250C96,244,192,232,288,224C384,216,480,200,576,208C672,216,768,248,864,256C960,264,1056,248,1152,240C1248,232,1344,232,1392,232L1440,232L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                  />
                </svg>
              </div>
              <p className="text-3xl text-[#20385C] nunito-sans-medium py-2 px-4 md:px-16 mt-3">
                What Learners Platform is offering?
              </p>
              <p className="px-4 md:px-16 text-[#20385C] ubuntu-light leading-8">
                Our platform offers a diverse array of courses designed to cater to a
                wide range of learning needs and interests. Whether you're looking to
                advance your professional skills or explore new hobbies, we have
                something for everyone. Our catalog includes both paid and free
                courses, ensuring accessibility for all learners.
              </p>

              <p className="text-3xl text-[#20385C] nunito-sans-medium px-4 md:px-16 mt-16">
                Majors the courses offer
              </p>
              <div className="w-full flex flex-wrap px-4 md:px-16">
                {majors.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="md:flex-grow"
                    >
                      <CardComponent name={item.name} icon={item.icon} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <p className="text-3xl text-[#20385C] nunito-sans-medium py-2 px-4 md:px-16 mt-16">
          Latest Courses To Offer
        </p>
        <CoursesList variant="latest" />
        {viewAllCourses && (
          <>
            <div className="h-fit w-full">
              <p className="text-3xl text-[#20385C] nunito-sans-medium mt-3 px-4 md:px-16">
                Free Courses
              </p>
              <CoursesList variant="free" />
              <p className="text-3xl text-[#20385C] nunito-sans-medium mt-3 px-4 md:px-16">
                Top sellers
              </p>
              <CoursesList variant="top" />
            </div>
          </>
        )}
        {!viewAllCourses && (
          <div className="flex justify-end px-4 md:px-16 mt-8">
            <button
              onClick={() => setViewAllCourses(true)}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              View all courses
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LMSHome;
