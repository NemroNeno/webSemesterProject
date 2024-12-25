import React from "react";
import Layout from "../Components/Layouts/Layout";

const About = () => {
  return (
    <Layout>
      <div className="py-16 bg-white">
        <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
          <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
            <div className="md:5/12 lg:w-5/12 rounded">
              <img
                src="https://hilal.gov.pk/uploads/gallery/8c66bb19847dd8c21413c5c8c9d68306.jpg"
                alt="image"
                loading="lazy"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="md:7/12 lg:w-6/12">
              <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                Empowering Women through E-commerce and Learning
              </h2>
              <p className="mt-6 text-gray-600 font-normal leading-8">
                Our platform is dedicated to empowering women by providing an
                e-commerce marketplace where they can showcase and sell their
                products. We also offer a comprehensive learning management
                system with tailored courses and skill-building resources to
                foster personal and professional growth.
              </p>
              <p className="mt-4 text-gray-600 font-normal leading-8">
                Join us in our mission to create opportunities and support
                women in achieving their goals. Together, we can make a
                difference and build a brighter future.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
