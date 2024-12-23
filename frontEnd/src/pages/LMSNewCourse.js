import axios from "axios";
import React from "react";
import { courseModel } from "../models/course";
import "./styles.css";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import LMSHeader from "../Components/LMSComponents/LMSHeader";
import Footer from "../Components/Layouts/Footer";
import { useAuth } from "../Components/Layouts/context/auth";

const LMSNewCourse = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({ defaultValues: courseModel });
  let auth;

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

  const getContentArray = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const fileContent = fileReader.result;
      const contentArray = fileContent.split('\n').filter((line) => line.trim() !== '');
      setValue('contentArray', contentArray);
    };

    fileReader.readAsText(file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append('code', data.code);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('major', data.major);
    formData.append('instructor', data.instructor);
    formData.append('price', data.price);
    formData.append('availability', data.availability);
    data.contentArray.forEach((content, index) => {
      formData.append(`contentArray[${index}]`, content);
    });

    if (data.image.length > 0) {
      formData.append('image', data.image[0]);
    }

    Array.from(data.contentFiles).forEach(file => {
      formData.append('contentFiles', file);
    });

    alert('Combined Data', formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/course/new-course",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${auth?.token}`,
          },
        }
      );
      alert(`Course Added Successfully: ${response.data?.title}`);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert(
        `Error: ${error.response ? error.response.data.message : error.message}`
      );
    }
  };

  return (
    <section className="bg-white antialiased dark:bg-gray-900">
      <LMSHeader />
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">New Course Details</h2>
          <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12">
            <form noValidate onSubmit={handleSubmit(onSubmit)} className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6 lg:max-w-xl lg:p-8" encType="multipart/form-data">
              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="code" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Code*</label>
                  <input {...register("code", { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" type="text" name="code" placeholder="e.g., HU-xxx" />
                  {errors.code && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Title*</label>
                  <input {...register("title", { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" type="text" name="title" placeholder="e.g., engineering" />
                  {errors.title && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Description*</label>
                  <textarea {...register("description", { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" placeholder="Enter course description" rows="4" name="description"></textarea>
                  {errors.description && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="major" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Major*</label>
                  <input {...register("major", { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" type="text" name="major" placeholder="Major" />
                  {errors.major && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="instructor" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Instructor*</label>
                  <input {...register("instructor", { required: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" type="text" name="instructor" placeholder="Name" />
                  {errors.instructor && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Price*</label>
                  <input {...register("price", { required: true, valueAsNumber: true })} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500" type="number" name="price" placeholder="e.g., 16.00$" />
                  {errors.price && <p className="text-red-500 text-xs mt-1">This field is required</p>}
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-center">
                  <label htmlFor="availability" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Course Available?</label>
                  <input {...register("availability")} className="ml-4 h-5 w-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" type="checkbox" name="availability" />
                </div>

                <div className="col-span-2">
                  <label htmlFor="contentFile" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Course Contents File Selection</label>
                  <input {...register("contentFile")} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="contentFile" name="contentFile" onChange={getContentArray} />
                </div>

                <div className="col-span-2">
                  <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Course Title Photo Selection (.png, .jpg)</label>
                  <input {...register("image")} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" id="image" name="image" />
                </div>

                <div className="col-span-2">
                  <label htmlFor="contentFiles" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">Select Content Files</label>
                  <input {...register("contentFiles")} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" multiple type="file" id="contentFiles" name="contentFiles" />
                </div>
              </div>

              <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <DevTool control={control} />
      <Footer />
    </section>
  );
};

export default LMSNewCourse;
