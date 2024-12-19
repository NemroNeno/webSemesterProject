import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "./../../Components/Form/CategoryForm";
import { useAuth } from "../../Components/Layouts/context/auth";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);

  const [name, setName] = useState("");
  const [upName, setUpName] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:8080/api/v1/category/update-category/${selected._id}`,{name:upName},{
        headers: {
          Authorization: auth?.token,
        },
      })
      
      if(res.data?.success){
        toast.success(res.data.message);
        getAllCategory();

      }

      else{
        toast.error(res.data.message)
      }
    } catch (error) {
      console.log(error.response)
      toast.error("Something went Wrong")
      
    }
  };


  const handleDelete=async (e)=>{
    try {
      e.preventDefault();
        
      const res = await axios.delete(`http://localhost:8080/api/v1/category/delete-category/${selected._id}`,{
        headers: {
          Authorization: auth?.token,
        },
      })
      
     
        toast.success(res.data.message);
       await getAllCategory();
       setSelected(null)

      
       
    } catch (error) {
      console.log(error.response)
      toast.error("Something went Wrong")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      await getAllCategory();
      toast.success(res.data.message);
    } catch (error) {
      console.log(error.response);
      alert("Something went Wrong");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );
      console.log(res.data);
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

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>Manage Category</h3>
              <div>
                <div>
                  <CategoryForm
                    value={name}
                    setValue={setName}
                    handleSubmit={handleSubmit}
                  />
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((c) => {
                      return (
                        <tr>
                          <>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button
                                className="btn btn-primary ms-2"
                                onClick={() => {
                                  setVisible(true);
                                  setUpName(c.name);
                                  setSelected(c);
                                }}
                              >
                                Edit
                              </button>
                              <button className="btn btn-danger ms-2 p-2" onClick={(e)=>{setSelected(c);
                              handleDelete(e)}}>
                                Delete
                              </button>
                            </td>
                          </>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal onCancel={() => setVisible(false)} open={visible} onOk={()=>setVisible(false)}>
              {" "}
              <CategoryForm
                value={upName}
                setValue={setUpName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
