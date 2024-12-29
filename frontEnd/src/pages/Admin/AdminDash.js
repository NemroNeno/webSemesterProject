import React from "react";
import Layout from "../../Components/Layouts/Layout";
import AdminMenu from "../../Components/Layouts/AdminMenu";
import { useAuth } from "../../Components/Layouts/context/auth";

const AdminDash = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <AdminMenu />
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card w-80 p-3">
              <h3>Admin Name: {auth.user.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDash;
