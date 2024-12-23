import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import LMSHeader from "../Components/LMSComponents/LMSHeader";
import { Link, useNavigate } from "react-router-dom";
import CoursesList from "../Components/LMSComponents/CoursesList";
import "./styles.css";
import { useAuth } from "../Components/Layouts/context/auth";
import beachBackground from "../resources/beachBackground.jpg";
import Footer from "../Components/Layouts/Footer";

const CardComponent = ({ name }) => {
  return (
    <div class="relative mt-6 flex w-fit flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl">
      <div class="p-6 flex border-2 border-[#20385C] rounded-lg flex-row items-center gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="mb-4 h-12 w-12 text-[#20385C] scale-105"
        >
          <path
            fill-rule="evenodd"
            d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
            clip-rule="evenodd"
          ></path>
          <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z"></path>
        </svg>
        <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {name}
        </h5>
      </div>
    </div>
  );
};

const majors = ["Information Technology", "Humanities", "Languages"];

const LMSHome = () => {
  const navigate = useNavigate();
  let auth;
  const [results, setResults] = useState(null);
  const [query, setQuery] = useState("");
  const [viewAllCourses, setViewAllCourses] = useState(false);
  const scrollContainerRef = useRef(null);

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

  useEffect(() => {
    const container = scrollContainerRef.current;
    const handleScroll = (event) => {
      event.preventDefault();
      container.scrollTop += event.deltaY * 0.4; // Adjust damping factor here
    };

    container.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  });

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
      <div ref={scrollContainerRef} className="flex-col">
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
              <p className="text-3xl text-[#20385C] nunito-sans-medium py-2 px-16 mt-3">
                What Learners Platform is offering?
              </p>
              <p className="px-16 text-[#20385C] ubuntu-light">
                Our platform offers a diverse array of courses designed to cater to a
                wide range of learning needs and interests. Whether you're looking to
                advance your professional skills or explore new hobbies, we have
                something for everyone. Our catalog includes both paid and free
                courses, ensuring accessibility for all learners.
              </p>

              <p className="text-3xl text-[#20385C] nunito-sans-medium px-16 mt-16">
                Majors the courses offer
              </p>
              <div className="w-full flex flex-wrap px-16">
                {majors.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex-grow flex-shrink-0 basis-[calc(33.333% - 1rem)]"
                    >
                      <CardComponent name={item} />
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        <p className="text-3xl text-[#20385C] nunito-sans-medium py-2 px-16 mt-16">
          Latest Courses To Offer
        </p>
        <CoursesList variant="latest" />
        {viewAllCourses && (
          <>
            <div className="h-fit w-full">
              <p className="text-3xl text-[#20385C] nunito-sans-medium mt-3 px-16">
                Free Courses
              </p>
              <CoursesList variant="free" />
              <p className="text-3xl text-[#20385C] nunito-sans-medium mt-3 px-16">
                Top sellers
              </p>
              <CoursesList variant="top" />
            </div>
          </>
        )}
        {!viewAllCourses && (
          <div className="flex justify-end px-16 mt-8">
            <p
              onClick={() => setViewAllCourses(true)}
              className="border-2 cursor-pointer border-[#20385C] p-3 text-[#20385C] font-semibold"
            >
              View all courses ...
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LMSHome;
