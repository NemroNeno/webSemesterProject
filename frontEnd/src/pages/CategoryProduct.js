import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Layout from './../Components/Layouts/Layout';
import axios from 'axios';

const CategoryProduct = () => {
    const navigate=useNavigate()
    const params=useParams()
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState();
    const getProductByCat= async ()=>{
        try {
            const res= await axios.get(`http://localhost:8080/api/v1/product/product-category/${params.slug}`)
            console.log(res?.data?.products?.length)
            setProducts(res?.data?.products)
            setCategory(res?.data?.category)
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(params?.slug)
     getProductByCat()
    },[params.slug])
  return (
   <Layout>
<div className='container mt-3'>
    <h4 className='text-center'>{category?.name}</h4>
    <h6 className='text-center'>{products?.length} results found</h6>
    <div className='row'>
    <div className="d-flex flex-wrap">
              {products.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description.substring(0,30)}</p>
                    <p className="card-text">${p?.price}</p>
                    <button className="btn btn-primary m-2" onClick={(e)=>{
                      navigate(`/product/${p.slug}`)
                    }}>
                      More details
                    </button>
                    <button className="btn btn-secondary m-2">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
    </div>
   
</div>
   </Layout>
  )
}

export default CategoryProduct