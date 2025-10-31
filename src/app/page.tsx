
import Image from "next/image";
import ProductList from "../components/ProductList";

const  HomePage=()=> {
  return (
    <div className=''>

        <div className="relative aspect-3/1 mb-12" >
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/featured.png`} alt="" fill/>
        </div>
        <ProductList/>

        

    </div>

     
   
  );
}

export default HomePage;
