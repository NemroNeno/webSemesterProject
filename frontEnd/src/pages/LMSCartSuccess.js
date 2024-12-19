import React, { useState } from "react";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LMSCartSucess = () => {
  const navigate = useNavigate();

  const enrollments = localStorage.getItem("enrollmentKeys");
  const enrollmentKeys = JSON.parse(enrollments);

  return (
    <div className="min-h-screen w-screen bg-gray-300 gap-8 flex p-2 items-center flex-col">
      <div className="w-full">
        <p
          onClick={() => {
            navigate("/lms-home");
          }}
          className="border-2 border-black w-fit h-fit rounded-full cursor-pointer ml-3"
        >
          Go to home screen
        </p>
      </div>
      <div className="flex w-full h-full gap-4 flex-col items-center justify-center">
        <p className="text-5xl nunito-sans-medium">Payment Successful</p>
        <div className="h-fit w-full px-8 flex flex-col gap-4">
          <p className="dm-sans-medium text-xl">
            Following is your enrollment keys list: [The quantity and order of
            keys will mathc according to provided cart]
          </p>
          <ol>
            {enrollmentKeys?.map((item, index) => {
              return <li className=" flex justify-center tiny5-regular text-[1.5em]">{item}</li>;
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default LMSCartSucess;
