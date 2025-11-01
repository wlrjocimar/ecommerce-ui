"use client"

import Link from "next/link"
import { ProductType } from "../types"
import Image from "next/image"
import { ShoppingCart, Target } from "lucide-react"
import { useEffect, useState } from "react"





const ProductCard = ({product}:{product:ProductType}) => {
 


  
  const [productTypes,setProductTypes] = useState({
    size:product.sizes[0],
    color:product.colors[0]
  })

  console.log("Image path ", product.images[product.colors[0]])



  const handleProductType = ({type,value}:{type:"size" | "color",value:string})=>{
      setProductTypes((prev)=>(
        {...prev,[type]:value}
      ))

      
      

  }

  useEffect(()=>{
    console.log("ProductTypes",productTypes)

  },[productTypes])


  return (
    <div className="shadow-lg rounded-lg overflow-hidden ">

      {/* IMAGE */}
       <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}${product.images[product.colors[0]]}`} alt={product.name} fill className="object-cover hover:scale-105 transition-all duration-300"></Image>
        </div>
       
       </Link>

      {/* PRODUCT DETAIL */}

      <div className="flex flex-col gap-4 p-4">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.shortDescription}</p>
        {/* PRODUCT TYPES */}
        <div className="flex items-center gap-4 text-xs">
          {/* SIZES */}
          <div className=" flex flex-col gap-1">
            <span className="text-gray-500">Size</span>
            <select 
                name="size"
                id="size" 
                className="ring ring-gray-300 rounded-md px-2 py-1"
                onChange={(e)=>handleProductType({type:"size",value:e.target.value})}
            >
              {product.sizes.map(size=>(
                <option value={size} key={size}>{size.toLocaleUpperCase()}</option>
              ))}
            </select>
          </div>
          {/* COLORS */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Color</span>
            <div className="flex items-center gap-2">
              {product.colors.map(color=>(
                <div
                  key={color} className={`cursor-pointer border-1  ${productTypes.color===color ? "border-gray-400":"border-y-gray-200"} rounded-full p-[1.2px]`}
                  onClick={()=>{
                    handleProductType({type:"color",value:color})
                  }}
                 >
                  <div className='w-[14px] h-[14px] rounded-full' style={{backgroundColor:color}}/>
                  
                </div>
              ))}
            </div>
          </div>
         
        </div>
         {/* PRICE and ADD TO CART */}
        <div className=" flex justify-between items-center">
          <span className="font-medium">R$ {product.price.toFixed(2)}</span>
          <button className=" flex gap-1 items-center  ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300">
            <ShoppingCart/>  
            Add to Cart
          </button>
          
        </div>


      </div> 

       
    </div>
  )
}

export default ProductCard