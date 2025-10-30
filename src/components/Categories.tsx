
"use client";
import axios from "axios";
import * as Icons from "lucide-react";

import { useEffect, useState } from "react";
import { CategoryType } from "../types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Categories = () => {
    const [categories,setCategories] = useState<CategoryType[]>([]);
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathName= usePathname();
    console.log("Param value teste",searchParams.get("teste"))
    const selectedCategory = searchParams.get("category")
    console.log("Selected category", selectedCategory);
    console.log("PathName",pathName)


    useEffect(()=>{

      axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ecommerce/categories`)
            .then(response=>{
              console.log("response categoria",response.data)
              setCategories(response.data);
            })
            .catch(error=>{
              console.log("Error while getting all categories", error)
            })




    },[])

    const handleChange = (slug:string | null)=>{
      const params = new URLSearchParams(searchParams);
      params.set("category",slug || "all")

      router.push(`${pathName}?${params.toString()}`,{scroll:false})

    }



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 bg-gray-100 p-2 rounded-lg mb-4 text-sm">
        {categories.map((category)=>{
          const IconComponent = (Icons as any)[category.icon] || Icons.ShoppingBasket;

        return (
          <div onClick={()=>{handleChange(category.slug)}} className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md ${category.slug===selectedCategory ? "bg-white":"text-gray-500"}`} key={category.name}>
            <IconComponent className="w-4 h-4" />
            {category.name}

          </div>

        )})}
    </div>
  )
}

export default Categories