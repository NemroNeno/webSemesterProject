import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { useAuth } from "../../Components/Layouts/context/auth.js";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const params = useParams();

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
  const [id, setId] = useState();


  const navigate = useNavigate();
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


  //GetSingle Product

  const handleDelete = async () => {
    try {

      const res = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${id}`, {
        headers: {
          Authorization: auth?.token,
        },
      }
      )
      if (res.data.success) {
        toast.success(res.data.message)
        navigate("/dashboard/admin/products")
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }


  const getSingleProduct = async () => {
    console.log(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
    try {
      console.log(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
      const res = await axios.get(
        `http://localhost:8080/api/v1/product/get-product/${params.slug}`
      );
      setName(res?.data.product.name);
      setDescription(res?.data.product.description);
      setquantity(res?.data.product.quantity);
      setCategory(res?.data.product.category._id);
      setPrice(res?.data.product.price);
      setShipping(res?.data.product.shipping);
      setId(res?.data.product._id);

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }



  useEffect(() => {
    getSingleProduct()
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);


      const res = await axios.put(
        `http://localhost:8080/api/v1/product/update-product/${id}`,
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
        navigate("/")
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <AdminMenu />
      <div className="container py-8">
        <div className="card p-3">
          <h3 className="text-center mb-4">Update Product</h3>
          <div className="m-1">
            <Select
              bordered={false}
              placeholder="Select a category"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => {
                setCategory(value);
              }}
              value={category}
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
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Product photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center">
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${id}`}
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
                value={shipping ? "NO" : "Yes"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleSubmit}>
                Update Product
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
