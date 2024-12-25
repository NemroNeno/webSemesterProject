import React from "react";
import "./styles.css";
import Header from "../Components/Layouts/Header";
import Footer from "../Components/Layouts/Footer";
import { useNavigate } from "react-router-dom";

const LMSCartSucess = () => {
    const navigate = useNavigate();
    const enrollments = localStorage.getItem("enrollmentKeys");
    const enrollmentKeys = JSON.parse(enrollments);

    return (
        <div>
            <Header />
            <div className="min-h-screen w-screen flex items-center justify-center">
                <div className="bg-white shadow-lg rounded-lg max-w-3xl w-full p-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-4xl font-bold text-gray-700">
                            Payment Successful 🎉
                        </h1>
                        <button
                            onClick={() => navigate("/lms-home")}
                            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                        >
                            Go to Home
                        </button>
                    </div>

                    {/* Enrollment Keys Section */}
                    <div className="bg-gray-100 p-4 rounded-md shadow-inner">
                        <p className="text-lg font-semibold mb-4 text-gray-800">
                            Here is your enrollment keys list:
                        </p>
                        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {enrollmentKeys?.map((item, index) => {
                                const copyToClipboard = (text) => {
                                    navigator.clipboard
                                        .writeText(text)
                                        .then(() => alert(`Copied: ${text}`))
                                        .catch((err) => console.error("Failed to copy: ", err));
                                };

                                return (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center bg-white p-3 rounded-md shadow border border-gray-200"
                                    >
                                        <span className="text-gray-700 text-base truncate max-w-[80%]">
                                            {item.substring(0, 20)}...
                                        </span>
                                        <button
                                            onClick={() => copyToClipboard(item)}
                                            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition text-sm"
                                        >
                                            Copy
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LMSCartSucess;
