
import Image from "next/image";
import ProductList from "../components/ProductList";

const  HomePage=({searchParams}:{searchParams:Promise<{category:string}>})=> {

  const category = (await searchParams).category
  return (
    <div className=''>

        <div className="relative aspect-3/1 mb-12" >
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/featured.png`} alt="" fill/>
        </div>
        <ProductList category={}/>

        

    </div>

     
   
  );
}

export default HomePage;
