import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/category/getall-category"
      );
      setCategories(res.data.category);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getCategories()
  },[])
  return categories;
}
