import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../Components/Layouts/context/auth.js";
import { useNavigate } from "react-router-dom";

const CreatProduct = () => {
  const { Option } = Select;
  const [categories, setCategories] = useState([]);
  const [auth, setAuth] = useAuth();
  const [category, setCategory] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [quantity, setquantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  console.log(auth?.user)


  const navigate=useNavigate();
  //Getting All the Categories
  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );

      if (res.data.success) {
        setCategories(res.data.category);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData=new FormData();
      productData.append("name",name);
      productData.append("description",description);
      productData.append("price",price);
      productData.append("quantity",quantity);
      productData.append("photo",photo);
      productData.append("category",category);
      productData.append("shipping",shipping);
      productData.append("seller",auth?.user?.id);

      console.log(productData);
      

      const res = await axios.post(
        "http://localhost:8080/api/v1/product/create-product",
       productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (res.data.success) {
         toast.success(res.data.message);
        console.log("Product created");
        navigate("/dashboard/admin")
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Create Product</h3>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) =>{ setPhoto(e.target.files[0])
                                   
                      }}
                      hidden
                    />  
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="Product photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter the Product Name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Enter the Product Quantity"
                    className="form-control"
                    onChange={(e) => setquantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="Enter the Product Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="Enter the Product Description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    size="large"
                    className="form-select mb-3"
                    onChange={(value) => {
                      setShipping(value);
                    }}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="btn btn-primary align-center"
                    onClick={handleSubmit}
                  >
                    Create Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreatProduct;
