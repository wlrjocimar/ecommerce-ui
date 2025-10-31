
//TEMPORARY DATABESE HERE
"use client"
import { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { ProductsType, ProductType } from "../types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";




const ProductList = () => {

    const [products,setProducts]=useState<ProductsType>([]);
    useEffect(()=>{
     axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ecommerce/products`)
       .then((response) => {
        console.log("Response from request", response.data)
        setProducts(response.data)})
       .catch(error=>console.error(error));

    },[]);



  return (
    <div className="w-full">
       

      <Suspense fallback={<div>Carregando categorias...</div>}>
        <Categories />
      </Suspense>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12'>
            {products.map(product=>(
                <ProductCard product={product} key={product.id}/>
            ))}
        </div>
    </div>
  )
}

export default ProductList