import CartClient from "@/src/components/CartClient"
import { Suspense } from "react"





const page = () => {

    return(
        <Suspense fallback={<div>Loading.....</div>}>
            <CartClient/>
        </Suspense>

    )

   
}

export default page