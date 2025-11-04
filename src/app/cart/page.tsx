"use client"

import { CartItemsType, ProductsType } from "@/src/types"
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"


const steps=[
    {
        id:1,
        title:"Shopping Cart"
    },
    {
        id:2,
        title:"Shipping Address"
    },
    {
        id:3,
        title:"Payment Method"
    },
]



const page = () => {
const [cartItems, setCartItems] = useState<CartItemsType>([]);
const searchParams = useSearchParams();
const router = useRouter();
const activeStep = parseInt(searchParams.get("step") || "1");

useEffect(()=>{

    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ecommerce-api/carts/1`)
    .then(response=>{
        console.log("Products by api in cart page", response.data);
        setCartItems(response.data);
    })
    .catch(error=>{
        console.log("Something went wrong", error)
    })
 


},[])

const handleSelect = (step:number)=>{
    console.log("Step slected", step)
    router.push("/")

}


  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
      {/* STEPS */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap16">
        {steps.map(step=>(
            <div onClick={()=>handleSelect(step.id)} className={`flex items-center cursor-pointer gap-2 border-b-2 pb-4 ${step.id===activeStep ? "border-gray-800" : "border-gray-200"}`} key={step.id}>
                <div className="flex rounded-full w-6 h-6 bg-black text-white items-center justify-center">
                    {step.id}
                </div>
                <span className=" text-gray-400">{step.title}</span>
                
            </div>
            
            
        ))}
      </div>


    </div>
  )
}

export default page