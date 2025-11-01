import ProductList from '@/src/components/ProductList';
import Image from 'next/image';
import React from 'react'

const page = async({searchParams}:{searchParams:Promise<{category:string}>})=> {

  const category = (await searchParams).category
  return (
    <div className=''>

        <div className="relative aspect-3/1 mb-12" >
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/featured.png`} alt="" fill/>
        </div>
        <ProductList category={category} params="products"/>

        

    </div>

     
   
  );
}

export default page