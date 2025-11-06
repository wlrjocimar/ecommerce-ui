"use client"

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CartItemsType } from "../types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ArrowRight, Trash2 } from "lucide-react";
import ShippingForm from "./ShippingForm";
import PaymentForm from "./PaymentForm";
import Image from "next/image";
import Link from "next/link";




const steps = [
    {
        id: 1,
        title: "Shopping Cart"
    },
    {
        id: 2,
        title: "Shipping Address"
    },
    {
        id: 3,
        title: "Payment Method"
    },
]

const CartClient = () => {
    const [cartItems, setCartItems] = useState<CartItemsType>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName = usePathname();
    const activeStep = parseInt(searchParams.get("step") || "1");
    const [shippingForm, setShippingForm] = useState(null);

    useEffect(() => {

        axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ecommerce-api/carts/9`)
            .then(response => {
                console.log("Products by api in cart page", response.data?.itemsCart);
                setCartItems(response.data?.itemsCart);
            })
            .catch(error => {
                console.log("Something went wrong", error)
            })



    }, [])

    const handleSelect = (step: string) => {
        const params = new URLSearchParams(searchParams);
        params.set("step", step || "1")

        router.push(`${pathName}?${params.toString()}`, { scroll: false })

    }


    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-12">
            {/* TITLE */}
            <h1 className="text-2xl font-medium">Your Shopping Cart</h1>
            {/* STEPS */}
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap16">
                {steps.map(step => (
                    <div onClick={() => handleSelect(String(step.id))} className={`flex items-center cursor-pointer gap-2 border-b-2 pb-4 ${step.id === activeStep ? "border-gray-800" : "border-gray-200"}`} key={step.id}>
                        <div className={`flex rounded-full w-6 h-6 bg-black text-white p-4 items-center justify-center ${step.id === activeStep ? "bg-gray-800" : "bg-gray-400"}`} >
                            {step.id}
                        </div>
                        <span className={`text_sm font-medium text-gray-400 ${step.id === activeStep ? "text-gray-800" : "text-gray-400"}`}>{step.title}</span>

                    </div>


                ))}
            </div>

            {/* STEPS AND DETAILS */}
            <div className="w-full flex flex-col lg:flex-row gap-16">
                {/* STEPS */}
                <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
                    {
                    activeStep === 1 ? 
                    (cartItems.map(item=>(
                        // SINGLE CART ITEMS
                        <div key={item.product.id} className="flex items-center justify-between">
                            {/* IMAGE AND DETAILS */}
                          <div className="flex gap-8">

                                <div className="w-32 h-32 bg-gray-50 rounded-lg overflow-hidden relative">
                                
                                {/* / <Link  className="ml-0" href={`products/${item.product.id}`} passHref> */}
                                        <Image className="object-contain" src={`${process.env.NEXT_PUBLIC_BASE_PATH}${item.product.images[item.selectedColor]}`} alt={item.product.name} fill  />
                                    {/* </Link> */}
                                {/* <p className="text-sm text-gray-400">{item.product.name}</p>
                                <p className="text-sm">R$ {item.product.price}</p> */}

                            </div>
                            <div className="flex flex-col justify-between">
                                   <div className="flex flex-col gap-1">
                                    <p className="text-lg font-medium">{item.product.name}</p>
                                    <p>Quantity:{" "}{item.quantity}</p>
                                    <p>Size:{" "}{item.selectedSize}</p>
                                    <p>Color:{" "}{item.selectedColor}</p>
                                   </div>
                                   <p className="font-medium">R$ {item.product.price.toFixed(2)}</p>
                                
                            </div>
                            
                          </div>  
                          

                          
                          

                            {/* DELETE BUTTON */}
                            <button onClick={()=>alert("clicked")} className="w-8 h-8 rounded-full hover:bg-red-200 transition-all duration-300 bg-red-100 text-red-400 flex justify-center items-center cursor-pointer"><Trash2 className="w-4 h-4"/></button>
                        </div>
                    )))

                    : activeStep === 2 ? (<ShippingForm />) : (activeStep === 3 && shippingForm ? <PaymentForm /> : <p className="text-sm text-gray-500">Please fill in the Shipping form to continue</p>)}
                </div>

                {/* DETAILS */}
                <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
                    <h2 className="font-semibold">Cart Details</h2>
                    <div className="flex flex-col gap-4">

                        <div className="flex justify-between">
                            <p className="text-gray-500">SubTotal</p>
                            <p className="font-medium">R$ {cartItems.reduce((acc, item) => acc + item.product?.price * item.quantity, 0).toFixed(2)}</p>

                        </div>

                        <div className="flex justify-between">
                            <p className="text-gray-500">Discount (10%)</p>
                            <p className="font-medium">R$ 10</p>

                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Shipping Fee (10%)</p>
                            <p className="font-medium">R$ 10</p>

                        </div>

                        <hr className="border-gray-200" />

                        <div className="flex justify-between">
                            <p className="text-gray-500">Total</p>
                            <p className="font-medium">R$ {cartItems.reduce((acc, item) => acc + item.product?.price * item.quantity, 0).toFixed(2)}</p>

                        </div>

                    </div>
                    {activeStep === 1 && <button onClick={() => router.push(`${pathName}?step=2`, { scroll: false })} className="w-full bg-gray-800 hover:bg-gray-900 transition-all duration-300 text-white p-2 rounded-lg  cursor-pointer flex items-center justify-center gap-2">
                        Continue<ArrowRight className="w-3 h-3" />
                    </button>}

                </div>
            </div>






        </div>
    )
}

export default CartClient