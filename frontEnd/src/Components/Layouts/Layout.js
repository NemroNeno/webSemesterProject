import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
  return (
    <div className="max-w-fit">
      <Header />

      <main style={{ minHeight: "70vh" }}>
        <Toaster toastOptions={{ duration: 5000 }} />

        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
