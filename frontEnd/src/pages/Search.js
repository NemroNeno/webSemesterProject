
import React from 'react'
import Layout from './../Components/Layouts/Layout';
import { useSearch } from '../Components/Layouts/context/search';

const Search = () => {
    const [search ,setSearch]=useSearch();
  return (
    <Layout>
        <div className='container'>
            <div className='text-center'>
                <h1>Search Results</h1>
                <h6>{search?.results.length<1? "No Products found": `Found ${search.results.length}` }</h6>
            </div>

            <div className="d-flex flex-wrap">
              {search?.results?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`http://localhost:8080/api/v1/product/get-productphoto/${p?._id}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p?.name}</h5>
                    <p className="card-text">{p?.description.substring(0,30)}</p>
                    <p className="card-text">${p?.price}</p>
                    <button className="btn btn-primary m-2">
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
    </Layout>
  )
}

export default Search