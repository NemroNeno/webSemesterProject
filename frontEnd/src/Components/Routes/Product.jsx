import React from "react";
import { FaCartPlus } from "react-icons/fa";

const Product = ({ prod, addCart }) => {
  return (
    <div className="group block overflow-hidden m-4 border-4 border-black/10 rounded-2xl w-[300px] h-[300px]">
      <img
        src={`http://localhost:8080/api/v1/product/get-productphoto/${prod?._id}`}
        alt=""
        className=" inset-0 h-[200px] w-[300px] p-2"
      />

      <div className="relative bg-white pt-3 text-center">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">
          {prod?.description.substring(0, 30)}
        </h3>

        <div className="mt-1.5 flex items-center justify-between text-gray-900">
          <p className="tracking-wide">${prod?.price}</p>

          <p
            onClick={() => {
              addCart(prod);
            }}
            className="text-2xl uppercase tracking-wide mr-3 cursor-pointer"
          >
            <FaCartPlus />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
